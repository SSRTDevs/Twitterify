from setups.tweepy_cred import api
import tweepy

#import sys
#sys.path.insert(0,"/Users/shashwat/Twitterify/flaskBackend/setups" )
#from tweepy_cred import api

def profile_summarizer(username):
    try:
        user_obj = api.get_user(screen_name=username)
        name = user_obj._json['name']
        description = user_obj._json['description']
        followers = user_obj._json['followers_count']
        profile_image_url = user_obj._json['profile_image_url_https']

        user_tweets_data = api.user_timeline(screen_name=username, count=1, tweet_mode="extended")
        print(user_tweets_data)
        user_tweets = []
        for tweet in user_tweets_data:
            user_tweets.append(tweet._json['full_text'])
        user_obj = api.get_user(screen_name=username)
        name = user_obj._json['name']
        description = user_obj._json['description']
        followers = user_obj._json['followers_count']
        profile_image_url = user_obj._json['profile_image_url_https']
        created_at = user_obj._json['created_at']
        arr = created_at.split()
        created_at = arr[1] + ", " + arr[-1]

        q = "@{0} and -filter:retweets".format(username)
        mention_tweets_data = api.search_tweets(q=q, count=1, tweet_mode="extended")
        mention_tweets = []
        for tweet in mention_tweets_data:
            mention_tweets.append(tweet._json['full_text'])
        user_tweets_data = api.user_timeline(screen_name=username, count=1, tweet_mode="extended")
        user_tweets = []
        for tweet in user_tweets_data:
            user_tweets.append(tweet._json['full_text'])

        q = "@{0} and -filter:retweets".format(username)
        mention_tweets_data = api.search_tweets(q=q, count=1, tweet_mode="extended")
        mention_tweets = []
        for tweet in mention_tweets_data:
            mention_tweets.append(tweet._json['full_text'])

        res_obj = {
            "result": "success",
            "username": name,
            "description": description,
            "followers_count": followers,
            "created_at": created_at,
            "profile_image_url": profile_image_url,
            "user_tweets": user_tweets,
            "mention_tweets": mention_tweets
        }
    except tweepy.errors.Unauthorized:
        res_obj = {
            "result":"private_account",
            "username": None,
            "description": None,
            "followers_count": None,
            "created_at": None,
            "profile_image_url": None,
            "user_tweets": None,
            "mention_tweets": None
        }
    return res_obj