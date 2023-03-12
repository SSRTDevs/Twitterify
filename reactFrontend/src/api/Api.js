import axios from "axios";

<<<<<<< HEAD
const trending = async (trends, setTrends, setAlert) => {
  await axios
    .get(`http://127.0.0.1:5000/trending_tweets`)
    .then((res) => {
      console.log("Trending Tweets", res.data);
      setTrends((trends) => {
        return { ...trends, latest_trends: res.data };
      });
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
      setAlert({
        error: "Error with Api-call",
        bg: "bg-error",
      });
      setTimeout(() => {
        setAlert({});
      }, 2000);
=======
const trending = async (trends, setTrends, setAlert, topic) => {
    console.log(topic);
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
            setAlert({
                error: "Error with Api-call",
                bg: "bg-error",
            });
            setTimeout(() => {
                setAlert({});
            }, 2000);
        });

    await axios.get(`http://localhost:5000/trending_tweets_by_topic`, { params: { topic: topic } }).then((res) => {
        console.log("Trending tweets by topic", topic);
>>>>>>> origin/saket
    });
};

const user_summarizer = async (user, setUser, setAlert) => {
<<<<<<< HEAD
  await axios
    .get(`http://172.17.0.2:5000/sentiments/${user.Username}/${user.tweets}`)
    .then((res) => {
      console.log(res.data)
      res.data["sentiments"] = JSON.parse(res.data["sentiments"]);
      console.log(res.data.payload)
      setUser((user) => {
        return { ...user, details: res.data };
      });
      console.log(user)
    })
    .catch((err) => {
      console.log("Kuch toh gadbad hai beta");
      setAlert({
        error: "You might have entered wrong username",
        bg: "bg-error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });

  await axios
    .get(`http://172.17.0.2:5000/wordclouds/${user.Username}/${user.tweets}`)
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

const thread_summarizer = async (thread, setThread, setAlert) => {
  console.log(thread.url);
  await axios
    .get(
      `http://172.17.0.2:5000/thread_summary/${thread.url.replaceAll("/", "*")}}`
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
        bg: "bg-error",
      });
      setTimeout(() => {
        setAlert({});
      }, 3000);
    });
=======
    await axios
        .get(`http://localhost:5000/sentiments/${user.Username}/${user.tweets}`)
        .then((res) => {
            console.log(res.data);
            res.data["sentiments"] = JSON.parse(res.data["sentiments"]);
            console.log(res.data.payload);
            setUser((user) => {
                return { ...user, details: res.data };
            });
            console.log(user);
        })
        .catch((err) => {
            console.log("Kuch toh gadbad hai beta");
            setAlert({
                error: "You might have entered wrong username",
                bg: "bg-error",
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
        })
        .catch((err) => {
            console.log("Kuch toh gadbad hai beta");
        });
};

const thread_summarizer = async (thread, setThread, setAlert) => {
    console.log(thread.url);
    await axios
        .get(`http://localhost:5000/thread_summary/${thread.url.replaceAll("/", "*")}}`)
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
                bg: "bg-error",
            });
            setTimeout(() => {
                setAlert({});
            }, 3000);
        });
>>>>>>> origin/saket
};

export { trending, user_summarizer, thread_summarizer };
