from flask import Flask, render_template, send_file, make_response, jsonify
from processing import get_user_tweets, get_sentiments, get_word_cloud1, get_word_cloud2
app = Flask(__name__)
app.run(debug=True)


@app.route("/sentiments/<Username>/<tweets>", methods=['GET'])
def sentiments(Username, tweets):
    get_user_tweets(Username, tweets)
    sentiments = get_sentiments()
    response = make_response(sentiments.to_json())
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route("/wordcloud1/<Username>/<tweets>", methods=['GET'])
def wordcloud1(Username, tweets):
    get_user_tweets(Username, tweets)
    wordcloud = get_word_cloud1()
    response = make_response(wordcloud)
    response.headers['Access-Control-Allow-Origin'] = '*'
    # return send_file(wordcloud, attachment_filename='plot.png', mimetype='image/png')
    return response


@app.route("/wordcloud2/<Username>/<tweets>", methods=['GET'])
def wordcloud2(Username, tweets):
    get_user_tweets(Username, tweets)
    wordcloud = get_word_cloud2()
    response = make_response(wordcloud)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
