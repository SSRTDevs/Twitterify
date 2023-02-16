import { React, useEffect } from "react";
import "../../css/LeftComponents/UserSummarizer.css";
import { UserTweets, MentionTweets, UserTimeline, UserTabs } from "../index";

export default function UserSummarizer({ user, setUser }) {
  // useEffect(() => {
  //   setUser({ ...user, Username: "", tweets: 0 });
  // }, []);
  const tabItems = [
    {
      name: "User Tweets",
      component: <UserTweets user={user} />,
    },
    {
      name: "Mention Tweets",
      component: <MentionTweets />,
    },
    {
      name: "User Timeline",
      component: <UserTimeline />,
    },
  ];

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
      <br />
      {Object.keys(user.details).length === 0 ? (
        <h3 className='font-bold text-2xl'>Nothing to show</h3>
      ) : (
        <UserTabs tabItems={tabItems} />
      )}
    </>
  );
}
