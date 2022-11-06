import os
from transformers import AutoModelForSequenceClassification, pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model_path = "C:\\Users\\saket\\Desktop\\Website\\BE-project\\flaskBackend\\model\\"
tokenizer_path = "C:\\Users\\saket\\Desktop\\Website\\BE-project\\flaskBackend\\tokenizer\\"

summarization_model = AutoModelForSeq2SeqLM.from_pretrained(
    model_path + 'summarization_model')
summarization_tokenizer = AutoTokenizer.from_pretrained(tokenizer_path + 'summarization_tokenizer')

sentiment_model = AutoModelForSequenceClassification.from_pretrained(
    model_path + 'sentiment_model')
sentiment_tokenizer = AutoTokenizer.from_pretrained(
    tokenizer_path + 'sentiment_tokenizer')

summarizer = pipeline("summarization", model=summarization_model,
                      tokenizer=summarization_tokenizer)
sentiment = pipeline("sentiment-analysis", model=sentiment_model,
                     tokenizer=sentiment_tokenizer)
