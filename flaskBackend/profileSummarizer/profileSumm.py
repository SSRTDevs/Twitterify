# from setups.tweepy_cred import api
from helper.api import get_user,search_tweets, user_timeline, get_friends
from helper.utilities import get_full_text, format_profile_image_url,format_count
import calendar
from datetime import datetime
import tweepy
import pandas as pd
from textblob import TextBlob
import re

def get_user_tweet_dates(user_tweets_data):
    tweet_dates = []
    for tweet in user_tweets_data:
        tweet_dates.append(tweet._json['created_at'])
    return tweet_dates

def get_date_details(date_str):
    date = datetime.strptime(date_str, '%a %b %d %H:%M:%S %z %Y')
    year = date.year
    month = calendar.month_abbr[date.month]
    week = date.isocalendar()[1]
    key = (week, month, year)

    return month, week, key

def cleanTxt(text):
    text = re.sub('@[A-Za-z0–9]+', '', text)
    text = re.sub('#', '', text)
    text = re.sub('RT[\s]+', '', text)
    text = re.sub('https?:\/\/\S+', '', text)
    return text

def create_DataFrame(user_tweets_data):
    df = pd.DataFrame([tweet.full_text for tweet in user_tweets_data], columns=['Tweet'])
    df["Tweet"] = df["Tweet"].apply(cleanTxt)
    return df

def sentiment_textblob(text):
    if TextBlob(text).sentiment.polarity > 0:
        return "pos"
    elif TextBlob(text).sentiment.polarity < 0:
        return "neg"
    return "neutral"

def getSubjectivity(text):
    return TextBlob(text).sentiment.subjectivity

def get_sentiments(user_tweets_data):
    df = create_DataFrame(user_tweets_data)
    df['Sentiment'] = df['Tweet'].apply(sentiment_textblob)
    df['Subjectivity'] = df['Tweet'].apply(getSubjectivity)
    df1 = df.groupby('Sentiment').count()
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
    
    sentiment_obj = {
        "sentiments": df.to_json(),
        "pos_count": str(pos),
        "neg_count": str(neg),
        "neutral_count": str(neutral)
    }
    return sentiment_obj

def get_user_details(username, user_obj, user_tweets_data):
    name = user_obj._json['name']
    description = user_obj._json['description']
    followers = format_count(user_obj._json['followers_count'])
    profile_image_url = format_profile_image_url(user_obj._json['profile_image_url'])
    created_at = user_obj._json['created_at']
    arr = created_at.split()
    created_at = arr[1] + ", " + arr[-1]

    user_tweets = []
    for tweet in user_tweets_data:
        user_tweets.append(get_full_text(tweet))

    q = "@{0} and -filter:retweets".format(username)
    mention_tweets_data = search_tweets(q, 1, False)
    mention_tweets = []
    for tweet in mention_tweets_data:
        mention_tweets.append(get_full_text(tweet))

    user_details = {
        "result": "success",
        "username": name,
        "description": description,
        "followers_count": followers,
        "created_at": created_at,
        "profile_image_url": profile_image_url,
        "user_tweets": user_tweets,
        "mention_tweets": mention_tweets
    }
    return user_details

def get_user_activity(user_tweets_data):
    tweet_dates = get_user_tweet_dates(user_tweets_data)    
    tweet_creation_freq = {}
    month_weeks = {}
    for date_str in tweet_dates:
        month, week, key = get_date_details(date_str)

        if key not in tweet_creation_freq.items():
            tweet_creation_freq.setdefault(key, 0)
        tweet_creation_freq[key] += 1
    
        if month not in month_weeks:    
            month_weeks.setdefault(month , set())
        month_weeks[month].add(week)

    month_freq = {}
    for key, value in month_weeks.items():
        month_freq[key] = len(value)//2

    freq_payload = []

    for key, value in tweet_creation_freq.items():
        week = key[0]
        month = key[1]
        year = key[2]
        title = ""
        
        if month_freq[month] == 0:
            title = (month + ",'" + str(year%100))
        month_freq[month] -= 1

        res_obj = {
            'title': title,
            'week': week,
            'month': month,
            'year': year,
            'count': value
        }
        freq_payload.append(res_obj)
    freq_payload.reverse()
    return {"payload": freq_payload}

def profile_summary(username):
    try:
        user_obj = get_user(username)
        user_id = user_obj._json['id']
        user_tweets_data = user_timeline(user_id, username, 50)
    
    except tweepy.errors.Unauthorized:
        res_obj = {
            "result":"private_account",
        }
        return res_obj, res_obj
    
    res_obj = get_sentiments(user_tweets_data)
    res_obj.update(get_user_details(username, user_obj, user_tweets_data))
    res_obj.update(get_user_activity(user_tweets_data))
    
    return res_obj

def get_user_friends(username): 
    user = get_user(username)

    friends = []
    for friend in get_friends(user.screen_name):
        friends_obj = {
            "name": friend._json["name"],
            "screen_name": friend._json["screen_name"],
            "profile_image_url": format_profile_image_url(friend._json["profile_image_url"])
        }
        friends.append(friends_obj)

    return friends 
