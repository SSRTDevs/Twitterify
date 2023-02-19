from setups.tweepy_cred import api
import calendar
from datetime import datetime

def user_activity(username):
    user_obj = api.get_user(screen_name=username)
    user_id = user_obj._json['id']
    user_tweets_data = api.user_timeline(user_id=user_id, screen_name=username, count=20, tweet_mode="extended")

    user_tweets_creation = []
    for tweet in user_tweets_data:
        user_tweets_creation.append(tweet._json['created_at'])

    tweet_creation_freq = {}
    month_weeks = {}
    for date_str in user_tweets_creation:
        date = datetime.strptime(date_str, '%a %b %d %H:%M:%S %z %Y')
        year = date.year
        month = calendar.month_abbr[date.month]
        week = date.isocalendar()[1]
        key = (week, month, year)

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

        flag = False
        if month_freq[month] == 0:
            flag = True
        month_freq[month] -= 1

        title = (key[1] + ",'" + str(key[2]%100)) if flag else ""

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
        }
    return res_obj
