import React from "react";
import { motion } from "framer-motion";
import {NoData} from ".."

function Trending_tweets({ trends, className = "" }) {
  return (
    <>
      {trends.show_tweets.length === 0 ? (
        <NoData/>
      ) : (
        <motion.div className={`chat chat-end w-full space-y-2 ${className}`}>
          {trends.show_tweets.map((item) => {
            return (
              <div className="chat-bubble  text-left min-w-min max-w-full bg-[#1c1c1c]">{item}</div>
            );
          })}
        </motion.div>
      )}
    </>
  );
}

function Hashtag_tweets({ trends }) {
  return (
    <div className="h-full">
      <div className="text-neutral-content !bg-[#1c1c1c] h-1/3 flex flex-col justify-between">
        <div className="py-4 px-6 space-y-1 h-48 overflow-y-scroll">
          <h2 className="card-title">{trends.hash_tweets["hashtag"]}</h2>
          <>
            {trends.hash_tweets["topic"] &&
              trends.hash_tweets["topic"].map((topic, idx) => {
                return (
                  <>
                    {" "}
                    <div className="badge border-twitter-100 rounded-full bg-twitter-100 text-white">
                      {topic}
                    </div>{" "}
                    &nbsp;{" "}
                  </>
                );
              })}
          </>
          <p className="text-left">{trends.hash_tweets["summary"]}</p>
          <p className="text-xs text-left text-[#707070] pr-2">
            {trends.hash_tweets["time_stamp"]}
          </p>
        </div>
        <div className="flex justify-between w-48 mx-auto text-xl cursor-auto p-2">
          <div className="tooltip tooltip-left" data-tip="Positive">
            <span className="text-green-500">
              🙂  {trends.hash_tweets["pos"]}
            </span>
          </div>
          <div className="tooltip tooltip-top" data-tip="Negative">
            <span className="text-red-500">
              🙁  {trends.hash_tweets["neg"]}
            </span>
          </div>
          <div className="tooltip tooltip-right" data-tip="Neutral">
            <span className="text-yellow-500">
              😐 {trends.hash_tweets["neu"]}
            </span>
          </div>
        </div>
      </div>

      <div className="p-2 rounded space-y-2 mt-2 h-2/3">
        <p className='text-lg h-heading'>Tweets</p>
        <div className="h-body overflow-y-scroll">
          <div className="chat chat-end w-full space-y-2">
            {
              trends.hash_tweets["hashtag_tweets"].map((tweet, idx) => {
                return <div className="chat-bubble text-left bg-[#2222224a]">{tweet}</div>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

function RightTrend({ trends }) {
  return (
    <>
      {Object.keys(trends.hash_tweets).length > 0 ? (
        <Hashtag_tweets trends={trends} />
      ) : (
        <Trending_tweets trends={trends} />
      )}
    </>
  );
}

RightTrend.Trending_tweets = Trending_tweets;
RightTrend.Hashtag_tweets = Hashtag_tweets;
export default RightTrend; 