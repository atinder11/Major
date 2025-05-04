import os
import pandas as pd
from googleapiclient.discovery import build
from deep_translator import GoogleTranslator
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import nltk
from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import matplotlib.pyplot as plt
import io
import base64
from flask_cors import CORS
from selenium import webdriver
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from transformers import BartForConditionalGeneration, BartTokenizer
import time
import re
from datetime import datetime
from dateutil.relativedelta import relativedelta

app = Flask(__name__)
CORS(app)

API_KEY = 'AIzaSyAuXxhJNuRMb2DzPMpf-qNUiT_0uobOrrY'
youtube = build('youtube', 'v3', developerKey=API_KEY)

ps = PorterStemmer()
nltk.download('punkt')
nltk.download('stopwords')

model_name = "facebook/bart-large-cnn"
tokenizer = BartTokenizer.from_pretrained(model_name)
model = BartForConditionalGeneration.from_pretrained(model_name)

chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36")

analyzer = SentimentIntensityAnalyzer()

def vader_sentiment_analysis(row):
    text = str(row['Comment'])
    rating = float(row['Rating'])
    sentiment_dict = analyzer.polarity_scores(text)
    if sentiment_dict['compound'] >= 0.05:
        sentiment = 'Positive'
    elif sentiment_dict['compound'] <= -0.05:
        sentiment = 'Negative'
    else:
        sentiment = 'Neutral'

    if rating <= 2.5 and sentiment == 'Positive' or sentiment == 'Neutral':
        sentiment = 'Negative'
    return sentiment

def transform_text(text):
    if text is not None:
        text = text.lower()
        text = nltk.word_tokenize(text)
        y = [i for i in text if i.isalnum()]
        y = [i for i in y if i not in stopwords.words('english')]
        y = [ps.stem(i) for i in y]
        return " ".join(y)
    else:
        return ""

def get_video_comments(video_id, max_results=100):
    comments = []
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=max_results,
        textFormat="plainText"
    )
    while request:
        response = request.execute()
        for item in response['items']:
            comment = item['snippet']['topLevelComment']['snippet']
            comments.append([comment['authorDisplayName'], comment['textDisplay'], comment['likeCount']])
        request = youtube.commentThreads().list_next(request, response)
    return comments

def get_review_url(product_url):
    match = re.search(r'/(?:gp/product|dp)/([A-Z0-9]{10})', product_url)
    if match:
        product_id = match.group(1)
        review_url = f'https://www.amazon.in/product-reviews/{product_id}?ie=UTF8&reviewerType=all_reviews'
        return review_url
    else:
        raise ValueError("Invalid product URL format")
    
def scrape_reviews(browser):
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    page_data = []
    for s in soup.find_all(attrs={"data-hook": "review"}):
        try:
            name = s.find(class_="a-profile-name").text
            rating = s.find(class_="a-icon-alt").text[:3]
            title_spans = s.find(attrs={"data-hook": "review-title"}).find_all('span')
            title = title_spans[2].text if len(title_spans) > 2 else title_spans[0].text
            country_parts = s.find(attrs={"data-hook": "review-date"}).text.split()[2:-4]
            country = ' '.join(country_parts) if len(country_parts)>1 else country_parts[0]
            date_parts = s.find(attrs={"data-hook": "review-date"}).text.split()[-3:]
            date = ' '.join(date_parts)
            comment = s.find(attrs={"data-hook": "review-body"}).text[1:-1]
            page_data.append([name, rating, title, country, date, comment])
        except AttributeError:
            continue
    return page_data

def scrape_amazon_reviews(product_url):
    review_url = get_review_url(product_url)
    browser = webdriver.Chrome(options=chrome_options)
    reviews_data = []
    try:
        browser.get(review_url)
        time.sleep(3)

        email_field = browser.find_element(By.ID, "ap_email")
        email_field.send_keys("myemail@abc.com")
        email_field.send_keys(Keys.RETURN)
        time.sleep(3)

        password_field = browser.find_element(By.ID, "ap_password")
        password_field.send_keys("mypassword")
        password_field.send_keys(Keys.RETURN)
        time.sleep(5)

        page_number = 1
        while True:
            soup = BeautifulSoup(browser.page_source, 'html.parser')
            page_reviews = []
            for review in soup.find_all(attrs={"data-hook": "review"}):
                try:
                    text = review.find(attrs={"data-hook": "review-body"}).text.strip()
                    page_reviews.append(text)
                except AttributeError:
                    continue

            if not page_reviews:
                break
            
            reviews_data.extend(page_reviews)
            page_number += 1
            
            next_url = f"{review_url}&pageNumber={page_number}"
            browser.get(next_url)
            time.sleep(5)
        return reviews_data
    finally:
        browser.quit()

