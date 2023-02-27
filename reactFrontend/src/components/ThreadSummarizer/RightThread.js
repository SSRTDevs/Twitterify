import React from "react";
import tweet_cnt from "../../images/tweet_cnt.png";
import sentiment from "../../images/sentiment.png";
import { AiOutlineTwitter } from "react-icons/ai";
import { MdSentimentSatisfiedAlt } from "react-icons/md";
// import '../../css/RightComponents/RightThread.css'

export default function RightThread(props) {
  return (
    <>
      <div>
        <div className='h-auto w-full flex items-center border-black-700  rounded-lg p-4  bg-neutral-800'>
          <div className='avatar'>
            <div className='w-16 rounded-full ring ring-twitter-200 ring-offset-base-100 ring-offset-1'>
              <img src={props.thread.details["profile_image_url"]} />
            </div>
          </div>
          <div className='ml-[5%]'>
            <h1 className='text-2xl font-bold'>
              {props.thread.details["username"]}
            </h1>
          </div>
        </div>
      </div>

      <br />

      <div className='p-4 h-auto w-full checker-bg flex flex-col items-start border border-base-300 rounded-lg border mt-3 justify-around gap-3'>
        <div className='w-full'>
          <div className='text-2xl'>Statistics</div>
        </div>
        <div className='stats stats-vertical lg:stats-horizontal shadow m-auto'>
          <div className='stat'>
            <div className='stat-figure text-twitter-100'>
              <AiOutlineTwitter size={30} />
            </div>
            <div className='stat-title'>Thread Length</div>
            <div className='stat-value'>
              {props.thread.details["thread_tweets"].length}
            </div>
          </div>

          <div className='stat'>
            <div className='stat-figure text-twitter-100'>
              <MdSentimentSatisfiedAlt size={30} />
            </div>
            <div className='stat-title'>Sentiment</div>
            <div className='stat-desc-value badge badge-accent'> Positive</div>
          </div>
        </div>
      </div>

      <br />

      <div className='overflow-y-scroll p-4 h-2/3 w-full checker-bg border rounded border border-base-300'>
        <div className='w-full'>
          <div className='text-2xl'>Replies</div>
        </div>
        <br />
        <div className='reply-div chat chat-end'>
          {Object.keys(props.thread.details).length === 0 ? (
            <p className='replies text-lg hover:bg-[#f4f4f40f]'>
              No replies yet{" "}
            </p>
          ) : (
            props.thread.details["reply_tweets"].map((item, key) => {
              return (
                <div className='chat-bubble replies text-md border border-x-0 border-gray-700 hover:bg-[#f4f4f40f]'>
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
