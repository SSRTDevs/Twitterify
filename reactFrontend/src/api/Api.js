import axios from "axios";

const trending = async (trends, setTrends) => {
  alert("Trending Api fired")
  await axios
    .get(`http://localhost:5000/trending_tweets`)
    .then((res) => {
      console.log("Trending Tweets", res.data);
      setTrends((trends) => {
        return { ...trends, latest_trends: res.data };
      });
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    });
};

const user_summarizer = async (user, setUser) => {
  await axios
    .get(`http://localhost:5000/sentiments/${user.Username}/${user.tweets}`)
    .then((res) => {
      res.data["sentiments"] = JSON.parse(res.data["sentiments"]);
      console.log(res)
      setUser((user) => {
        return { ...user, details: res.data };
      });
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    });

  await axios
    .get(`http://localhost:5000/wordclouds/${user.Username}/${user.tweets}`)
    .then((res) => {
      let data = JSON.parse(JSON.stringify(res.data));
      setUser((user) => {
        return { ...user, clouds: data };
      });
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
    });
};

const thread_summarizer = async (thread, setThread) => {
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
      console.log("Kuch toh gadbad hai beta", err);
    });
};

export {trending, user_summarizer, thread_summarizer} ;
