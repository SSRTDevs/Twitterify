import React from "react";

export default function UserTweets({ user }) {
    return (
        <>
            {Object.keys(user.details).length > 0 &&
                Object.keys(user.details.sentiments["Tweet"]).map((index, key) => {
                    return (
                        <>
                            <div
                                key={index}
                                className={`w-[80%] border-l-4 border-neutral-800 rounded-r-md my-px mx-auto p-2 shadow-md hover:bg-neutral-700 mb-2 tooltip tooltip-left text-left
                      ${
                          user.details.sentiments.Sentiment[key] === "pos"
                              ? "border-green-300"
                              : user.details.sentiments.Sentiment[key] === "neg"
                              ? "border-red-300"
                              : "border-yellow-300"
                      }`}
                                data-tip={
                                    user.details.sentiments.Sentiment[key] === "pos"
                                        ? "positive "
                                        : user.details.sentiments.Sentiment[key] === "neg"
                                        ? "negative "
                                        : "neutral "
                                }
                            >
                                <p
                                    key={index}
                                    className="py-1 px-2 text-sm leading-relaxed text-white-500 line-clamp-3 dark:text-white-500"
                                >
                                    {user.details.sentiments["Tweet"][key]}
                                </p>
                            </div>
                        </>
                    );
                })}
        </>
    );
}
