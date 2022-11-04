from flask import Flask, render_template, send_file, make_response, jsonify
from processing import get_user_tweets, get_sentiments, get_word_cloud1, get_word_cloud2
from flask_cors import CORS
app = Flask(__name__)
app.run(debug=True)
CORS(app)


@app.route("/sentiments/<Username>/<tweets>", methods=['GET'])
def sentiments(Username, tweets):
    get_user_tweets(Username, tweets)
    sentiments = get_sentiments()
    response = make_response(sentiments.to_json())
    return response


@app.route("/wordclouds/<Username>/<tweets>", methods=['GET'])
def wordclouds(Username, tweets):
    get_user_tweets(Username, tweets)
    wordcloud1 = get_word_cloud1()
    wordcloud2 = get_word_cloud2()
    cloud = {"cloud_nouns" : wordcloud1 , "cloud_names" : wordcloud2}
    # return send_file(wordcloud, attachment_filename='plot.png', mimetype='image/png')
    # return send_file("wordcloud.png", mimetype='application/text')
    # return response
    response = make_response(cloud)
    return response
