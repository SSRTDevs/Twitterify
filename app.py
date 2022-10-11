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

def trending_tweets(api, client, location, tweet_count, topic_count):
    geolocator = Nominatim(user_agent="GetLoc")
    getLoc = geolocator.geocode(location)

    latitude = getLoc.latitude
    longitude = getLoc.longitude

    result = {}


    for locations in api.closest_trends(latitude, longitude):
        for trends in api.get_place_trends(locations['woeid']):
            trending_topics_volume = get_trending_topics_volume(trends)[:topic_count]

            for trend in trending_topics_volume:
                q = trend[1]
                result[q] = []
                
                print("Topic : " + q)
                for tweet in api.search_tweets(q=q,count=tweet_count):
                    print(tweet._json['text'])
                    result[q].append(tweet._json['text'])
    
    print(result)
    
    return result

def user_summary(client, api, username, tweet_count):
    user_id = client.get_user(username=username).data.id
    tweets = api.user_timeline(user_id = user_id, count=tweet_count)
    tweet_list = [tweet._json["text"] for tweet in tweets]
    for tweet in tweets:
        description = tweet._json["user"]["description"]
        profile_image = tweet.user.profile_image_url_https
        break
    print(tweet_list, description, profile_image)
    return tweet_list, description, profile_image
        
    



#trending_tweets(api, client, "Mumbai", 2, 2)
user_summary(client, api, "_SaketThota", 5)
