import React from "react";

export default function UserTweets({user}) {
  
  return (
    <>
      {
        Object.keys(user.details).length > 0 && 
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
      }
    </>
  );
}
