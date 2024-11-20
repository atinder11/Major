import os
import google.generativeai as genai




API_KEY = "AIzaSyCL7uY3yYJQk9fUKRkvUHKfGwNfMxjWN8k"  

genai.configure(api_key=API_KEY)



# Create the model
generation_config = {
  "temperature": 0.5,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-pro",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
  ]
)

# Incorrect English string
incorrect_english = "elephant is very usefull bird. it give us milk . is very importent for human being."

# Prompt the model to correct the English
prompt = f"Please correct the following English sentence: {incorrect_english}"

chat_session = model.start_chat(history=[])
response = chat_session.send_message(prompt)
print(response.text)