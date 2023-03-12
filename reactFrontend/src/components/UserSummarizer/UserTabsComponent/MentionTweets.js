import React from "react";

export default function MentionTweets({user}) {
  return <>
      {Object.keys(user.details).length > 0 &&
        user.details.mention_tweets.map((tweet, index) => {
          return (
            <>
              <div
                key={index}
                className={`w-[80%] border-l-2 border-neutral-800 rounded-r-md my-px mx-auto p-2 shadow-md hover:bg-neutral-700 mb-2`}>
                <p
                  key={index}
                  className='py-1 text-sm leading-relaxed text-white-500 line-clamp-3 dark:text-white-500'>
                  {tweet}
                </p>
              </div>
            </>
          );
        })}
    </>;
}
