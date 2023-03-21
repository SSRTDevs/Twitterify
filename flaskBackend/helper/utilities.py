import re
from datetime import datetime

def get_full_text(tweet):
    full_text = ''

    if 'text' in tweet._json:
        full_text = tweet._json['text']
    if 'full_text' in tweet._json:
        full_text = tweet._json["full_text"]
    if 'retweeted_status' in tweet._json:
        full_text = tweet._json['retweeted_status']['full_text']

    return full_text

def clean_text(text):
    text = re.sub(r'\bRT\b', 'Retweet by', text)
    return text

def current_time():
    return datetime.now().strftime("%d/%m/%Y %H:%M:%S")

def format_profile_image_url(profile_image_url):
    profile_image_url = profile_image_url.replace('_normal', '')
    return profile_image_url

def format_count(count):
    if not isinstance(count, int):
        count = int(count)

    if count >= 10**9:
        return f"{count/(10**9):.2f}B"
    elif count >= 10**6:
        return f"{count/(10**6):.2f}M"
    elif count >= 10**3:
        return f"{count/(10**3):.1f}K"
    else:
        return str(count)
    
def get_username(tweet):
    return tweet._json['user']['name']

def get_profile_image_url(tweet):
    return tweet._json['user']['profile_image_url_https']
