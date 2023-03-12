import React, { useEffect, useState } from "react";
import { TrendingCard } from "../index";
import { search_hash } from "../../api/Api";

export default function Trending({ trends, setTrends, setAlert }) {
    const [tag, settag] = useState("AirIndia");

    useEffect(() => {
        // Runs only on the first render
        // trending();
    }, []);

    const read_tweets = (index) => {
        setTrends({
            ...trends,
            show_tweets: trends.latest_trends[index].topic_tweets,
            hash_tweets: [],
        });
    };

  return (
    <>
      <div className='w-full h-full flex items-center flex-col space-y-2 px-2'>

        <div className='topSection h-1/10 w-full flex items-center justify-between'>
          <TrendingCard.Dropdown trends={trends} />
          <div className='form-control mr-8'>
            <div className='input-group'>
              <input
                type='text'
                placeholder='Enter any hashtag'
                className='input input-sm max-w-xs'
                onChange={(e)=> settag(e.target.value)}
              />
              <button 
              className='btn btn-sm btn-square'
              onClick={()=> search_hash(tag, setTrends, setAlert)}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="h-9/10 overflow-y-scroll pr-2">
          {trends.latest_trends.map((trend, idx) => (
            <TrendingCard
              key={idx}
              index={idx}
              hashtag={trend.topic_name}
              trend={trend}
              setReadTweets={read_tweets}
            />
          ))}
        </div>

      </div>
    </>
  );
}
