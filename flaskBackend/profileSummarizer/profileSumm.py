from setups.tweepy_cred import api
<<<<<<< HEAD
import calendar
from datetime import datetime
import tweepy

def get_user_id(username):
    user_obj = api.get_user(screen_name=username)
    user_id = user_obj._json['id']
    return user_id

def get_user_tweets_creation(username):
    user_id = get_user_id(username)
    user_tweets_creation = []
    user_tweets_data = api.user_timeline(user_id=user_id, screen_name=username, count=5, tweet_mode="extended")
    for tweet in user_tweets_data:
        user_tweets_creation.append(tweet._json['created_at'])

    return user_tweets_creation

def get_date_details(date_str):
    date = datetime.strptime(date_str, '%a %b %d %H:%M:%S %z %Y')
    year = date.year
    month = calendar.month_abbr[date.month]
    week = date.isocalendar()[1]
    key = (week, month, year)

    return month, week, key

def user_activity(username):
    user_tweets_creation = get_user_tweets_creation(username)
    tweet_creation_freq = {}
    month_weeks = {}
    for date_str in user_tweets_creation:
        month, week, key = get_date_details(date_str)

        if key not in tweet_creation_freq.items():
            tweet_creation_freq.setdefault(key, 0)
        tweet_creation_freq[key] += 1
    
        if month not in month_weeks:    
            month_weeks.setdefault(month , set())
        month_weeks[month].add(week)

    month_freq = {}
    for key, value in month_weeks.items():
        month_freq[key] = len(value)//2

    freq_payload = []

    for key, value in tweet_creation_freq.items():
        week = key[0]
        month = key[1]
        year = key[2]
        title = ""
        
        if month_freq[month] == 0:
            title = (month + ",'" + str(year%100))
        month_freq[month] -= 1

        res_obj = {
            'title': title,
            'week': week,
            'month': month,
            'year': year,
            'count': value
        }
        freq_payload.append(res_obj)
    freq_payload.reverse()
    return {"payload": freq_payload}

def format_followers_count(followers_count):
    if not isinstance(followers_count, int):
        followers_count = int(followers_count)

    if followers_count >= 10**9:
        return f"{followers_count/(10**9):.2f}B"
    elif followers_count >= 10**6:
        return f"{followers_count/(10**6):.2f}M"
    elif followers_count >= 10**3:
        return f"{followers_count/(10**3):.1f}K"
    else:
        return str(followers_count)

def profile_summarizer(username):
    try:
        user_tweets_data = api.user_timeline(screen_name=username, count=1, tweet_mode="extended")
        user_tweets = []
        for tweet in user_tweets_data:
            user_tweets.append(tweet._json['full_text'])

        user_obj = api.get_user(screen_name=username)
        name = user_obj._json['name']
        description = user_obj._json['description']
        followers = format_followers_count(user_obj._json['followers_count'])
=======
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
>>>>>>> b78c509 (Fixed for private accounts)
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
            "username": "private_account",
            "description": "private_account",
            "followers_count": "private_account",
            "created_at": "private_account",
            "profile_image_url": "private_account",
            "user_tweets": "private_account",
            "mention_tweets": "private_account"
        }
        
    return res_obj
