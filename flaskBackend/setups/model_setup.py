import setups.model.summarization_model as summarization_model
import setups.model.sentiment_model as sentiment_model
import setups.tokenizer.summarization_tokenizer as summarization_tokenizer
import setups.tokenizer.sentiment_tokenizer as sentiment_tokenizer
from transformers import AutoModelForSequenceClassification, pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os

summarization_model = AutoModelForSeq2SeqLM.from_pretrained(
    f'{os.getcwd()}/setups/model/summarization_model')
summarization_tokenizer = AutoTokenizer.from_pretrained(
    f'{os.getcwd()}/setups/tokenizer/summarization_tokenizer')

sentiment_model = AutoModelForSequenceClassification.from_pretrained(
    f'{os.getcwd()}/setups/model/sentiment_model')
sentiment_tokenizer = AutoTokenizer.from_pretrained(
    f'{os.getcwd()}/setups/tokenizer/sentiment_tokenizer')

summarizer = pipeline("summarization", model=summarization_model,
                      tokenizer=summarization_tokenizer)
sentiment = pipeline("sentiment-analysis", model=sentiment_model,
                     tokenizer=sentiment_tokenizer)


def tweet_summarizer(combined_tweets):
    try:
        res = summarizer(combined_tweets)
        return res[0]["summary_text"]
    except:
        print("Sequence length too large for model, cutting text in half and calling again")
        return tweet_summarizer(combined_tweets[:(len(combined_tweets) // 2)]) + tweet_summarizer(combined_tweets[(len(combined_tweets) // 2):])


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
