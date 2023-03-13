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
    #try:
    #    res = summarizer(combined_tweets)
    #    return res[0]["summary_text"]
    #except:
    #    print("Sequence length too large for model, cutting text in half and calling again")
    #    return tweet_summarizer(combined_tweets[:(len(combined_tweets) // 2)]) + tweet_summarizer(combined_tweets[(len(combined_tweets) // 2):])
    #raw_document = 'You must be 18 years old to live or work in New York State...'
    #prompt = "Produce an article summary of the following news article:"
    text = combined_tweets
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
        summary = summarizer(text, max_length=tokens, min_length=5, do_sample=False)[0]['summary_text']
    return summary


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
    # text = " ".join(combined_tweets)
    text = combined_tweets
    # print(text)
    tokens = topic_tokenizer(text, return_tensors='pt')
    output = topic_model(**tokens)

    scores = output[0][0].detach().numpy()
    scores = expit(scores)
    predictions = (scores >= 0.5) * 1

    output = []
    # Map to classes
    for i in range(len(predictions)):
        if predictions[i]:
            output.append(class_mapping[i])
    return output

# print(tweet_topic("Ye grandfather vala toh The Boys moment ho gaya Best thing, she will put it as whatsapp status or dp so that everyone can see how weird I was. But this is something which is cute and cringe at the same time.  Perfect example of how visuals and figures can be misleading at times. If you tie both ends of a 80m rope on a 50m pole,  only then it will satisfy the numbers given.  I remember my mom doing the same. Moments like these makes us nostalgic now. _Jadwani Very deep. This quote always reminds of Itachi Uchiha.  4india Nice, shortest solution saw till now. _jaden Awesome Jaden Well said, dheeraj !! Just wanted to add that self complimenting is equally beneficial as receiving them from loved ones. The reason I say this is because I believe that there might be times when we won't be appreciated much.  To be honest, I use to love writing essays in Hindi. It was my teacher who made me fall in love with the literature and I could still see that today.  Everything has good and bad in it. You can't make your blood boil by just looking at the bad side.  Congratulations !!  Symmetry is indeed beautiful ! So the radius of circle should be 3.  And 1/3rd of 9π is the answer. _texplorer So true. Yet seeking external validation is so taught to us that it becomes our nature as such. 3 Well, I believe that this struggle will continue because the point between logic and emotions is in an unstable equilibrium. You might attain it temporarily but hard to maintain it throughout. _texplorer Sach bata, kal se karunga kitne din se bol raha hai _kumar_4 Because to stay humble, you need to accept that you may not be always right, is what I think. Hence it is indeed difficult to develop. _raj_sharma DSA/Dev are the two sides of the same coin. Engineering is not just about problem solving but also about applications. So both the options go hand in hand.  Difficult to digest that  people of 2nd type are more than that of 1st type.  I was expecting a complete opposite distribution, when I clicked on the poll.  Awesome, Congratulations Definitely teaching. In fact, I'm doing it right now by helping with my mother's tuition. I'm not sure why, but after getting a decent job offer, I feel like I'm doing CP (competitive programming) more for fun now. I no "))