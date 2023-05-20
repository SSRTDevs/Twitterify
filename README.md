<div align="center">
  <h1 style="font-family: sans-serif;"> TWITTERIFY </h1>
  <img style="float: right;" src="./Assets/twitterify_logo.png" alt="Twitterify Logo" width="80" height="80">
</div>

### *A web platform to get quick, accurate and valuable statistical insights for real time twitter data. </h3>*

### Table of contents

- [Table of contents](#table-of-contents)
- [About](#about)
- [Why Twitterify?](#why-twitterify)
- [Demonstration](#demonstration)
  - [Trending Section](#trending-section)
  - [Thread Section](#thread-section)
  - [User Profile Section](#user-profile-section)
- [Project Architecture](#project-architecture)
- [Tech Stack](#tech-stack)
- [Implementation Details](#implementation-details)
- [Steps to Download and Integrate](#steps-to-download-and-integrate)
- [Performance and Analysis](#performance-and-analysis)
- [Project Contributors](#project-contributors)
- [Achievement](#achievement)


### About
- Twitterify is a web application which provides quick accurate and valuable statistical insights on real time twitter data.
- The application consists of three modules that focusses on analyzing trending data, threads and user profiles respectively.
- The application aquires real time twitter data from the twitter API's. The data is processed and then analyzed before the insights are shown to the users
- Check out the website landing page for more information: https://ssrtdevs.github.io/Twitterify-landing-page/

### Why Twitterify?
- Twitter is a popular platform where millions of tweets are posted daily to share opinions. To comprehend user opinions or trending hashtags, users have to spend a significant amount of time reading tweets.
- The application aims to provide insightful information based on the sentiments and emotions expressed in trending Twitter data, including threads and hashtags. It can be useful for gaining a better understanding of people's opinions on current events. 

### Demonstration

#### Trending Section

<img src="./Assets/Trending_Topics_Section.png"/>

- Summaries, category and sentiments of the top trends are shown
- Users can read a few tweets associated with a particular hashtag
- Search Anything feature enables users to know about any hashtag or trending topic in different geographic locations

#### Thread Section

![Thread Analysis Page](./Assets/Thread_Summarizer.png?raw=true "Thread Analysis Page")

- Displays the summary of a thread, sentiment, emtion expressed, thread lenght, replies to thread.
- Media carousel and links of the thread are provided in different sections

#### User Profile Section

<img src="./Assets/Profile_section_user_tweets.png" />

<br/>

<img src="./Assets/Profile_section_user_timeline.png" />

- Ther sentiments in the user tweets are noted and a statistical figure of the positive and negative tweets tweeted by the user is displayed
- User timeline is displayed
- Word cloud is generated to showcase the most frequently used words by the user

### Project Architecture

![Architecture Diagram](./Assets/Flowchart.png?raw=true "Architecture Diagram")


### Tech Stack
- React JS, Flask, Daisy UI, Hugging Face ML Models, Tweepy library

### Implementation Details
- The platform uses the BART model for Abstractive Text Summarization and BERT model for Sentiment Analysis from [Hugging Face]("https://huggingface.co/")
- The [Tweepy]("https://www.tweepy.org/") library was used to extract the required tweets using the Twitter API's.
- The application conisted of 2 servers catering to the frontend and backend of the application.
- The frontend server was made using React JS and made use of data processed by the Flask server at the backend.
- The flask server soley interacted with the Twitter API's to extract data and processed it based on the corresponding requests made by the React Server at the frontend.

### Performance and Analysis
<img src="./Assets/Twitterify-lighthouse.png"/>

<br/>

Twitterify has achieved a perfect score of 100 in the Best Practices category of the Lighthouse report, indicating that the project conforms to recommended web development standards.

### Achievement

- 🎉 Secured runner-up position at the Project Expo organized by our college


### Steps to Download and Integrate
- Prerequisite 
  - Nodejs >= 18
  - Python >= 3.0

1. Fork and Clone the repository on your local machine. 
2. The frontend and backend servers of the application run independently and need to be set up before starting them.
- <strong>Setting frontend</strong>

3. To run the react server, simply navigate to the reactfrontend directory and run ```npm install```. Once the installation completes you just need ```npm start```. This would start the react server on port 3000 on the localhost.
4. The application then can be viewed on the browser on localhost:3000 and can be used by the users.
- <strong>Setting Backend</strong>

5. Setting the Backend could be quite a hassle.
6. To set up the flask server, open the terminal in the flaskBackend directory and run ```pip install -r requirements.txt```. This would install all the necessary packages for the flask server.

- Setting the API keys
7. You need to make ```.env``` inside flaskbackend dir and put the API keys in there. Get your API keys [here](https://developer.twitter.com/en/portal/petition/essential/terms?plan=free). 

```
api_key=**********
api_key_secret=***************
access_token=**********
access_token_secret=********
consumer_key=********
consumer_secret=**********
bearer_token=********
```
- Setting up models: (This will be time consuming 😢)
8. Head over [here](https://github.com/SSRTDevs/Twitterify/blob/models/README.md) to know about model setup
9. To run the flask server, run ```flask --app server run``` subsequently on the terminal opened for the flask server. This would start the flask server on port 5000 on the localhost.

### Project Contributors
[Abhishek Sharma](https://github.com/Abhi-tech-09)

[Saket Thota](https://github.com/SaketThota)

[Shashwat Satao](https://github.com/kafka-654)

[Prithvi Rohira](https://github.com/prithvirohira8)

