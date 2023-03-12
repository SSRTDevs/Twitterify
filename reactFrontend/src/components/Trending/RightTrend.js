import React from "react";
import { motion } from "framer-motion";

function Trending_tweets({ trends }) {
  return (
    <>
      {trends.show_tweets.length === 0
        ? "Nothing to show"
        : trends.show_tweets.map((item) => {
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1] }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 1] }}
                  className="card"
                >
                  <div className="card-body">
                    <p className="card-text">{item}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
    </>
  );
}

function Hashtag_tweets({ trends }) {
  return <>Hey</>;
}

export default function RightTrend({ trends }) {
  return (
    <>
    {
        trends.hash_tweets.length > 0 ? 
        <Hashtag_tweets trends={trends} /> : 
        <Trending_tweets trends={trends} />
    }
    </>
  );
}
