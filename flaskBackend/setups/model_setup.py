from transformers import AutoModelForSequenceClassification, pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os
import numpy as np
from scipy.special import expit
import torch
from collections import Counter
import numpy as np

summarization_model = AutoModelForSeq2SeqLM.from_pretrained(
    f'{os.getcwd()}/setups/model/summarization_model')
summarization_tokenizer = AutoTokenizer.from_pretrained(
    f'{os.getcwd()}/setups/tokenizer/summarization_tokenizer')

sentiment_model = AutoModelForSequenceClassification.from_pretrained(
    f'{os.getcwd()}/setups/model/sentiment_model')
sentiment_tokenizer = AutoTokenizer.from_pretrained(
    f'{os.getcwd()}/setups/tokenizer/sentiment_tokenizer')

topic_model = AutoModelForSequenceClassification.from_pretrained(f'{os.getcwd()}/setups/model/topic_model')
topic_tokenizer = AutoTokenizer.from_pretrained(f'{os.getcwd()}/setups/tokenizer/topic_tokenizer')

emotion_model = AutoModelForSequenceClassification.from_pretrained(f'{os.getcwd()}/setups/model/emotion_model')
emotion_tokenizer = AutoTokenizer.from_pretrained(f'{os.getcwd()}/setups/tokenizer/emotion_tokenizer')


summarizer = pipeline("summarization", model=summarization_model,
                      tokenizer=summarization_tokenizer)
sentiment = pipeline("sentiment-analysis", model=sentiment_model,
                     tokenizer=sentiment_tokenizer)


def tweet_summarizer(combined_tweets):
    #try:
    #    res = summarizer(combined_tweets)
    #    return res[0]["summary_text"]
    #except:
    #    print("Sequence length too large for model, cutting text in half and calling again")
    #    return tweet_summarizer(combined_tweets[:(len(combined_tweets) // 2)]) + tweet_summarizer(combined_tweets[(len(combined_tweets) // 2):])
    #raw_document = 'You must be 18 years old to live or work in New York State...'
    #prompt = "Produce an article summary of the following news article:"
    text = combined_tweets
    tokenized_text = summarizer.tokenizer(text, return_tensors='pt')
    input_ids = tokenized_text['input_ids']
    max_length = 128
    tokens = input_ids.size(1)//2
    if input_ids.size(1) > 512:
        stride = 512
        summaries = []
        for i in range(0, input_ids.size(1), stride):
            start = max(0, i - max_length)
            end = min(input_ids.size(1), i + stride)
            input_ids_chunk = input_ids[:, start:end]
            summary = summarizer.model.generate(input_ids_chunk, max_length=max_length, min_length=30, do_sample=False)[0]
            summary_text = summarizer.tokenizer.decode(summary, skip_special_tokens=True)
            summaries.append(summary_text)
        summary = ' '.join(summaries)
    else:
        summary = summarizer(text, max_length=tokens, min_length=5, do_sample=False)[0]['summary_text']
    return summary


def tweet_analyser(tweets):
    pos, neg, neu = 0, 0, 0
    for tweet in tweets:
        try:
            res = sentiment(tweet)[0]
            if res["label"] == "POS":
                pos += 1
            elif res["label"] == "NEG":
                neg += 1
            else:
                neu += 1
        except:
            pass
    return {"pos": pos, "neg": neg, "neu": neu}

def tweet_topic(combined_tweets):
    class_mapping = topic_model.config.id2label
    num_labels = topic_model.config.num_labels

    # Update class_mapping dictionary to include all possible keys
    for i in range(num_labels):
        if i not in class_mapping:
            class_mapping[i] = str(i)

    # Concatenate the list of strings
    text = " ".join(combined_tweets)

    # Split text into chunks of max length 1024
    max_length = 1024
    chunks = [text[i:i+max_length] for i in range(0, len(text), max_length)]

    # Tokenize each chunk separately and feed to the model
    outputs = []
    for chunk in chunks:
        tokens = topic_tokenizer(chunk, max_length=max_length, truncation = True ,return_tensors='pt')
        output = topic_model(**tokens)
        outputs.append(output)

    # Aggregate the outputs from all the chunks
    scores = None
    for output in outputs:
        if scores is None:
            scores = output[0][0].detach().numpy()
        else:
            scores = np.concatenate((scores, output[0][0].detach().numpy()), axis=0)

    scores = expit(scores)
    predictions = (scores >= 0.5) * 1

    output = []
    # Map to classes
    for i in range(len(predictions)):
        try:
            if predictions[i]:
                output.append(class_mapping[i])
        except KeyError:
            pass
    return output    


#Emotion detector
emotion_labels = ['anger', "disgust", "fear", "joy", "neutral", "sadness", "surprise"]

# Define function to predict emotions for input text
def predict_emotions(texts):
    inputs = emotion_tokenizer(texts, padding=True, truncation=True, return_tensors="pt")
    outputs = emotion_model(**inputs)
    predictions = torch.softmax(outputs.logits, dim=1).detach().cpu().numpy()
    predicted_labels = [emotion_labels[prediction.argmax()] for prediction in predictions]
    emotion_counts = {label: predicted_labels.count(label) for label in emotion_labels}
    most_common_emotions = sorted(emotion_counts.items(), key=lambda x: x[1], reverse=True)[:3]
    return predicted_labels, most_common_emotions

# Example usage
texts = [
    "I'm so happy today!",
    "I can't believe how angry I am right now.",
    "Things are really looking up. I'm feeling very optimistic.",
    "I'm not sure if this is going to work out. Feeling a bit pessimistic.",
    "I trust that everything will work out in the end.",
    "I have no strong feelings one way or the other. Feeling pretty neutral."
]
predicted_labels, most_common_emotions = predict_emotions(texts)
print(predicted_labels)
print(most_common_emotions)

