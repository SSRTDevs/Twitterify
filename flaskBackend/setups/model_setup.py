from transformers import AutoModelForSequenceClassification, pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os
import numpy as np
from scipy.special import expit

summarization_model = AutoModelForSeq2SeqLM.from_pretrained(
    f'{os.getcwd()}/setups/model/summarization_model')
summarization_tokenizer = AutoTokenizer.from_pretrained(
    f'{os.getcwd()}/setups/tokenizer/summarization_tokenizer')

sentiment_model = AutoModelForSequenceClassification.from_pretrained(
    f'{os.getcwd()}/setups/model/sentiment_model')
sentiment_tokenizer = AutoTokenizer.from_pretrained(
    f'{os.getcwd()}/setups/tokenizer/sentiment_tokenizer')

topic_model = AutoModelForSequenceClassification.from_pretrained(f'{os.getcwd()}/setups/model/topic_model')
topic_tokenizer = AutoTokenizer.from_pretrained(f'{os.getcwd()}/setups/tokenizer/topic_tokenizer')

summarizer = pipeline("summarization", model=summarization_model,
                      tokenizer=summarization_tokenizer)
sentiment = pipeline("sentiment-analysis", model=sentiment_model,
                     tokenizer=sentiment_tokenizer)


def tweet_summarizer(combined_tweets):
    summary = ""
    text = " ".join(combined_tweets)
    try : 
        tokenized_text = summarizer.tokenizer(text, return_tensors='pt')
        input_ids = tokenized_text['input_ids']
        max_length = 128
        tokens = input_ids.size(1)//2
        if input_ids.size(1) > 512:
            stride = 512
            summaries = []
            for i in range(0, input_ids.size(1), stride):
                start = max(0, i - max_length)
                end = min(input_ids.size(1), i + stride)
                input_ids_chunk = input_ids[:, start:end]
                summary = summarizer.model.generate(input_ids_chunk, max_length=max_length, min_length=30, do_sample=False)[0]
                summary_text = summarizer.tokenizer.decode(summary, skip_special_tokens=True)
                summaries.append(summary_text)
            summary = ' '.join(summaries)
        else:
            summary = summarizer(text, max_length=tokens, min_length=min(1,tokens), do_sample=False)[0]['summary_text']
        return summary
    except: 
        print("Somethings wrong beta in summarizer_model")
    return "No Summary Generated"


def tweet_analyser(tweets):
    pos, neg, neu = 0, 0, 0
    for tweet in tweets:
        try:
            res = sentiment(tweet)[0]
            if res["label"] == "POS":
                pos += 1
            elif res["label"] == "NEG":
                neg += 1
            else:
                neu += 1
        except:
            pass
    return {"pos": pos, "neg": neg, "neu": neu}


def summarize(text): 
    results = summarizer(text,
        min_length = 5,
        truncation=True,
        max_length=100,
    )
    return results

def tweet_topic(combined_tweets):
    class_mapping = topic_model.config.id2label
     # Concatenate the list of strings and truncate to a maximum length of 1024
    text = " ".join(combined_tweets)[:1024]
    output = [] 
    try : 
        # Tokenize the truncated text with a larger max_length
        tokens = topic_tokenizer(text, max_length=1024, truncation=True, return_tensors='pt' )
        output = topic_model(**tokens)

        scores = output[0][0].detach().numpy()
        scores = expit(scores)
        predictions = (scores >= 0.5) * 1

        output = []
        # Map to classes
        for i in range(len(predictions)):
            if predictions[i]:
                output.append(class_mapping[i])
    except : 
        print("Somethings wrong with topic detection model beta")
    return output
