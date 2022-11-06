from flask import Flask, render_template, send_file, make_response, jsonify
from profileSummarizer.processing import get_user_tweets, get_sentiments, get_word_cloud1, get_word_cloud2
from flask_cors import CORS
app = Flask(__name__)
app.run(debug=True)
CORS(app)


@app.route("/sentiments/<Username>/<tweets>", methods=['GET'])
def sentiments(Username, tweets):
    get_user_tweets(Username, tweets)
    sentiments,pos_count,neg_count,neutral_count =  get_sentiments()
    sentiment_obj = {
        "sentiments" : sentiments , 
        "pos_count" : pos_count , 
        "neg_count" : neg_count , 
        "neutral_count" : neutral_count
    }
    response = make_response(sentiment_obj)
    return response



@app.route("/wordclouds/<Username>/<tweets>", methods=['GET'])
def wordclouds(Username, tweets):
    get_user_tweets(Username, tweets)
    wordcloud1 = get_word_cloud1()
    wordcloud2 = get_word_cloud2()
    cloud = {
        "cloud_nouns" : wordcloud1,
        "cloud_names" : wordcloud2
    }
    # return send_file(wordcloud, attachment_filename='plot.png', mimetype='image/png')
    response = make_response(cloud)
    return response
