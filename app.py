import tweepy
import configparser
from geopy.geocoders import Nominatim

config = configparser.ConfigParser()
config.read('config.ini')

# Api
api_key = config['twitter']['api_key']
api_key_secret = config['twitter']['api_key_secret']

# Access
access_token = config['twitter']['access_token']
access_token_secret = config['twitter']['access_token_secret']

# Consumer
consumer_key = config['twitter']['consumer_key']
consumer_secret = config['twitter']['consumer_secret']

# bearer
bearer_token = config['twitter']['bearer_token']

# user data
# keyword based

client = tweepy.Client(bearer_token, consumer_key=api_key, consumer_secret=api_key_secret,
                       access_token=access_token, access_token_secret=access_token_secret)

auth = tweepy.OAuthHandler(consumer_key=consumer_key, consumer_secret=consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

def get_trending_topics_volume(trends):
    trending_topics_volume = []
    for trend in trends['trends']:
        if trend['tweet_volume'] != None:
            trending_topics_volume.append(
                (trend['tweet_volume'], trend['name']))

    trending_topics_volume = sorted(trending_topics_volume, reverse=True)
    return trending_topics_volume

def trending_tweets(api, client, location):
    geolocator = Nominatim(user_agent="GetLoc")
    getLoc = geolocator.geocode(location)

    latitude = getLoc.latitude
    longitude = getLoc.longitude

    count = 2

    for locations in api.closest_trends(latitude, longitude):
        for trends in api.get_place_trends(locations['woeid']):
            trending_topics_volume = get_trending_topics_volume(trends)[:count]

            for trend in trending_topics_volume:
                q = trend[1]
                print("Topic : " + q)
                for tweet in api.search_tweets(q=q,count=count):
                    print(tweet._json['text'])


trending_tweets(api, client, "Mumbai")

