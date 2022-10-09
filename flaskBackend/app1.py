# !/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu Apr  1 13:41:53 2021

@author: shashwat
"""


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
from tweepy.streaming import StreamListener
import json
import matplotlib.animation as animation
from matplotlib import style


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


def make_wordcloud_df(df):
    words = []
    new_stopwords = {"today", "watch", "people", "amp",
                     "time", "day", "week", "people", "year", "S"}
    stopwords = set(STOPWORDS)
    stopwords = stopwords.union(new_stopwords)
    for twt in df.Tweet:
        tokens = twt.split()

        for i in range(len(tokens)):
            tokens[i] = tokens[i].lower()
            words.append(tokens[i])

    wordcloud = WordCloud(width=800, height=800,
                          background_color='black',
                          stopwords=stopwords,
                          min_font_size=10).generate(" ".join(words))
    plt.figure(figsize=(8, 8), facecolor=None)
    plt.imshow(wordcloud)
    plt.axis("off")
    plt.tight_layout(pad=0)
    plt.show()
    a1, a2, a3 = st.beta_columns((2, 1, 1))
    a1.subheader("General word cloud")
    a1.pyplot()


def getSubjectivity(text):
    return TextBlob(text).sentiment.subjectivity


def sentiment_textblob(text):
    if TextBlob(text).sentiment.polarity > 0:
        return "pos"
    elif TextBlob(text).sentiment.polarity < 0:
        return "neg"
    return "neutral"


def user_tweets(username, tweets):
    consumer_key = 'j5z6oTkkODllydAv4TJa8FxJS'
    consumer_secret = 'rSig6RvaLe2v8GzrsNsFpirLF2OKVxKune1NqXMuY8JV42RmKv'
    access_token = '1010014270845698050-rNQS8lrmTbzgMWpNI1khQA3xUSNMEK'
    access_token_secret = 'n4Jql8f1ao1McHKg5FQHQxTq1vV9ykcPI9hXBIp0CQKFn'
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)
    tweets = api.user_timeline(username, count=tweets, tweet_mode='extended')
    df = pd.DataFrame([tweet.full_text for tweet in tweets], columns=['Tweet'])
    df["Tweet"] = df["Tweet"].apply(cleanTxt)
    return df


def user_data(user, tweets):
    df = user_tweets(user, int(tweets))
    # st.write(df)
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
    print(df,df1)
    
    df2 = pd.concat([df, df1], ignore_index=True)
    print(df2)
    return df2
    # names, adjectives, nouns, adverbs = nam_adj(df)
    # lst = [item.lower() for item in names]
    # new_stopwords = {"today", "watch", "people", "amp",
    #                  "time", "day", "week", "people", "year", "S"}
    # stopwords = set(STOPWORDS)
    # stopwords = stopwords.union(new_stopwords)
    # wordcloud = WordCloud(width=800, height=800,
    #                       background_color='black',
    #                       stopwords=stopwords,
    #                       min_font_size=10).generate(" ".join(lst))
    # plt.figure(figsize=(8, 8), facecolor=None)
    # plt.imshow(wordcloud)
    # plt.axis("off")
    # plt.tight_layout(pad=0)
    # # plt.show()
    # bytes_image = io.BytesIO()
    # plt.savefig(bytes_image, format='png')
    # bytes_image.seek(0)
    # return bytes_image


'''
def user_data(user, tweets):
    df = user_tweets(user, int(tweets))
    # st.write(df)
    df['Sentiment'] = df['Tweet'].apply(sentiment_textblob)
    df['Subjectivity'] = df['Tweet'].apply(getSubjectivity)
    st.subheader("Tweets")
    st.write(df)

    df1 = df.groupby('Sentiment').count()
    sub_mean = df["Subjectivity"].mean()

    # st.write(df1.loc(0)["pos"]['Tweet'])
    # st.write(df1.loc(0)["neg"]['Tweet'])
    # st.write(df1.loc(0)["neutral"]['Tweet'])
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
    s1, s2, s3 = st.beta_columns((1, 1, 1))
    s1.success("pos: {}".format(pos))
    s2.error("neg: {}".format(neg))
    s3.info("neutral: {}".format(neutral))
    # y = np.array([pos,neg,neutral])

    # labels = ["pos","neg","neutral"]
    # st.header("Percentage of tweets ")
    # fig = px.pie(values = y, names = labels)
    # st.plotly_chart(fig)
    # make_wordcloud_df(df)
    names, adjectives, nouns, adverbs = nam_adj(df)
    # a1, a2, a3 = st.beta_columns((2, 1, 2))
    # a1.subheader("Names talked about : ")
    # make_wordcloud(names)
    lst = [item.lower() for item in names]
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
    # plt.show()
    bytes_image = io.BytesIO()
    plt.savefig(bytes_image, format='png')
    bytes_image.seek(0)
    # a1.pyplot()
    # a3.subheader("Things talked about : ")
    # # make_wordcloud(nouns)
    # lst = [item.lower() for item in nouns]
    # new_stopwords = {"today", "watch", "people", "amp",
    #                  "time", "day", "week", "people", "year", "S"}
    # stopwords = set(STOPWORDS)
    # stopwords = stopwords.union(new_stopwords)
    # wordcloud = WordCloud(width=800, height=800,
    #                       background_color='black',
    #                       stopwords=stopwords,
    #                       min_font_size=10).generate(" ".join(lst))
    # plt.figure(figsize=(8, 8), facecolor=None)
    # plt.imshow(wordcloud)
    # plt.axis("off")
    # plt.tight_layout(pad=0)
    # plt.show()
    # a3.pyplot()
    return bytes_image
'''


def user_data_naive(user, tweets):
    df = user_tweets(user, int(tweets))
    # st.write(df)
    df['Sentiment'] = df['Tweet'].apply(tw_sentiment)
    #df['Subjectivity'] = df['Tweet'].apply(getSubjectivity)
    st.subheader("Tweets")
    st.write(df)
    df1 = df.groupby('Sentiment').count()
    #sub_mean = df["Subjectivity"].mean()
    #st.write("Factuality percentage : {} ".format((1-sub_mean)*100))
    # st.write(df1.loc(0)["pos"]['Tweet'])
    # st.write(df1.loc(0)["neg"]['Tweet'])
    # st.write(df1.loc(0)["neutral"]['Tweet'])
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
    s1, s2, s3 = st.beta_columns((1, 1, 1))
    s1.success("pos: {}".format(pos))
    s2.error("neg: {}".format(neg))
    s3.info("neutral: {}".format(neutral))
    y = np.array([pos, neg, neutral])

    # labels = ["pos","neg","neutral"]
    # st.header("Percentage of tweets ")
    # fig = px.pie(values = y, names = labels)
    # st.plotly_chart(fig)
    # make_wordcloud_df(df)
    names, adjectives, nouns, adverbs = nam_adj(df)
    a1, a2, a3 = st.beta_columns((2, 1, 2))
    a1.subheader("Names talked about : ")
    # make_wordcloud(names)
    lst = [item.lower() for item in names]
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
    a1.pyplot()
    a3.subheader("Things talked about : ")
    # make_wordcloud(nouns)
    lst = [item.lower() for item in nouns]
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
    a3.pyplot()


def live_stream(word, number_of_tweets):
    # consumer key, consumer secret, access token, access secret.
    ckey = "43Py8H7TanGk8MsQa4OQrPkXh"
    csecret = "f34JoWamtLjpCqwbqxm6Ml5tDDMoyb432rkLycqH3ot3sfLHVK"
    atoken = "1010014270845698050-bo929URvOonltIawK5m9EiOBXDFQyW"
    asecret = "vWP0kHUJlqrUwRtJMH32QGcwTVcHlBingfmkJfrzFzPgH"

    class listener(StreamListener):
        def __init__(self, num_tweets_to_grab):
            self.counter = 0
            self.num_tweets_to_grab = num_tweets_to_grab
            self.lst = []

        def on_data(self, data):
            all_data = json.loads(data)
            tweet = all_data["text"]
            sentiment = sentiment_textblob(tweet)
            print(tweet, sentiment)
            output = open("twitter-out3.txt", "a")
            output.write(sentiment)
            output.write("\n")
            self.counter += 1

            if self.counter == self.num_tweets_to_grab:
                return False

            return True

        def on_error(self, status):
            print(status)

    auth = OAuthHandler(ckey, csecret)
    auth.set_access_token(atoken, asecret)
    #progress = stqdm(range(int(number_of_tweets)))

    twitterStream = Stream(auth, listener(number_of_tweets))
    twitterStream.filter(track=[word])


def analyse():
    # user = st.text_input("Eneter the username of the twitter user :")
    # #tweets = st.number_input("Enter the number of tweets you want to analyse:")
    # tweets = st.slider(
    #     "Enter the number of tweets you want to analyse:", 10, 200, 10)

    # button = st.button("Analyse")
    # if button:
    return user_data("@kunalstwt", 20)


def analyse_naive():
    user = st.text_input("Eneter the username of the twitter user :")
    tweets = st.slider(
        "Enter the number of tweets you want to analyse:", 10, 200, 10)
    button = st.button("Analyse")
    if button:
        user_data_naive(user, tweets)


def ps():
    st.subheader("Live sentiment analyzer")
    word = st.text_input(
        "Enter the word for which you want to get the public sentiment")
    twts = st.slider(
        "Enter the number of tweets you want to fetch", 10, 10000, 10)
    button = st.button("Fetch")
    if button:
        live_stream(word, twts)
        style.use("ggplot")

        fig = plt.figure()
        ax1 = fig.add_subplot(1, 1, 1)

        pullData = open("twitter-out3.txt", "r").read()
        lines = pullData.split('\n')

        xar = []
        yar = []

        x = 0
        y = 0

        for l in lines:
            x += 1
            if "pos" in l:
                y += 1
            elif "neg" in l:
                y -= 1
            elif "neutral" in l:
                pass

            xar.append(x)
            yar.append(y)

        ax1.clear()
        ax1.plot(xar, yar)
        #ani = animation.FuncAnimation(fig, animate, interval=1)
        plt.show()
        st.pyplot()
        os.remove("twitter-out3.txt")


def main():
    consumer_key = 'j5z6oTkkODllydAv4TJa8FxJS'
    consumer_secret = 'rSig6RvaLe2v8GzrsNsFpirLF2OKVxKune1NqXMuY8JV42RmKv'
    access_token = '1010014270845698050-rNQS8lrmTbzgMWpNI1khQA3xUSNMEK'
    access_token_secret = 'n4Jql8f1ao1McHKg5FQHQxTq1vV9ykcPI9hXBIp0CQKFn'
    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth)
    # st.set_option('deprecation.showPyplotGlobalUse', False)
    # st.title(" Twitter Analyzer ")
    # st.sidebar.title(" Choose Option : ")
    # classifier = st.sidebar.selectbox(
    #     "", ("Profile Analysis", "Profile Analysis (N.B)", "Live Sentiment Tracker"))
    # # if st.sidebar.checkbox("Analyse a twitter account : ", key = "a"):
    # if classifier == "Profile Analysis":
    #     analyse()
    # elif classifier == "Profile Analysis (N.B)":
    #     analyse_naive()
    # elif classifier == "Live Sentiment Tracker":
    #     ps()
    return analyse()


def check():
    print("Yups its working")


if __name__ == '__main__':
    main()
