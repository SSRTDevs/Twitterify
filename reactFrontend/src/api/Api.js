import axios from "axios";
import { mock_tweets } from "../components/Mock_data";

const trending = async (trends, setTrends, setAlert) => {
  setAlert({
    error: "Fetching trending tweets...",
    type: "info",
  });
  await axios
    .get(`http://127.0.0.1:5000/trending_tweets`)
    .then((res) => {
      console.log("Trending Tweets", res.data);
      setTrends((trends) => {
        return { ...trends, latest_trends: res.data };
      });
      setAlert({});
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
      setAlert({
        error: "Error with Api-call",
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
    });
};

const search_hash = async (tag, setTrends, setAlert) => {
  setAlert({
    error: `Fetching tweets for ${tag}...`,
    type: "info",
  });
  await axios
    .get(`http://127.0.0.1:5000/hashtag/${tag}`)
    .then((res) => {
      setTrends((trends) => {
        return { ...trends, show_tweets: [], hash_tweets: res.data };
      });
      setAlert({});
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
      setAlert({
        error: "Could not fetch tweets. This hashtag might not be trending...",
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
    });
};

const user_summarizer = async (user, setUser, setAlert) => {
  setAlert({
    error: "Fetching User data, please wait...",
    type: "info",
  });

  const get_user_details = await axios
    .get(`http://localhost:5000/sentiments/${user.Username}/${user.tweets}`)
    .then((res) => {
      res.data["sentiments"] = JSON.parse(res.data["sentiments"]);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      setAlert({
        error: "You might have entered wrong username",
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });

  const get_user_cloud = await axios
    .get(`http://localhost:5000/wordclouds/${user.Username}/${user.tweets}`)
    .then((res) => {
      return JSON.parse(JSON.stringify(res.data));
    })
    .catch((err) => {
      console.log(err);
      setAlert({
        error: "Wordcloud wasn't generated.",
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });
    
    let [user_details, user_cloud] = await Promise.all([
      get_user_details,
      get_user_cloud,
    ])

    setAlert({
      error: "Fetching User topics...",
      type: "info",
    })
    
    let tweets = Object.keys(user_details.sentiments["Tweet"]).map((idx)=>  user_details.sentiments["Tweet"][idx]) ; 
    let data = { tweets: tweets };
    const user_topics = await axios.post("http://localhost:5000/topic", JSON.stringify(data)).then((res) => {
      return res.data ; 
    }).catch((err) => {
      console.log(err);
      setAlert({
        error: "Seems like an error in API call", 
        type: "error"
      })
    });

    setAlert({})

    console.log(user_topics)
    setUser((user)=> {
      return {...user, details: user_details, clouds: user_cloud, topics: user_topics}
    })
};

const thread_summarizer = async (thread, setThread, setAlert) => {
  await axios
    .get(
      `http://localhost:5000/thread_summary/${thread.url.replaceAll("/", "*")}}`
    )
    .then((res) => {
      console.log(res.data);
      setThread((thread) => {
        return { ...thread, details: res.data };
      });
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
      setAlert({
        error: "Bruh !! Somethings wrong with your api. Fix it quick",
        type: "type-error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });
};


export {
  trending,
  search_hash,
  user_summarizer,
  thread_summarizer,
};
