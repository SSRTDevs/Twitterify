import { React, useState } from 'react';
import axios from 'axios';
import './App.css'
import { TopContainer, LeftContainer, RightContainer, TagBanner } from './components';

function App() {
  const [Component, setComponent] = useState("general")
  const [displayBanner, setdisplayBanner] = useState(false)
  const [sentiments, setsentiments] = useState("")
  const [wordclouds, setwordclouds] = useState("")
  const [Username, setUsername] = useState("")
  const [tweets, settweets] = useState(0)


  const user_summarizer = async () => {

    await axios.get(`http://localhost:5000/sentiments/${Username}/${tweets}`).then((res) => {
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


  return (
    <>
      <div className="god-container">
        <TopContainer
          Component={Component}
          setComponent={setComponent}
          setdisplayBanner={setdisplayBanner}
          user_summarizer={user_summarizer} />

        <LeftContainer
          Component={Component}
          wordclouds={wordclouds}
          tweets={tweets}
          setUsername={setUsername}
          settweets={settweets} />

        <RightContainer
          Component={Component}
          sentiments={sentiments} />
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
