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
    #try:
    #    res = summarizer(combined_tweets)
    #    return res[0]["summary_text"]
    #except:
    #    print("Sequence length too large for model, cutting text in half and calling again")
    #    return tweet_summarizer(combined_tweets[:(len(combined_tweets) // 2)]) + tweet_summarizer(combined_tweets[(len(combined_tweets) // 2):])
    #raw_document = 'You must be 18 years old to live or work in New York State...'
    #prompt = "Produce an article summary of the following news article:"
    results = summarizer(combined_tweets,
        min_length = 5,
        truncation=True,
        max_length=50,
    )
        #print(combined_tweets)
        #print()
        #print(len(combined_tweets))
        #print()
        #print(results[0]["summary_text"])
    return results[0]["summary_text"]


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
