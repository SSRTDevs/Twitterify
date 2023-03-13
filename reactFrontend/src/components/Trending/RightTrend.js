import React from "react";
import { motion } from "framer-motion";

function Trending_tweets({ trends }) {
  return (
    <>
      {trends.show_tweets.length === 0 ? (
        "Nothing to show"
      ) : (
        <motion.div className="chat chat-end w-full space-y-2">
          {trends.show_tweets.map((item) => {
            return (
              <div className="chat-bubble w-full bg-[#2222224a]">{item}</div>
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
      <div className="text-neutral-content !bg-[#2222224a] h-1/3 overflow-y-scroll">
        <div className="py-4 px-6 space-y-1">
          <h2 className="card-title">{trends.hash_tweets["hashtag"]}</h2>
          <p>{trends.hash_tweets["summary"]}</p>
          <p className="text-xs text-left text-[#707070] pr-2">
            {trends.hash_tweets["time_stamp"]}
          </p>
        </div>
        <div className="flex justify-between w-48 mx-auto text-xl cursor-auto">
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

      <div className="border border-[#2a2a2a] p-2 rounded space-y-2 mt-2 h-2/3">
        <p className='text-lg h-heading'>Tweets</p>
        <div className="h-body overflow-y-scroll">
        <div className="chat chat-end w-full space-y-2">
          {
            trends.hash_tweets["hashtag_tweets"].map((tweet,idx)=>{
              return <div className="chat-bubble bg-[#2222224a]">{tweet}</div>
            })
          }
        </div>
        </div>
      </div>
    </div>
  );
}

export default function RightTrend({ trends }) {
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
