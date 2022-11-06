import re
import os
from os.path import join, dirname
from dotenv import load_dotenv
import tweepy

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