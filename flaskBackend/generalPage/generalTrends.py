import tweepy
import os
backend_path = os.path.abspath(os.pardir).replace('\\', '\\\\')
import sys
sys.path.insert(0, backend_path)
from tweepy_cred import api,client
from geopy.geocoders import Nominatim
from collections import defaultdict
from model_setup import tweet_summarizer, tweet_analyser

def get_trending_topics_count(trends):
    trending_topics_count = []
    for trend in trends['trends']:
        if trend['tweet_volume'] != None:
            trending_topics_count.append(
                (trend['tweet_volume'], trend['name']))

    trending_topics_count = sorted(trending_topics_count, reverse=True)
    return trending_topics_count

def get_trending_tweets(location, tweet_count = 3, topic_count = 2):
    geolocator = Nominatim(user_agent="GetLoc")
    getLoc = geolocator.geocode(location)

    latitude = getLoc.latitude
    longitude = getLoc.longitude

    res_obj = defaultdict(list)

    for locations in api.closest_trends(latitude, longitude):
        for trends in api.get_place_trends(locations['woeid']):
            trending_topics_count = get_trending_topics_count(trends)[:topic_count]
            
            for trend in trending_topics_count:
                for tweet in api.search_tweets(q=trend[1],lang='en',count=tweet_count,tweet_mode='extended'):
                    res_obj[trend[1]].append(tweet._json['full_text'])

    return res_obj

def feed_model(trending_tweets):
    trending_tweets_summarization = {}
    trending_tweets_sentiment = {}

    for tweet_topic in trending_tweets:
        trending_tweets_summarization[tweet_topic] = tweet_summarizer(' '.join(trending_tweets[tweet_topic]))
        trending_tweets_sentiment[tweet_topic] = tweet_analyser(trending_tweets[tweet_topic])

    return trending_tweets_summarization,trending_tweets_sentiment
