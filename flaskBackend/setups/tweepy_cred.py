import os
from dotenv import load_dotenv
import tweepy
load_dotenv('.env')

consumer_key = os.environ.get('consumer_key')
consumer_secret = os.environ.get('consumer_secret')
access_token = os.environ.get('access_token')
access_token_secret = os.environ.get('access_token_secret')
bearer_token = os.environ.get('bearer_token')

# API
auth = tweepy.OAuthHandler(consumer_key=consumer_key,
                           consumer_secret=consumer_secret)
auth.set_access_token(access_token,
                      access_token_secret)
api = tweepy.API(auth)

# Client
client = tweepy.Client(bearer_token, consumer_key=consumer_key, consumer_secret=consumer_secret,
                       access_token=access_token, access_token_secret=access_token_secret)
