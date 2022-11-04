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
auth.set_access_token(os.environ.get('access_token'), os.environ.get('access_token_secret'))
api = tweepy.API(auth)

# Client
client = tweepy.Client(os.environ.get('bearer_token'), consumer_key=os.environ.get('api_key'), consumer_secret=os.environ.get('api_key_secret'),
                       access_token=os.environ.get('access_token'), access_token_secret=os.environ.get('access_token_secret'))

def thread_summarizer(url, count = 10):
    screen_name = url.split('/')[3]
    tweet_id = url.split('/')[-1]
    q = "from:{0} to:{0} conversation_id:{1}".format(screen_name, tweet_id)

    thread_tweets = []
    reply_tweets = []
    username = None
    profile_image_url = None
    references = []

    for tweet in api.search_tweets(q=q, count=count, tweet_mode='extended'):
        if(not username):
            username = tweet._json['user']['name']

        if(not profile_image_url):
            profile_image_url = tweet._json['user']['profile_image_url_https']

        thread_tweets.append(tweet._json['full_text'])

        link_regex = '((https?):((//)|(\\\\))+([\w\d:#@%/;$()~_?\+-=\\\.&](#!)?)*)'
        urls = re.findall(link_regex, tweet._json['full_text'])
        for url in urls:
            references.append(url[0])

    q = "from:{0} conversation_id:{1}".format(screen_name, tweet_id)
    for tweet in api.search_tweets(q=q, count=count, tweet_mode='extended'):
        if tweet._json['full_text'] not in thread_tweets:
            reply_tweets.append(tweet._json['full_text'])

    thread_tweets.reverse()
    return thread_tweets,reply_tweets,username,profile_image_url,references

url = 'https://twitter.com/warikoo/status/1588409404616888320'
thread_summarizer(url, 10)
