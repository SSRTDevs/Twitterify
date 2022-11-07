from flask import Flask, render_template, send_file, make_response, jsonify
from profileSummarizer.processing import get_user_tweets, get_sentiments, get_word_cloud1, get_word_cloud2
from profileSummarizer.profileSumm import profile_summarizer
# from generalPage.generalTrends import get_trending_tweets, feed_model
from threadSummarizer.threadSumm import thread_summarizer, thread_feed_model

from flask_cors import CORS
app = Flask(__name__)
app.run(debug=True)
CORS(app)


@app.route("/sentiments/<Username>/<tweets>", methods=['GET'])
def sentiments(Username, tweets):
    get_user_tweets(Username, tweets)
    sentiments, pos_count, neg_count, neutral_count = get_sentiments()
    user_details = profile_summarizer(Username)
    return_obj = {
        "sentiments": sentiments,
        "pos_count": pos_count,
        "neg_count": neg_count,
        "neutral_count": neutral_count
    }
    return_obj.update(user_details)
    response = make_response(return_obj)
    return response


@app.route("/wordclouds/<Username>/<tweets>", methods=['GET'])
def wordclouds(Username, tweets):
    get_user_tweets(Username, tweets)
    wordcloud1 = get_word_cloud1()
    wordcloud2 = get_word_cloud2()
    cloud = {
        "cloud_nouns": wordcloud1,
        "cloud_names": wordcloud2
    }
    # return send_file(wordcloud, attachment_filename='plot.png', mimetype='image/png')
    response = make_response(cloud)
    return response


@app.route("/thread_summary/<url>", methods=['GET'])
def thread_summary(url):
    url = url.replace("*","/")
    url = url[:-1]
    
    thread_obj = thread_summarizer(url)
    thread_obj['thread_summary'], thread_obj['thread_sentiment'] = thread_feed_model(
        thread_obj['thread_tweets'])

    print(thread_obj)
    response = make_response(thread_obj)
    return response

@app.route("/trending_tweets/", methods=['GET'])
def sentiment():
    trending_tweets = get_trending_tweets("Mumbai")
    trending_tweets_summarization, trending_tweets_sentiment = feed_model(
        trending_tweets)
    res = []
    for topic in trending_tweets:
        pos = trending_tweets_sentiment["pos"]
        neg = trending_tweets_sentiment["neg"]
        neu = trending_tweets_sentiment["neu"]
        res.append(
            {"hashtag": topic, "summary": trending_tweets_summarization[topic], "pos": pos, "neg": neg, "neu": neu})

    print(res)
    return make_response(res)
