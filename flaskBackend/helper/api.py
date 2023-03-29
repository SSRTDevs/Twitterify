from setups.tweepy_cred import api

def get_user(username):
    return api.get_user(screen_name=username, include_entities=False, skip_status=True)

def search_tweets(q, count, flag):
    return api.search_tweets(q=q, lang='en', count=count, tweet_mode='extended', include_entities=True)

def search_trending_tweets(q, geocode, count):
    return api.search_tweets(q=q, lang='en', geocode=geocode, count=count, tweet_mode='extended', include_entities=False)

def user_timeline(user_id, username, count):
    return api.user_timeline(user_id=user_id, screen_name=username, count=count, tweet_mode='extended', include_entities=False)

def closest_trends(latitude, longitude):
    return api.closest_trends(latitude, longitude)

def get_place_trends(woeid):
    return api.get_place_trends(woeid)

def get_status(id):
    return api.get_status(id=id, tweet_mode='extended')

def get_friends(screen_name): 
    return api.get_friends(screen_name=screen_name,count=10,skip_status=False,include_entities=False)
