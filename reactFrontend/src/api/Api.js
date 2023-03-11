import axios from "axios";

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

const user_summarizer = async (user, setUser, setAlert) => {
  setAlert({
    error: "Fetching User data, please wait...",
    type: "info",
  });
  await axios
    .get(`http://localhost:5000/sentiments/${user.Username}/${user.tweets}`)
    .then((res) => {
      console.log(res.data)
      res.data["sentiments"] = JSON.parse(res.data["sentiments"]);
      console.log(res.data.payload)
      setUser((user) => {
        return { ...user, details: res.data };
      });
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
      setAlert({
        error: "You might have entered wrong username",
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });

  await axios
    .get(`http://localhost:5000/wordclouds/${user.Username}/${user.tweets}`)
    .then((res) => {
      let data = JSON.parse(JSON.stringify(res.data));
      setUser((user) => {
        return { ...user, clouds: data };
      });
      setAlert({});
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
      setAlert({
        error: "Wordcloud wasn't generated.",
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });
};

const thread_summarizer = async (thread, setThread, setAlert) => {
  console.log(thread.url);
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

export { trending, user_summarizer, thread_summarizer };
