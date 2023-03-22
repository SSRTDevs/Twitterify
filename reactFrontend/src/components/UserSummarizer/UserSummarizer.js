import { React, useEffect } from "react";
import "../../css/LeftComponents/UserSummarizer.css";
import { user_summarizer } from "../../api/Api";
import {
  UserTweets,
  MentionTweets,
  UserTimeline,
  UserTabs,
  RightUser,
  InputWithBtn
} from "../index";
import { Breakpoint } from "react-socks";


export default function UserSummarizer({ user, setUser }) {
  const tabItems = [
    {
      name: "User Tweets",
      component: <UserTweets user={user} />,
    },
    {
      name: "Mention Tweets",
      component: <MentionTweets user={user} />,
    },
    {
      name: "User Timeline",
      component: <UserTimeline user={user} />,
    },
  ];

  return (
    <>
      <div className="container mx-auto mt-2 h-full">
        <div className="h-1/10 w-[75%] mx-auto">
          <Breakpoint small down>
            <InputWithBtn run={() => {user_summarizer(user, setUser)}} placeholder="Username..."/>
          </Breakpoint>
          <Breakpoint medium up><input
            type="search"
            id="default-search"
            className="block p-3 py-2 pl-10 w-full text-sm bg-neutral-800 rounded-lg"
            placeholder="Search Username"
            onChange={(e) => {
              setUser({ ...user, Username: e.target.value });
            }}
          /></Breakpoint>
          
        </div>

        <Breakpoint small down>
          <RightUser user={user} />
          <br />
        </Breakpoint>

        {Object.keys(user.details).length === 0 ? (
          <h3 className="font-bold text-2xl">Nothing to show</h3>
        ) : (
          <UserTabs tabItems={tabItems} />
        )}
      </div>
    </>
  );
}
