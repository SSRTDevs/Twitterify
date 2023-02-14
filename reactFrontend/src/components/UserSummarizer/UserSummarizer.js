import { React, useEffect } from "react";
import "../../css/LeftComponents/UserSummarizer.css";

export default function UserSummarizer({ user, setUser }) {
  useEffect(() => {
    setUser({ ...user, Username: "", tweets: 0 });
  }, []);

  return (
    <>
      <div className='container mx-auto w-[75%] mb-2'>
        <div className='flex flex-col'>
          <input
            type='search'
            id='default-search'
            className='block p-3 py-2 pl-10 w-full text-sm bg-neutral-800 rounded-lg text-base'
            placeholder='Search Username'
            onChange={(e) => {
              setUser({ ...user, Username: e.target.value });
            }}
          />
        </div>
      </div>
      <br/>
      <div className='overflow-y-scroll h-72 flex justify-center items-baseline'>
        {Object.keys(user.details).length === 0 ? (
          <div className='tabs'>
            <a className='tab tab-bordered'>User Tweets</a>
            <a className='tab tab-bordered tab-active'>Mentioned Tweets</a>
            <a className='tab tab-bordered'>User Timeline chart</a>
          </div>
        ) : (
          Object.keys(user.details.sentiments["Tweet"]).map((index, key) => {
            return (
              <>
                <div
                  className={`w-[80%] border border-neutral-800 my-px mx-auto rounded rounded-[50%] p-2 shadow-md hover:bg-neutral-800 mb-2 
                        ${
                          user.details.sentiments.Sentiment[key] === "pos"
                            ? "hover:border-green-300"
                            : "hover:border-red-300"
                        }`}>
                  <p className='py-1 text-sm leading-relaxed text-white-500 line-clamp-3 dark:text-white-500'>
                    {user.details.sentiments["Tweet"][key]}
                  </p>
                </div>
              </>
            );
          })
        )}
      </div>
    </>
  );
}
