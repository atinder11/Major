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
    match = re.search(r'/gp/product/([A-Z0-9]{10})', product_url)
    if match:
        product_id = match.group(1)
        review_url = f'https://www.amazon.in/product-reviews/{product_id}?ie=UTF8&reviewerType=all_reviews'
        return review_url
    else:
        raise ValueError("Invalid product URL format")

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

if __name__ == '__main__':
    app.run(debug=True)
