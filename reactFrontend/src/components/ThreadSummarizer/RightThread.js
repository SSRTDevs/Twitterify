import React from "react";
import tweet_cnt from "../../images/tweet_cnt.png";
import sentiment from "../../images/sentiment.png";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdSentimentSatisfiedAlt } from "react-icons/md";


export default function RightThread(props) {
  return (
    <>
      <div>
        <div className="h-auto w-full flex items-center border-black-700  rounded-lg p-4  bg-neutral-800">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-twitter-200 ring-offset-base-100 ring-offset-1">
              <img
                src={props.thread.details["profile_image_url"]}
                alt="profile_image"
              />
            </div>
          </div>
          <div className="ml-[5%]">
            <h1 className="text-xl font-bold">
              {props.thread.details["username"]}
            </h1>
          </div>
        </div>
      </div>

      <div className="h-auto w-full checker-bg rounded-lg border border-base-300 p-4 my-2">
        <div className="w-full text-2xl">Thread About</div>

        <div className="text-left w-full p-4 flex flex-wrap gap-0.5">
          {props.thread.details["topic"] &&
            props.thread.details["topic"].map((topic, idx) => {
              return (
                <>
                  {" "}
                  <span className="badge border-twitter-100 rounded-full bg-twitter-100 text-white">
                    {topic}
                  </span>{" "}
                  &nbsp;{" "}
                </>
              );
            })}
        </div>
      </div>

      <div className="p-2 mb-2 h-auto w-full checker-bg flex flex-col items-start border-base-300 rounded-lg border justify-around gap-3">
        <div className="w-full">
          <div className="text-2xl">Statistics</div>
        </div>
        <div className="stats stats-vertical lg:stats-horizontal shadow m-auto">
          <div className="stat">
            <div className="stat-figure text-twitter-100">
              <AiOutlineTwitter size={30} />
            </div>
            <div className="stat-title">Thread Length</div>
            <div className="stat-value">
              {props.thread.details["thread_tweets"].length}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-twitter-100">
              <MdSentimentSatisfiedAlt size={30} />
            </div>
            <div className="stat-title">Sentiment</div>
            <div className="stat-desc-value badge badge-accent">
              {props.thread.details.thread_sentiment["pos"] ===
              Math.max(
                props.thread.details.thread_sentiment["pos"],
                props.thread.details.thread_sentiment["neg"],
                props.thread.details.thread_sentiment["neu"]
              )
                ? "Positive"
                : props.thread.details.thread_sentiment["neg"] ===
                  Math.max(
                    props.thread.details.thread_sentiment["pos"],
                    props.thread.details.thread_sentiment["neg"],
                    props.thread.details.thread_sentiment["neu"]
                  )
                ? "Negative"
                : "Neutral"}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-y-scroll p-4 h-96 w-full checker-bg border rounded border-base-300">
        <div className="w-full">
          <div className="text-2xl">Replies</div>
        </div>
        <br />
        <div className="chat chat-end space-y-2">
          {Object.keys(props.thread.details).length === 0 ? (
            <p className="replies text-lg hover:bg-[#f4f4f40f]">
              No replies yet{" "}
            </p>
          ) : (
            props.thread.details["reply_tweets"].map((item, key) => {
              return (
                <div className="chat-bubble text-md hover:bg-[#f4f4f40f]">
                  {item}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
