import re
from datetime import datetime

def get_full_text(tweet):
    full_text = tweet._json["full_text"]
    if 'retweeted_status' in tweet._json:
        full_text = tweet._json['retweeted_status']['full_text']

    return full_text

def clean_text(text):
    text = re.sub(r'\bRT\b', 'Retweet by', text)
    return text

def current_time():
    return datetime.now().strftime("%d/%m/%Y %H:%M:%S")

def get_profile_image_url(profile_image_url):
    profile_image_url = profile_image_url.replace('_normal', '')
    return profile_image_url