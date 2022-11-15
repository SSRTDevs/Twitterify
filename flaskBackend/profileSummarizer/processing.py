from setups.tweepy_cred import api, client, auth
import nltk
import io
import pprint
import numpy as np
from textblob import TextBlob
import os
import matplotlib.pyplot as plt
import re
from nltk.classify import SklearnClassifier
from nltk.classify import ClassifierI
from nltk.tokenize import sent_tokenize, word_tokenize
import pandas as pd
import pickle
import plotly.express as px
import wordcloud
from wordcloud import STOPWORDS
from wordcloud import WordCloud
import json
import matplotlib.animation as animation
from matplotlib import style
import base64

def cleanTxt(text):
    text = re.sub('@[A-Za-z0–9]+', '', text)
    text = re.sub('#', '', text)
    text = re.sub('RT[\s]+', '', text)
    text = re.sub('https?:\/\/\S+', '', text)
    return text

def find_features(document):
    all_words = np.load("allwords.npy")
    words = word_tokenize(document)
    features = {}
    for w in all_words:
        features[w] = (w in words)
    return features

def nam_adj(df):
    names, adjectives, nouns, adverbs = [], [], [], []
    for twt in df["Tweet"]:
        words = word_tokenize(twt)
        pairs = nltk.pos_tag(words)
        for pair in pairs:
            if pair[1] == "NNP":
                names.append(pair[0])
            elif pair[1] == "JJ" or pair[1] == "JJS" or pair[1] == "JJR":
                adjectives.append(pair[0])
            elif pair[1] == "NN" or pair[1] == "NNS":
                nouns.append(pair[0])
            elif pair[1] == "RB" or pair[1] == "RBR" or pair[1] == "RBS":
                adverbs.append(pair[0])
    return names, adjectives, nouns, adverbs

def getSubjectivity(text):
    return TextBlob(text).sentiment.subjectivity

def sentiment_textblob(text):
    if TextBlob(text).sentiment.polarity > 0:
        return "pos"
    elif TextBlob(text).sentiment.polarity < 0:
        return "neg"
    return "neutral"

def get_user_tweets(username, tweets):
    tweets = api.user_timeline(screen_name=username, count=tweets, tweet_mode="extended" )
    global df
    df = pd.DataFrame([tweet.full_text for tweet in tweets], columns=['Tweet'])
    df["Tweet"] = df["Tweet"].apply(cleanTxt)

def get_word_cloud1():
    names, adjectives, nouns, adverbs = nam_adj(df)
    lst = [item.lower() for item in names]
    new_stopwords = {"today", "watch", "people", "amp",
                     "time", "day", "week", "people", "year", "S"}
    stopwords = set(STOPWORDS)
    stopwords = stopwords.union(new_stopwords)
    wordcloud = WordCloud(width=800, height=800,
                          background_color='black',
                          stopwords=stopwords,
                          min_font_size=10).generate(" ".join(lst))
    plt.figure(figsize=(2, 2), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad=0)
    # bytes_image = io.BytesIO()
    # plt.savefig(bytes_image, format='png')
    # bytes_image.seek(0)
    # print(bytes_image.getvalue())
    # bytes_image = json.load(bytes_image.getvalue().decode("unicode_escape"))
    # return bytes_image
    plt.savefig('wordcloud.png')
    with open("wordcloud.png", "rb") as img_file:
        encoded_data = base64.b64encode(img_file.read())
    encoded_string = encoded_data.decode('UTF-8')
    json_data = json.dumps(encoded_string,indent=2)
    return json_data

def get_word_cloud2():
    names, adjectives, nouns, adverbs = nam_adj(df)
    lst = [item.lower() for item in nouns]
    new_stopwords = {"today", "watch", "people", "amp",
                     "time", "day", "week", "people", "year", "S"}
    stopwords = set(STOPWORDS)
    stopwords = stopwords.union(new_stopwords)
    wordcloud = WordCloud(width=800, height=800,
                          background_color='black',
                          stopwords=stopwords,
                          min_font_size=10).generate(" ".join(lst))
    plt.figure(figsize=(2, 2), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad=0)
    # bytes_image = io.BytesIO()
    # plt.savefig(bytes_image, format='png')
    # bytes_image.seek(0)
    plt.savefig('wordcloud.png')
    with open("wordcloud.png", "rb") as img_file:
        encoded_data = base64.b64encode(img_file.read())
    encoded_string = encoded_data.decode('UTF-8')
    json_data = json.dumps(encoded_string,indent=2)
    return json_data


def get_sentiments(Username,tweets):
    get_user_tweets(Username, tweets)
    df['Sentiment'] = df['Tweet'].apply(sentiment_textblob)
    df['Subjectivity'] = df['Tweet'].apply(getSubjectivity)
    df1 = df.groupby('Sentiment').count()
    sub_mean = df["Subjectivity"].mean()
    try:
        pos = df1.loc(0)["pos"]["Tweet"]
    except:
        pos = 0
    try:
        neg = df1.loc(0)["neg"]["Tweet"]
    except:
        neg = 0
    try:
        neutral = df1.loc(0)["neutral"]["Tweet"]
    except:
        neutral = 0
    return df.to_json(),str(pos),str(neg),str(neutral)

def get_word_clouds(Username, tweets): 
    get_user_tweets(Username, tweets)
    wordcloud1 = get_word_cloud1()
    wordcloud2 = get_word_cloud2()
    return wordcloud1,wordcloud2