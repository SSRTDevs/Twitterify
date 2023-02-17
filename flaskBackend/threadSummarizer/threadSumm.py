import re 
from setups.tweepy_cred import api
from setups.model_setup import tweet_summarizer,tweet_analyser
import urlexpander


def thread_feed_model(thread_tweets):
    thread_summary = tweet_summarizer(' '.join(thread_tweets))
    thread_sentiment = tweet_analyser(thread_tweets)
    return thread_summary,thread_sentiment

def thread_summarizer(url, count = 20):
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
    
    expanded_urls = urlexpander.expand(references)
    images, sites = [],[]

    for url in expanded_urls:
        if re.search(r"(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|bmp)", url):
            images.append(url)
        else:
            title = urlexpander.html_utils.get_webpage_title(url) 
            if title:
                sites.append(title)
            else:
                sites.append(url)



    q = "from:{0} conversation_id:{1}".format(screen_name, tweet_id)
    for tweet in api.search_tweets(q=q, count=count, tweet_mode='extended'):
        if tweet._json['full_text'] not in thread_tweets:
            reply_tweets.append(tweet._json['full_text'])

    thread_tweets.reverse()

    res_obj = {
        'thread_tweets': thread_tweets,
        'reply_tweets': reply_tweets,
        'username' : username,
        'profile_image_url': profile_image_url,
        'references' : {"urls": sites, "images": images}
    }
    print(res_obj)
    return res_obj

