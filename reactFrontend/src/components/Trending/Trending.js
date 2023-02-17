import React, { useEffect, useState } from "react";
import {mock_tag_detail} from "../Mock_data"
import { TrendingCard, TrendingTags } from "../index";

export default function Trending({ trends, setTrends }) {
  
  const [tagDetail,settagDetail] = useState({
    tag : "",
    detail : mock_tag_detail
  })
  
  useEffect(() => {
    // Runs only on the first render
    // trending();
  }, []);



  return (
    <>
      <div className='w-full flex items-center justify-between'>
        <div className='heading text-4xl'>Trending Today</div>
        <div className='form-control mr-8'>
          <div className='input-group'>
            <input
              type='text'
              placeholder='Enter hashtags to know more...'
              className='input max-w-xs'
            />
            <button className='btn btn-square'>
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
      <br />
      <div className='trending w-full'>
        {Object.keys(trends.latest_trends).map((item, idx) => (
          <TrendingTags key={idx} hashtag={item} />
        ))}
      </div>
      {Object.keys(trends.latest_trends).map((key, idx) => (
        <TrendingCard
          key={idx}
          hashtag={key}
          trends={trends}
          setTrends={setTrends}
        />
      ))}
    </>
  );
}