def scrape_product_reviews(product_link):
    review_link = get_review_url(product_link)
    browser = webdriver.Chrome(options=chrome_options)
    all_reviews = []
    try:
        browser.get(review_link)
        time.sleep(3)
        if "ap_email_login" in browser.page_source:
            email_field = browser.find_element(By.ID, "ap_email_login")
            email_field.send_keys("myemail@abc.com")
            email_field.send_keys(Keys.RETURN)
            time.sleep(3)
            password_field = browser.find_element(By.ID, "ap_password")
            password_field.send_keys("mypassword")
            password_field.send_keys(Keys.RETURN)
            time.sleep(5)
        page_number = 1
        while True:
            reviews = scrape_reviews(browser)
            if not reviews:
                break
            all_reviews.extend(reviews)
            page_number += 1
            next_page_url = f"{review_link}&pageNumber={page_number}"
            browser.get(next_page_url)
            time.sleep(3)
        return all_reviews
    finally:
        browser.quit()

def scrape_products(browser):
    soup = BeautifulSoup(browser.page_source, 'html.parser')
    page_data = []
    sr=1
    for s in soup.find_all(attrs={"role": "listitem"}):
        try:
            name = s.find("h2").get("aria-label")
            rating = s.find(class_="a-icon-alt").text[:3]
            number = s.find(attrs={"data-cy":"reviews-block"}).find(class_="a-link-normal s-underline-text s-underline-link-text s-link-style").get("aria-label")
            number = number[:-8]
            price = s.find(class_="a-price-whole").text
            a_tag = s.find("a", class_="a-link-normal s-line-clamp-2 s-link-style a-text-normal")
            if not a_tag:
                continue
            link = "https://www.amazon.in" + a_tag.get("href")
            score = float(rating) * float(number)
            sales_tag = s.find(attrs={"data-cy": "reviews-block"}).find(class_="a-size-base a-color-secondary")
            sales = sales_tag.text[:-22] if sales_tag else "0"
            if sales.endswith('K'):
                sales = float(sales[:-1]) * 1000
            elif sales.endswith('M'):
                sales = float(sales[:-1]) * 1000000
            else:
                sales = float(sales)
            ranking = sr
            revenue = float(price.replace(',', '')) * sales
            page_data.append([name, rating, number, price, link, score, ranking, sales, revenue])
            sr = sr + 1
        except AttributeError:
            continue
        
    page_data.sort(key=lambda x: x[5], reverse=True)
    return page_data

