import { React, useState } from 'react';
import axios from 'axios';
import './App.css'
import { TopContainer, LeftContainer, RightContainer, TagBanner } from './components';

function App() {
  const [Component, setComponent] = useState("general")
  const [displayBanner, setdisplayBanner] = useState(false)
  const [sentiments, setsentiments] = useState("")
  const [wordcloud1, setwordcloud1] = useState("")
  const [wordcloud2, setwordcloud2] = useState("")
  const [Username, setUsername] = useState("")
  const [tweets, settweets] = useState(0)


  const user_summarizer = async () => {

    await axios.get(`http://localhost:5000/sentiments/${Username}/${tweets}`).then((res) => {
      setsentiments(res.data)
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    })
    await axios.get(`http://localhost:5000/wordcloud1/${Username}/${tweets}`).then((res) => {
      setwordcloud1(res.data)
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    })
    await axios.get(`http://localhost:5000/wordcloud2/${Username}/${tweets}`).then((res) => {
      setwordcloud2(res.data)
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
          wordcloud1={wordcloud1}
          wordcloud2={wordcloud2}
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
