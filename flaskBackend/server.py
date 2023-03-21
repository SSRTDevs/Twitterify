from flask import Flask, make_response, request
from profileSummarizer.processing import get_sentiments, get_word_clouds
# from profileSummarizer.profileSumm import profile_summarizer, user_activity
from profileSummarizer.profileSumm import profile_summary, get_user_friends
from generalPage.generalTrends import get_trending_tweets, get_hashtag_tweets
from threadSummarizer.threadSumm import thread_summarizer
from setups.model_setup import summarize
from flask_cors import CORS
from threading import Timer
from mock_text import mock_text, summarizer, mock_hash
from setups.model_setup import tweet_summarizer, tweet_analyser, tweet_topic

app = Flask(__name__)
app.run(debug=True)
CORS(app)


@app.route("/", methods=['GET'])
def init(): 
    return make_response("Hey there, Welcome to Twitterify's API.")

@app.route("/trending_tweets/<country>", methods=['GET'])
def process_trending_tweets(country):
    trending_payload = get_trending_tweets(country)
    trending_tweets_data = []
    
    for object in trending_payload:
        trending_tweets_summarization = tweet_summarizer(' '.join(object["topic_tweets"]))
        trending_tweets_sentiment = tweet_analyser(object["topic_tweets"])
        trending_tweets_topics = tweet_topic(object["topic_tweets"])
        
        res_obj = {
            "topic_tweets" : object["topic_tweets"],
            "topic_name" : object["topic_name"],
            "topic_tweet_count" : object["topic_tweet_count"],
            "time_stamp" : object["time_stamp"],
            "topic": trending_tweets_topics,
            "summary": trending_tweets_summarization, 
            "pos": trending_tweets_sentiment["pos"], 
            "neg": trending_tweets_sentiment["neg"], 
            "neu": trending_tweets_sentiment["neu"],
        }
        trending_tweets_data.append(res_obj)

    response = make_response(trending_tweets_data)
    return response

@app.route("/hashtag/<hashtag>", methods=['GET'])
def hashtag_analysis(hashtag):
    hashtag_tweets_payload = get_hashtag_tweets(hashtag)
    
    hashtag_tweets_summarization = tweet_summarizer(' '.join(hashtag_tweets_payload["hashtag_tweets"]))
    hashtag_tweets_sentiment = tweet_analyser(hashtag_tweets_payload["hashtag_tweets"])
    hashtag_tweet_topics = tweet_topic(hashtag_tweets_payload["hashtag_tweets"])

    res_obj = {
            "topic_tweets" : hashtag_tweets_payload["hashtag_tweets"],
            "topic_name" : hashtag_tweets_payload["hashtag"],
            "topic_tweet_count" : hashtag_tweets_payload["hashtag_tweet_count"],
            "time_stamp" : hashtag_tweets_payload["time_stamp"],
            "topic": hashtag_tweet_topics,
            "summary": hashtag_tweets_summarization, 
            "pos": hashtag_tweets_sentiment["pos"], 
            "neg": hashtag_tweets_sentiment["neg"], 
            "neu": hashtag_tweets_sentiment["neu"],
        }
    return res_obj

@app.route("/topic", methods=['POST'])
def topic(): 
    data = request.get_json(force=True)["tweets"]
    print(data)
    return make_response(tweet_topic(data))

@app.route("/sentiments/<Username>/<tweets>", methods=['GET'])
def sentiments(Username, tweets):
    # sentiments, pos_count, neg_count, neutral_count = get_sentiments(Username,tweets)
    # user_sentiments, user_details, user_activity_details = profile_summary(Username)

    
    # return_obj.update(user_details)
    # return_obj.update(user_activity_details)

    res_obj = profile_summary(Username)
    response = make_response(res_obj)
    return response

@app.route("/wordclouds/<Username>/<tweets>", methods=['GET'])
def wordclouds(Username, tweets):
    wordcloud1, wordcloud2 = get_word_clouds(Username,tweets)
    cloud = {
        "cloud_nouns": wordcloud1,
        "cloud_names": wordcloud2
    }
    # return send_file(wordcloud, attachment_filename='plot.png', mimetype='image/png')
    response = make_response(cloud)
    return response

@app.route("/friends/<Username>", methods=['GET'])
def get_friends(Username): 
    return make_response(get_user_friends(Username))

@app.route("/thread_summary/<url>", methods=['GET'])
def thread_summary(url):
    url = url.replace("*","/")
    url = url[:-1]
    
    thread_obj = thread_summarizer(url)
    thread_obj['thread_summary'] = tweet_summarizer(' '.join(thread_obj['thread_tweets']))
    thread_obj['thread_sentiment'] = tweet_analyser(thread_obj['thread_tweets'])
    thread_obj['topic'] = tweet_topic(thread_obj['thread_tweets'])
    # thread_obj['thread_summary'], thread_obj['thread_sentiment'] = thread_feed_model(
    #     thread_obj['thread_tweets'])

    # print(thread_obj)
    response = make_response(thread_obj)
    return response

@app.route("/summary",methods=['GET'])
def get_summary():
    print(summarizer())
    return make_response(summarize(mock_text))
    # return make_response(summarizer())