def scrape_amazon_products(seller_id):
    url = f"https://www.amazon.in/s?me={seller_id}&page=1&s=exact-aware-popularity-rank"
    browser = webdriver.Chrome(options=chrome_options)
    products_data = []
    try:
        browser.get(url)
        time.sleep(5)
        products_data = scrape_products(browser)
        return products_data
    finally:
        browser.quit()

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        input_link = data.get('link')

        if "youtube.com" in input_link:
            video_id = input_link.split("v=")[1].split("&")[0]
            comments = get_video_comments(video_id)
            df = pd.DataFrame(comments, columns=["Author", "Comment", "Likes"])
            df = df.sort_values(by='Likes', ascending=False)
            translator = GoogleTranslator(source='auto', target='en')
            df['Comment'] = df['Comment'].apply(lambda x: translator.translate(x))
            df['Comment'] = df['Comment'].apply(transform_text)

            analyzer = SentimentIntensityAnalyzer()
            sentiments = {'Positive': 0, 'Neutral': 0, 'Negative': 0}

            sentiment_scores = []
            for comment in df['Comment']:
                if comment:
                    sentiment_score = analyzer.polarity_scores(comment)
                    sentiment_scores.append(sentiment_score['compound'])
                    if sentiment_score['compound'] >= 0.05:
                        sentiments['Positive'] += 1
                    elif sentiment_score['compound'] <= -0.05:
                        sentiments['Negative'] += 1
                    else:
                        sentiments['Neutral'] += 1

            total_comments = len(df)
            positive_percentage = (sentiments['Positive'] / total_comments) * 100
            neutral_percentage = (sentiments['Neutral'] / total_comments) * 100
            negative_percentage = (sentiments['Negative'] / total_comments) * 100
            avg_likes = df['Likes'].mean()

            plt.figure(figsize=(6, 4))
            plt.bar(sentiments.keys(), sentiments.values(), color=['green', 'blue', 'red'])
            plt.title('Sentiment Analysis of YouTube Comments')
            plt.xlabel('Sentiment')
            plt.ylabel('Number of Comments')

            buf = io.BytesIO()
            plt.savefig(buf, format='png')
            buf.seek(0)
            graph_base64 = base64.b64encode(buf.read()).decode('utf-8')
            buf.close()

            return jsonify({
                "graph": f"data:image/png;base64,{graph_base64}",
                "statistics": {
                    "total_comments": total_comments,
                    "positive_percentage": positive_percentage,
                    "neutral_percentage": neutral_percentage,
                    "negative_percentage": negative_percentage,
                    "average_likes": avg_likes
                }
            })
        
        elif "amazon" in input_link:
            reviews = scrape_amazon_reviews(input_link)
            df = pd.DataFrame(reviews, columns=['reviews'])
            translator = GoogleTranslator(source='auto', target='en')
            df['reviews'] = df['reviews'].apply(lambda x: translator.translate(x))
            combined_text = " ".join(df['reviews'])
            combined_text = re.sub(r'\b(I|we|my|mine|our|ours)\b', 'the user', combined_text, flags=re.IGNORECASE)
            combined_text = re.sub(r'\b(you|your|yours)\b', 'the user', combined_text, flags=re.IGNORECASE)
            combined_text = re.sub(r'\b(u|ur|urs)\b', 'the user', combined_text, flags=re.IGNORECASE)
            inputs = tokenizer(combined_text, return_tensors="pt", max_length=1024, truncation=True)
            summary_ids = model.generate(inputs["input_ids"], max_length=200, num_beams=4, early_stopping=True)
            summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

            return jsonify({
                "type": "amazon",
                "summary": summary
            })
        
        else:
            return jsonify({"error": "Unsupported platform"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/seller', methods=["POST"])
def seller_dashboard():
    data = request.get_json()
    seller_id = data.get("seller_id")
    if not seller_id or len(seller_id) != 14:
        return jsonify({"error": "Invalid Seller ID"}), 400

    return jsonify({"products" : scrape_amazon_products(seller_id)})

@app.route('/product-data', methods=["POST"])
def get_product_data():
    data = request.get_json()
    product_link = data.get("product_link")
    reviews = scrape_product_reviews(product_link)
    columns = ["Name", "Rating", "Title", "Country", "Date", "Comment"]
    df = pd.DataFrame(reviews, columns=columns)
    df['Sentiment'] = df.apply(vader_sentiment_analysis, axis=1)
    result = df.to_dict(orient='records')
    df['Date'] = pd.to_datetime(df['Date'], format='%d %B %Y')
    df['Month'] = df['Date'].dt.strftime('%b %Y')
    df['Month_Short'] = df['Date'].dt.strftime('%b')

    monthly_sentiment_counts = df.groupby(['Month', 'Sentiment']).size().unstack(fill_value=0).reset_index()
    monthly_sentiment_counts['Month_Ordered'] = pd.to_datetime(monthly_sentiment_counts['Month'], format='%b %Y')
    monthly_sentiment_counts = monthly_sentiment_counts.sort_values('Month_Ordered')

    sentiment_chart_data = {
        "labels": monthly_sentiment_counts["Month"].tolist(),
        "datasets": []
    }
    for sentiment in ["Positive", "Negative", "Neutral"]:
        if sentiment in monthly_sentiment_counts:
            sentiment_chart_data["datasets"].append({
                "label": sentiment,
                "data": monthly_sentiment_counts[sentiment].tolist()
            })

    three_months_ago = datetime.today() - relativedelta(months=3)
    recent_reviews = df[df['Date'] >= three_months_ago]
    monthly_review_counts = recent_reviews.groupby(df['Date'].dt.to_period('M')).size().reset_index()
    monthly_review_counts.columns = ['Month', 'Reviews']
    monthly_review_counts['Month'] = monthly_review_counts['Month'].dt.strftime('%b')

    user_engagement = [
        {"date": row['Month'], "reviews": int(row['Reviews'])}
        for _, row in monthly_review_counts.iterrows()
    ]

    return jsonify({
        "message": result,
        "sentiment_trend": sentiment_chart_data,
        "user_engagement": user_engagement
    })

if __name__ == '__main__':
    app.run(debug=True)