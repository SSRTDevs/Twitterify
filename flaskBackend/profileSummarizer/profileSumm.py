import tweepy
from dotenv import dotenv_values
import re
import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(os.pardir, '.env')
load_dotenv(dotenv_path)

#API
auth = tweepy.OAuthHandler(consumer_key=os.environ.get('consumer_key'),
                           consumer_secret=os.environ.get('consumer_secret'))
auth.set_access_token(os.environ.get('access_token'),
                      os.environ.get('access_token_secret'))
api = tweepy.API(auth)

# Client
client = tweepy.Client(os.environ.get('bearer_token'), consumer_key=os.environ.get('api_key'), consumer_secret=os.environ.get('api_key_secret'),
                       access_token=os.environ.get('access_token'), access_token_secret=os.environ.get('access_token_secret'))

def profile_summarizer(username):
    obj = api.get_user(screen_name=username)
    print(obj._json)
    name = obj._json['name']
    description = obj._json['description']
    followers = obj._json['followers_count']
    profile_image_url = obj._json['profile_image_url_https']

    user_tweets
    mention_tweets


profile_summarizer("warikoo")
