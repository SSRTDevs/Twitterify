import sys
import tweepy
import os
backend_path = os.path.abspath(os.pardir).replace('\\', '\\\\')
sys.path.insert(0, backend_path)
from tweepy_cred import api, client

def profile_summarizer(username):
    user_obj = api.get_user(screen_name=username)
    name = user_obj._json['name']
    description = user_obj._json['description']
    followers = user_obj._json['followers_count']
    profile_image_url = user_obj._json['profile_image_url_https']

    user_tweets_data = api.user_timeline(screen_name=username, count=1, tweet_mode="extended")
    user_tweets = []
    for tweet in user_tweets_data:
        user_tweets.append(tweet._json['full_text'])
    user_obj = api.get_user(screen_name=username)
    name = user_obj._json['name']
    description = user_obj._json['description']
    followers = user_obj._json['followers_count']
    profile_image_url = user_obj._json['profile_image_url_https']

    q = "@{0} and -filter:retweets".format(username)
    mention_tweets_data = api.search_tweets(q=q, count=1, tweet_mode="extended")
    mention_tweets = []
    for tweet in mention_tweets_data:
        mention_tweets.append(tweet._json['full_text'])
    user_tweets_data = api.user_timeline(screen_name=username, count=1, tweet_mode="extended")
    user_tweets = []
    for tweet in user_tweets_data:
        user_tweets.append(tweet._json['full_text'])

    
    q = "@{0} and -filter:retweets".format(username)
    mention_tweets_data = api.search_tweets(q=q, count=1, tweet_mode="extended")
    mention_tweets = []
    for tweet in mention_tweets_data:
        mention_tweets.append(tweet._json['full_text'])

    res_obj = {
        "username": name,
        "description": description,
        "followers_count": followers,
        "profile_image_url": profile_image_url,
        "user_tweets": user_tweets,
        "mention_tweets": mention_tweets
    }
    
    return res_obj
