import tweepy
import os
backend_path = os.path.abspath(os.pardir).replace('\\', '\\\\')
import sys
sys.path.insert(0, backend_path)
from tweepy_cred import api,client

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

    res_obj = {
        'thread_tweets': thread_tweets,
        'reply_tweets' : reply_tweets,
        'username' : username,
        'profile_image_url': profile_image_url,
        'references' : references
    }

    return res_obj
