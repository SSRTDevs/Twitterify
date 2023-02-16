import os
from dotenv import load_dotenv
import tweepy
load_dotenv('.env')

# API
auth = tweepy.OAuthHandler(consumer_key=os.environ.get('consumer_key'),
                           consumer_secret=os.environ.get('consumer_secret'))
auth.set_access_token(os.environ.get('access_token'),
                      os.environ.get('access_token_secret'))
api = tweepy.API(auth)

# Client
client = tweepy.Client(os.environ.get('bearer_token'), consumer_key=os.environ.get('api_key'), consumer_secret=os.environ.get('api_key_secret'),
                       access_token=os.environ.get('access_token'), access_token_secret=os.environ.get('access_token_secret'))