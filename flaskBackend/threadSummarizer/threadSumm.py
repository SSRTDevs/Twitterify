import re 
from helper.utilities import get_full_text, format_profile_image_url, get_username, get_profile_image_url
from helper.api import search_tweets, get_status
from setups.model_setup import tweet_summarizer,tweet_analyser
import urlexpander

def get_tweet_urls(tweet):
    res = []
    url_data = []

    if "entities" in tweet._json:
        if "urls" in tweet._json["entities"]:
            url_data = tweet._json["entities"]["urls"]

    for url in url_data:
        res.append({
            "display" : url["display_url"],
            "url" : url["expanded_url"]
        })
    return res

def get_tweet_media_urls(tweet):
    res = []
    media_data = []

    if "entities" in tweet._json:
        if "media" in tweet._json["entities"]:
            media_data = tweet._json["entities"]["media"]

    if "extended_entities" in tweet._json:
        if "media" in tweet._json["extended_entities"]:
            media_data = tweet._json["extended_entities"]["media"]

    for media in media_data:
        res.append({
            "display" : media["display_url"],
            "url" : media["media_url_https"]
        })
    return res


def thread_summarizer(url, count = 20):
    screen_name = url.split('/')[3]
    tweet_id = url.split('/')[-1]
    thread_root_tweet = get_status(tweet_id)
    
    username = get_username(thread_root_tweet)
    profile_image_url = format_profile_image_url(get_profile_image_url(thread_root_tweet))
    thread_tweets = [get_full_text(thread_root_tweet)]
    tweet_urls = [x for x in get_tweet_urls(thread_root_tweet)] 
    tweet_media_urls = [x for x in get_tweet_media_urls(thread_root_tweet)]

    q = "from:{0} to:{0} conversation_id:{1}".format(screen_name, tweet_id)
    for tweet in search_tweets(q, count, True):
        thread_tweets.append(get_full_text(tweet))
        tweet_urls.extend(x for x in get_tweet_urls(tweet))
        tweet_media_urls.extend(x for x in get_tweet_media_urls(tweet))
        
    for url in tweet_urls:
        title = urlexpander.html_utils.get_webpage_title(url["url"])
        if title:
            url["display"] = title

    reply_tweets = []
    q = "to:{0} conversation_id:{1}".format(screen_name, tweet_id)
    for tweet in search_tweets(q, count, False):
        full_text = get_full_text(tweet)
        if full_text not in thread_tweets:
            reply_tweets.append(full_text)

    thread_tweets.reverse()

    res_obj = {
        'thread_tweets': thread_tweets,
        'reply_tweets': reply_tweets,
        'username' : username,
        'profile_image_url': profile_image_url,
        'references' : {"urls": tweet_urls, "media_urls": tweet_media_urls}
    }
    
    return res_obj
