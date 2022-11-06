import { React, useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import { TopContainer, LeftContainer, RightContainer, TagBanner } from './components';

function App() {
  const [Component, setComponent] = useState("general")
  const [displayBanner, setdisplayBanner] = useState(false)
  const [sentiments, setsentiments] = useState({})
  const [wordclouds, setwordclouds] = useState("")
  const [Username, setUsername] = useState("")
  const [tweets, settweets] = useState(0)
  const [url, seturl] = useState("")
  const [show_tweets, setShowtweets] = useState("")
  const [thread, setthread] = useState({})

  const user_summarizer = async () => {

    await axios.get(`http://localhost:5000/sentiments/${Username}/${tweets}`).then((res) => {
      console.log(res.data)
      res.data["sentiments"] = JSON.parse(res.data["sentiments"])
      setsentiments(res.data)
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    })
    await axios.get(`http://localhost:5000/wordclouds/${Username}/${tweets}`).then((res) => {
      let data = JSON.parse(JSON.stringify(res.data));
      setwordclouds(data)
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    })

  }

  const thread_summarizer = async () => {

    await axios.get(`http://localhost:5000/thread_summary/${url.replaceAll("/", "*")}}`).then((res) => {
      console.log(res.data)
      setthread(res.data)
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta", err);
    })
  }

  const display_tweets = async s => {
    console.log(s)
    let data = '[{"tweet": "What a fantastic innings by Virat!! #KingKohli"}, {"tweet": "This has to be the best chase I have seen in my life. Congratulations Virat and Team India. Enjoyed the match #KingKohli"}, {"tweet": "That shot against Haris Rauf has to be the shot of the tournament #KingKohli"}, {"tweet": "TThats why I love the game #KingKohli"}, {"tweet": "Who would have thought that India would win the game #KingKohli"}, {"tweet": "Greatest batsman of all time for a reason #KingKohli"},{"tweet": "Cometh the hour, Cometh the man, Hatsoff Virat, stellar performance #KingKohli"},{"tweet": "Mamba Mentality batting performance, Thank you for the entertainment #KingKohli"}]'
    let json_data = JSON.parse(data)
    setShowtweets(json_data);
  }

  return (
    <>
      <div className="god-container">
        <TopContainer
          Component={Component}
          setComponent={setComponent}
          setdisplayBanner={setdisplayBanner}
          user_summarizer={user_summarizer}
          thread_summarizer={thread_summarizer}
        />
        <LeftContainer
          Component={Component}
          wordclouds={wordclouds}
          tweets={tweets}
          setUsername={setUsername}
          settweets={settweets}
          display_tweets={display_tweets}
          show_tweets={show_tweets}
          sentiments={sentiments}
          seturl={seturl}
          thread={thread}
        />

        <RightContainer
          Component={Component}
          wordclouds={wordclouds}
          tweets={tweets}
          setUsername={setUsername}
          settweets={settweets}
          sentiments={sentiments}
          show_tweets={show_tweets}
          thread={thread}
        />
      </div>
      {displayBanner ?
        <TagBanner
          setdisplayBanner={setdisplayBanner} /> :
        ""
      }
    </>
  );
}

export default App;
