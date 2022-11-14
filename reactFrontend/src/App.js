import { React, useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import { TopContainer, LeftContainer, RightContainer, TagBanner } from './components';

export const PAGES = {
  TRENDING: 'trending',
  THREAD: 'thread',
  PROFILE: 'profile'
}

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

let mock_thread = {
  'thread_tweets': ['1. @lexdotpage\n\nUnlock your best writing with Lex.\nAny time you don’t know how to continue your text, type +++ and Lex continues for you.\n\nIt also helps generate titles for your texts! https://t.co/NFfsKeD3ut', '2. @runwayml\n\nRunway is the content creation suite from the future. It has magical AI tools like:\n- change images with text descriptions\n- remove objects in videos\n- remove video backgrounds\n- expand images with descriptions (as seen in the video)\n+++ https://t.co/tryhlnGgPg', '3. @diffusionbee\n\nDiffusionBee is a free macOS app for Stable Diffusion. Give it a text prompt, and it generates a picture based on your text. https://t.co/J49XXoHIRW', '4. @LexicaArt\n\nProviding prompts for text-to-image solutions is an art.\n\nLexicaArt is a Stable Diffusion search engine that shows prompts others have used to generate images.\n\nYou can also see variations of a prompt. https://t.co/MLujBB7SnC', '5. @metaphorsystems\n\nMetaphor is a new search engine based on generative AI.\n\nYou prompt it by writing a phrase that looks like it could end with a link. https://t.co/14uoTGyJBP', '6. @SoundrawUS\n\nDo you need some unique music for your podcast or video? Soundraw is a music generator for creators.\n\nSelect the type of music you want - genre, instruments, mood, length, etc - and let their AI generate beautiful songs and variants for you. https://t.co/PVZ6FZKF2E', '7. @clipdropapp\n\nRelight your existing photos &amp; drawings with ClipDrop Relight.\n\nRelighting a picture after it is captured is possible thanks to their custom AI that maps depth into your pictures. https://t.co/mv6cAV0Xb2', '8. Talk to books\n\nGet quotes from more than 100 000 books that respond to your question.\n\nA creativity tool by Google to explore new ideas and get relevant quotes.\n\nhttps://t.co/miy0A4IyWI https://t.co/6Dta8unQyg', "I hope you've found this thread helpful.\n\nFollow me @mhauken for more. I tweet weekly about productivity and design.\n\nLike/Retweet the first tweet below if you can: https://t.co/zg9utP5lt0", "If you liked this, you'd enjoy my infrequent newsletter, delivering simple, actionable productivity tips in your inbox!\n\nJoin here:\nhttps://t.co/GAqzTMncMM"], 'reply_tweets': ['@tdbryant2 @roboflow 😊 that might be!', "@flare3103 @LexicaArt I'm sure that is going to be a job eventually! 😆", '@JonnyPink Not to my knowledge.\n\nBut it is a new field where lawyers try to find where the lines go. An example is the GitHub AI tool copilot: https://t.co/4q90s827Cd', '@CK71984165 Happy to hear!', '@ktguru @nleonid @unbuttonmyeyes @laphamsquart It is also an interesting thought exercise how this is going to evolve when eventually the input to these AIs will have been generates by AIs. \n\nI am pretty sure there never has been created more van Gogh illustrations than it currently is. 😅', '@johnbuilds Cool! Will try out!', '@bresslertweets @excelformulabot Looks like a cool product!', '@jena_ratikanta @nleonid 😄 Happy to hear!', '@KamarThomas12 @LexicaArt It is an interesting problem.\n\nAn example is this lawsuit chal\xadleng\xading GitHub Copi\xadlot, an AI prod\xaduct that relies on open-source soft\xadware piracy. I imagine the same can come for the art created.\n\nhttps://t.co/4q90s827Cd', '@nleonid Thanks for sharing!\nI haven’t seen this before!', '@ElephasApp You were on the long list, but I had to cut it down. 😅\n\nA great addition!', '@SheilaSully55 😆', '@IAmClintMurphy Glad you enjoyed it! Amazing how fast it went from no AI to AI everywhere!', '@TheTrevorRich Thanks!\n\nI’ve recently started reaching out to people and complimenting them after I’ve noticed how much I enjoy it when other people do the same for me!', '@Heartheclick12 Happy to hear! 😄', '@TheTrevorRich Thanks! This made my day! 😄\n\nI always try to make it actionable and actually useful!', '@WPDeveloperPro Thanks! Glad to hear!'], 'username': 'Marius Hauken', 'profile_image_url': 'https://pbs.twimg.com/profile_images/1534219666352111616/IgR93M63_normal.jpg', 'references': ['https://t.co/GAqzTMncMM', 'https://t.co/zg9utP5lt0', 'https://t.co/miy0A4IyWI', 'https://t.co/6Dta8unQyg', 'https://t.co/mv6cAV0Xb2', 'https://t.co/PVZ6FZKF2E', 'https://t.co/14uoTGyJBP', 'https://t.co/MLujBB7SnC', 'https://t.co/J49XXoHIRW', 'https://t.co/tryhlnGgPg', 'https://t.co/NFfsKeD3ut'], 'thread_summary': 'Mhauken shares some of his favorite tools and apps. Use them to help you improve your productivity and design. Follow me on Twitter @mhaukensurveillance and follow me on Facebook and Google+ for more tips and tricks. Like/Retweet the first tweet below if you can.', 'thread_sentiment': { 'pos': 8, 'neg': 0, 'neu': 2 }
}

function App() {
  const [Component, setComponent] = useState(PAGES.TRENDING)
  const [user, setUser] = useState({
    "Username": '',
    "tweets": 0,
    "details": {},
    "clouds": ""
  })
  const [thread, setThread] = useState({
    url: '',
    details: mock_thread
  })
  const [trends, setTrends] = useState({
    'latest_trends': mock_trends,
    'show_tweets': []
  })
  const [displayBanner, setdisplayBanner] = useState(false)


  const trending = async () => {
    await axios.get(`http://localhost:5000/trending_tweets`).then((res) => {
      console.log("Trending Tweets", res.data)
      setTrends((trends) => {
        return { ...trends, 'latest_trends': res.data }
      })
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    })
  }

  const user_summarizer = async () => {

    await axios.get(`http://localhost:5000/sentiments/${user.Username}/${user.tweets}`).then((res) => {

      res.data["sentiments"] = JSON.parse(res.data["sentiments"])
      setUser(user => {
        return { ...user, "details": res.data }
      })
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    })

    await axios.get(`http://localhost:5000/wordclouds/${user.Username}/${user.tweets}`).then((res) => {
      let data = JSON.parse(JSON.stringify(res.data));
      setUser(user => {
        return { ...user, "clouds": data }
      })
    }).catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    })

  }

  const thread_summarizer = async () => {
    console.log(thread.url)
    await axios.get(`http://localhost:5000/thread_summary/${thread.url.replaceAll("/", "*")}}`).then((res) => {
      console.log(res.data)
      setThread(thread => {
        return { ...thread, 'details': res.data }
      })
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
          user={user}
          setUser={setUser}
          thread={thread}
          setThread={setThread}
          trends={trends}
          setTrends={setTrends}
          trending={trending}
        />

        <RightContainer
          Component={Component}
          user={user}
          thread={thread}
          trends={trends}
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
