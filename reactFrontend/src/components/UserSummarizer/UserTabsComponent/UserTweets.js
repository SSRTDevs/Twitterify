import React from "react";
import { FcLike } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";

function Tweet_stat({ tweet, sort_by_likes, sort_by_retweets }) {
  const format_count = (count) => {
    if (!Number.isInteger(count)) return;

    if (count >= 10 ** 9) {
      count = count / (10 ** 9);
      return `${count.toFixed(2)}B`;
    }
    if (count >= 10 ** 6) {
      count = count / (10 ** 6);
      return `${count.toFixed(2)}M`;
    }
    if (count >= 10 ** 3) {
      count = count / (10 ** 3);
      return `${count.toFixed(1)}K`;
    }
    return String(count);
  };
  return (
    <div className="flex flex-col h-fit w-fit space-y-1">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => sort_by_likes()}
      >
        <FcLike /> &nbsp; <span>{format_count(tweet.likes)}</span>
      </div>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => sort_by_retweets()}
      >
        <AiOutlineRetweet className="text-twitter-100" /> &nbsp;{" "}
        <span>{format_count(tweet.retweets)}</span>
      </div>
    </div>
  );
}

export default function UserTweets({ user, setUser }) {
  const sort_by_likes = () => {
    let user_tweets = user.details.user_tweets.sort((tweet1, tweet2) =>
      tweet1.likes > tweet2.likes ? -1 : tweet1.likes < tweet2.likes ? 1 : 0
    );
    setUser((user) => {
      let user_details = user.details;
      user_details.user_tweets = user_tweets;
      return { ...user, details: user_details };
    });
  };

  const sort_by_retweets = () => {
    let user_tweets = user.details.user_tweets.sort((tweet1, tweet2) =>
      tweet1.retweets > tweet2.retweets
        ? -1
        : tweet1.retweets < tweet2.retweets
        ? 1
        : 0
    );
    setUser((user) => {
      let user_details = user.details;
      user_details.user_tweets = user_tweets;
      return { ...user, details: user_details };
    });
  };

  return (
    <>
      {Object.keys(user.details).length > 0 &&
        user.details.user_tweets.map((user_tweet, index) => {
          return (
            <>
              <div
                key={index}
                className={`w-[80%] border-l-4 border-neutral-800 flex justify-between gap-2
                rounded-r-md my-px mx-auto p-2 shadow-md hover:bg-neutral-700 mb-2 tooltip tooltip-left text-left
                      ${
                        user_tweet.sentiment === "pos"
                          ? "border-green-300"
                          : user_tweet.sentiment === "neg"
                          ? "border-red-300"
                          : "border-yellow-300"
                      }`}
                data-tip={
                  user_tweet.sentiment === "pos"
                    ? "positive "
                    : user_tweet.sentiment === "neg"
                    ? "negative "
                    : "neutral "
                }
              >
                <p
                  key={index}
                  className="py-1 px-2 text-sm leading-relaxed text-white-500 line-clamp-3 dark:text-white-500"
                >
                  {user_tweet.tweet}
                </p>
                <Tweet_stat
                  tweet={user_tweet}
                  sort_by_likes={sort_by_likes}
                  sort_by_retweets={sort_by_retweets}
                />
              </div>
            </>
          );
        })}
    </>
  );
}
