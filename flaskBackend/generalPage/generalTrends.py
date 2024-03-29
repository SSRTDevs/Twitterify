# from setups.tweepy_cred import api
from helper.api import closest_trends, search_trending_tweets, get_place_trends, search_tweets
from helper.utilities import get_full_text, clean_text, current_time, format_count
from geopy.geocoders import Nominatim
from setups.model_setup import tweet_summarizer, tweet_analyser

def get_trend_count_name(trends, topic_count):
    trend_count_name = []

    for trend in trends['trends']:
        tweet_volume = trend['tweet_volume']
        trend_name = trend['name']
        if tweet_volume != None:
            trend_count_name.append([tweet_volume, trend_name])

    trend_count_name = sorted(trend_count_name, reverse=True)
    return trend_count_name[:topic_count]

def get_location_info(location):
    geolocator = Nominatim(user_agent="GetLoc")
    getLoc = geolocator.geocode(location)
    latitude = getLoc.latitude
    longitude = getLoc.longitude
    radius = "300km"
    geocode = (str(latitude) + "," + str(longitude) + "," + radius)

    return latitude, longitude, geocode

def get_locations_woeid(latitude , longitude):
    locations_woeid = []
    for locations in closest_trends(latitude, longitude):
        locations_woeid.append(locations["woeid"])
    return locations_woeid

def get_topic_tweets(topic_name, tweet_count, geocode):
    topic_tweets = []
    for tweet in search_trending_tweets(topic_name, geocode, tweet_count):
        full_text = get_full_text(tweet) 
        full_text = clean_text(full_text)
        topic_tweets.append(full_text)
    return topic_tweets

def get_trending_tweets(location, tweet_count = 5, topic_count = 4):
    latitude, longitude, geocode = get_location_info(location)
    locations_woeid = get_locations_woeid(latitude, longitude)
    result = []
    try :
        topics_count_name = []
        for woeid in locations_woeid:
            for trends in get_place_trends(woeid):
                topic_count_name = get_trend_count_name(trends, topic_count)
                for obj in topic_count_name:
                    topics_count_name.append(obj)

        for topic_count_name in topics_count_name:
            topic_name = topic_count_name[1]
            topic_tweet_count = topic_count_name[0]
            topic_tweet_count = format_count(topic_tweet_count)
            time_stamp = current_time()
            topic_tweets = get_topic_tweets(topic_name, tweet_count, geocode)
            topic_object = {
                "topic_name": topic_name,
                "topic_tweet_count": topic_tweet_count,
                "topic_tweets": topic_tweets,
                "time_stamp": time_stamp,
            }
            result.append(topic_object)
    except:
        print("Something is wrong beta, error ho raha hai @ get_trending_tweets") 
        
    return result

def get_hashtag_tweets(hashtag):
    hashtag = "#" + hashtag
    time_stamp = current_time()
    tweet_count = 10
    hashtag_tweets = []
    
    for tweet in search_tweets(hashtag, tweet_count, False):
        full_text = get_full_text(tweet) 
        full_text = clean_text(full_text)
        hashtag_tweets.append(full_text)    

    res_obj = {
        "hashtag": hashtag,
        "hashtag_tweet_count": format_count(len(hashtag_tweets)),
        "hashtag_tweets": hashtag_tweets,
        "time_stamp": time_stamp,
    }
    return res_obj

