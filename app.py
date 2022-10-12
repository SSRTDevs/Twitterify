import tweepy
import configparser
from geopy.geocoders import Nominatim
from transformers import AutoModelForSequenceClassification, pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM



summ_tokenizer = AutoTokenizer.from_pretrained("/Users/shashwat/python_projects/twitter_2/tokenzier/")
summ_model = AutoModelForSeq2SeqLM.from_pretrained("/Users/shashwat/python_projects/twitter_2/model/")


sen_tokenizer = AutoTokenizer.from_pretrained("/Users/shashwat/python_projects/twitter_2/tokenizer_sen/")

sen_model = AutoModelForSequenceClassification.from_pretrained("/Users/shashwat/python_projects/twitter_2/model_sen/")

config = configparser.ConfigParser()
config.read('config.ini')

#Loading models
summarizer = pipeline("summarization", model = summ_model, tokenizer = summ_tokenizer)
sentiment = pipeline("sentiment-analysis", model = sen_model, tokenizer = sen_tokenizer)


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

def tweet_summarizer(tweets, summarizer):
    tweets_joined = " ".join(tweets)
    res = summarizer(tweets_joined)
    return res[0]["summary_text"]

def tweet_analyser(tweets,sentiment):
    res = sentiment(tweets)
    pos, neg, neu = 0,0,0
    for item in res:
        if item["label"] == "POS":
            pos += 1
        elif item["label"] == "NEG":
            neg += 1
        else:
            neu += 1
    return {"pos":pos, "neg": neg, "neu":neu}


def get_trending_topics_volume(trends):
    trending_topics_volume = []
    for trend in trends['trends']:
        if trend['tweet_volume'] != None:
            trending_topics_volume.append(
                (trend['tweet_volume'], trend['name']))

    trending_topics_volume = sorted(trending_topics_volume, reverse=True)
    return trending_topics_volume

def trending_tweets(api, client, location, tweet_count, topic_count, summarizer):
    geolocator = Nominatim(user_agent="GetLoc")
    getLoc = geolocator.geocode(location)

    latitude = getLoc.latitude
    longitude = getLoc.longitude

    result = {}
    summary_result = {}
    analysis_result = {}
    for locations in api.closest_trends(latitude, longitude):
        for trends in api.get_place_trends(locations['woeid']):
            trending_topics_volume = get_trending_topics_volume(trends)[:topic_count]

            for trend in trending_topics_volume:
                q = trend[1]
                #print("Topic : " + q)
                result[q] = []
                summary_result[q] = None
                analysis_result[q] = None
                for tweet in api.search_tweets(q=q,count=tweet_count):
                    #print(tweet._json['text'])
                    result[q].append(tweet._json['text'])
                summary_result[q] = tweet_summarizer(result[q], summarizer)
                analysis_result[q] = tweet_analyser(result[q], sentiment)


    
    #print(result)
    
    return summary_result, analysis_result

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
        
    



sum_res, ana_res = trending_tweets(api, client, "Mumbai", 10, 1, summarizer)
#user_summary(client, api, "_SaketThota", 5)
# tweets = ["I am a boy", "Boy is playing cricket","'#SantRampalJiMaharaj_App\n\nDownload from Playstore  कौन है दुनियां का मुक्ति दाता   जानने के लिए app sant Rampal Ji… https://t.co/IYTiIxo2Gq", "RT @013Priya: #SantRampalJiMaharaj_App\nKnow from the holy book " ,"Gita Tera Gyan Amrit the opinion of the sage interested in Shraddha-Pinda"]
# res = tweet_summarizer(tweets, summarizer)
print(sum_res)
print(ana_res)
