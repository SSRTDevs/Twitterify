import axios from "axios";
import { mock_tweets } from "../components/Mock_data";

const empty = () => {};

const trending = async (trends, setTrends, setAlert, country = "India") => {
  setAlert({
    error: `Fetching trending tweets${
      country !== "India" ? " from " + country : ""
    }...`,
    type: "info",
  });
  let latest_trends_copy = [];
  await axios
    .get(`http://127.0.0.1:5000/trending_tweets/${country}`)
    .then((res) => {
      latest_trends_copy = res.data;
      setTrends((trends) => {
        return { ...trends, latest_trends: res.data };
      });
      setAlert({});
      // console.log("On line 18");
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

  // console.log("On line 30")
  for (let i = 0; i < latest_trends_copy.length; i++) {
    let summary = await summarize(latest_trends_copy[i]["topic_tweets"]);
    latest_trends_copy[i]["summary"] = summary;
    setTrends((trends) => {
      return { ...trends, latest_trends: latest_trends_copy };
    });
  }
};

const search_hash = async (tag, setTrends, setAlert) => {
  tag = tag.replace(/^#/, "");
  setAlert({
    error: `Fetching tweets for #${tag}...`,
    type: "info",
  });
  let hash_data = {};
  await axios
    .get(`http://127.0.0.1:5000/hashtag/${tag}`)
    .then((res) => {
      hash_data = res.data;
      setTrends((trends) => {
        let search_hash = [res.data];
        return {
          ...trends,
          latest_trends: search_hash.concat(trends.latest_trends),
        };
      });
      setAlert({});
      // console.log("On line 57");
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

  // console.log("Online 70")
  let summary = await summarize(hash_data["topic_tweets"]);
  setTrends((trends) => {
    let latest_trends_copy = trends.latest_trends;
    latest_trends_copy[0]["summary"] = summary;
    return { ...trends, latest_trends: latest_trends_copy };
  });
};

const user_summarizer = async (user, setUser, setAlert = empty) => {
  setAlert({
    error: "Fetching User data, please wait...",
    type: "info",
  });

  const get_user_details = await axios
    .get(`http://localhost:5000/sentiments/${user.Username}/${user.tweets}`)
    .then((res) => {
      res.data["sentiments"] = JSON.parse(res.data["sentiments"]);
      setAlert({
        error: "Fetching User wordcloud...",
        type: "info",
      });
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
      return {};
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
      return "";
    });

  let [user_details, user_cloud] = await Promise.all([
    get_user_details,
    get_user_cloud,
  ]);

  setAlert({
    error: "Fetching User topics...",
    type: "info",
  });

  let tweets = Object.keys(user_details.sentiments["Tweet"]).map(
    (idx) => user_details.sentiments["Tweet"][idx]
  );
  let data = { tweets: tweets };
  const user_topics = await get_topics(tweets, setAlert);
  setAlert({});
  console.log(user_topics);
  setUser((user) => {
    return {
      ...user,
      details: user_details,
      clouds: user_cloud,
      topics: user_topics,
    };
  });
};

const get_topics = async (tweets, setAlert) => {
  let data = { tweets: tweets };
  let topics = [];
  await axios
    .post("http://localhost:5000/topic", JSON.stringify(data))
    .then((res) => {
      topics = res.data;
    })
    .catch((err) => {
      setAlert({
        error: "Seems like an error while fetching topics",
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });
  return topics;
};

const thread_summarizer = async (thread, setThread, setAlert = empty) => {
  setAlert({
    error: "Fetching thread details...",
    type: "info",
  });
  let thread_tweets = [];
  return await axios
    .get(
      `http://localhost:5000/thread_summary/${thread.url.replaceAll("/", "*")}}`
    )
    .then((res) => {
      thread_tweets = res.data["thread_tweets"];
      setThread((thread) => {
        return { ...thread, details: res.data };
      });
      setAlert({});
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
      setAlert({
        error: "Bruh !! Somethings wrong with your api. Fix it quick",
        type: "error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });

  let summary = await summarize(thread_tweets);
  setThread((thread) => {
    return { ...thread, thread_summary: summary };
  });
};

const summarize = async (tweets) => {
  let data = { tweets: tweets };
  let summary = "";
  await axios
    .post("http://localhost:5000/summarize", JSON.stringify(data))
    .then((res) => {
      summary = res.data;
    });
  return summary;
};

export { trending, search_hash, user_summarizer, thread_summarizer };
