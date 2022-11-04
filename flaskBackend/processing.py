# !/usr/bin/env python3
# -*- coding: utf-8 -*-

from asyncio.windows_events import NULL
import streamlit as st
import nltk
import io
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
import tweepy
import plotly.express as px
import wordcloud
from wordcloud import STOPWORDS
from wordcloud import WordCloud
from tweepy import Stream
from tweepy import OAuthHandler
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


def tw_sentiment(tweet):
    with open('naivebayes.pickle', 'rb') as f:
        clf = pickle.load(f)
    tweet_features = find_features(tweet)
    d = clf.prob_classify(tweet_features)
    if d.prob("neg") > 0.9:
        return "neg "
    elif d.prob("pos") > 0.6:
        return "pos"
    return "neutral"


def find_features(document):
    all_words = np.load("allwords.npy")
    words = word_tokenize(document)
    features = {}
    for w in all_words:
        features[w] = (w in words)
    return features


def make_wordcloud(lst):
    lst = [item.lower() for item in lst]
    new_stopwords = {"today", "watch", "people", "amp",
                     "time", "day", "week", "people", "year", "S"}
    stopwords = set(STOPWORDS)
    stopwords = stopwords.union(new_stopwords)
    wordcloud = WordCloud(width=800, height=800,
                          background_color='black',
                          stopwords=stopwords,
                          min_font_size=10).generate(" ".join(lst))
    plt.figure(figsize=(8, 8), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad=0)
    plt.show()
    a1, a2, a3 = st.beta_columns((2, 1, 1))
    a1.pyplot()


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
    consumer_key = 'j5z6oTkkODllydAv4TJa8FxJS'
    consumer_secret = 'rSig6RvaLe2v8GzrsNsFpirLF2OKVxKune1NqXMuY8JV42RmKv'
    access_token = '1010014270845698050-rNQS8lrmTbzgMWpNI1khQA3xUSNMEK'
    access_token_secret = 'n4Jql8f1ao1McHKg5FQHQxTq1vV9ykcPI9hXBIp0CQKFn'
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)
    tweets = api.user_timeline(username, count=tweets, tweet_mode='extended')
    global df
    df = pd.DataFrame([tweet.full_text for tweet in tweets], columns=['Tweet'])
    df["Tweet"] = df["Tweet"].apply(cleanTxt)


def get_sentiments():
    df['Sentiment'] = df['Tweet'].apply(sentiment_textblob)
    df['Subjectivity'] = df['Tweet'].apply(getSubjectivity)
    return df


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
    # return bytes_image
    plt.savefig('wordcloud.png')
    with open("wordcloud.png", "rb") as img_file:
        encoded_string = base64.b64encode(img_file.read())
    return encoded_string


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
        encoded_string = base64.b64encode(img_file.read())
    return encoded_string
