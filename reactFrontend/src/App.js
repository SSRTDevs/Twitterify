import { React, useState, useReducer } from 'react';
import axios from 'axios';
import './App.css'
import { TopContainer, LeftContainer, RightContainer, TagBanner } from './components';

let mock_trends = {
  "#INDvsENG": {
    "neg": 2,
    "neu": 1,
    "pos": 0,
    "summary": "We sh… @IrfanPathan is this what u call a \"GRACE\",  It is such a shameless act that you are showing ur opponent that you gave up the game when u ask the crowd to support you? Jos Buttle saw how Pandya was monkey dancing. #INDvsENG #CricketTwitter #T20WorldCup #BoycottIPL.",
    "tweets": ["What a fantastic innings by Virat!! #KingKohli", "This has to be the best chase I have seen in my life. Congratulations Virat and Team India. Enjoyed the match #KingKohli", "That shot against Haris Rauf has to be the shot of the tournament #KingKohli", "Thadomal wants 75% attendance"]
  },
  "England": {
    "neg": 1,
    "neu": 0,
    "pos": 1,
    "summary": "Tomori not going to the World Cup is everything that's wrong with the FA and England. Tomori won Serie A, been fantastic, bu… RT @AFCWimbledon:  “We’d like to extend our congratulations to our former loanee, @AaronRamsdale98, after he was…",
    "tweets": ["Who would have thought that India would win the game #KingKohli", "Greatest batsman of all time for a reason #KingKohli", "Cometh the hour, Cometh the man, Hatsoff Virat, stellar performance #KingKohli", "Mamba Mentality batting performance, Thank you for the entertainment #KingKohli"]
  },
  'Pokemon': {
    'summary': 'The quality is a bit iffy since the episode just came out but heres a glimpse of the fight. RT @GameFreakUS: yeah you can fuck the pokémon in the new one RT @uzumakixoxo: @Pokemon. @Pokemon',
    'pos': 0,
    'neg': 2,
    'neu': 1,
    "tweets": ["Puryfying Salt gets rid of your Ghost weakness AND makes you immune to status.", "He's a Pokémon with 100/135/90 Defenses and Body Press with only ONE WEAKNESS.", "After 25 years, perpetual 10-year-old Ash Ketchum has finally become the world's greatest Pokémon trainer."]
  },
  'Kherson': {
    'summary': 'Both flags are symbols that #UkraineWillWin. #StandWithUkraine. RT @MaxBoot: Wonderful to see the liberation of Kherson. The Russian retreat is a humiliating defeat for Putin. The Ukrainian Prosecutor General se… RT @michaelh992: Evidence of war crimes are already emerging in recently liberated areas of #KHerson.',
    'pos': 2,
    'neg': 1,
    'neu': 0,
    "tweets": ["Kherson liberation chronicles, from Ukrainian social media: When soldiers enter to clear a village that was occupied by Russia", "RT @WarMonitor3: Ukrainian army just reached the centre of Kherson city.", "RT @NOELreports: Remember the giant flag that was present the first days of the occupation in #K Herson? It is back."]
  }
}


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
  const [trends, setTrends] = useState(mock_trends)


  const trending = async () => {
    alert("Trending Api fired")
    await axios.get(`http://localhost:5000/trending_tweets`).then((res) => {
      console.log(res.data)
      trends = res.data;
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    })
  }

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
          show_tweets={show_tweets}
          setShowtweets={setShowtweets}
          sentiments={sentiments}
          seturl={seturl}
          thread={thread}
          trends={trends}
          trending={trending}
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
