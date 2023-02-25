import { React, useState } from "react";
import { Tabs } from ".";
import {
  Trending,
  ThreadSummarizer,
  UserSummarizer,
  RightThread,
  RightTrend,
  RightUser,
  Alert,
} from ".";
import { mock_thread, mock_trends, mock_user_details } from "./Mock_data";
import { trending, user_summarizer, thread_summarizer } from "../api/Api";
import { IoTrendingUpOutline } from "react-icons/io5";
import { MdOutlineSummarize } from "react-icons/md";
import { ImProfile } from "react-icons/im";

export default function App() {
  const [user, setUser] = useState({
    Username: "@SharmaAbhitech",
    tweets: 0,
    details: mock_user_details,
    clouds: "",
  });
  const [thread, setThread] = useState({
    url: "",
    details: mock_thread,
  });
  const [trends, setTrends] = useState({
    latest_trends: mock_trends,
    show_tweets: [],
  });
  const [alert, setAlert] = useState({});

  const tabs = [
    {
      name: "Trending",
      leftComponent: <Trending trends={trends} setTrends={setTrends} trending={trending} />,
      rightComponent: <RightTrend trends={trends} />,
      icon: <IoTrendingUpOutline />,
      details: () => trending(trends, setTrends, setAlert),
    },
    {
      name: "Thread",
      leftComponent: <ThreadSummarizer thread={thread} setThread={setThread} />,
      rightComponent: <RightThread thread={thread} />,
      icon: <MdOutlineSummarize />,
      details: () => thread_summarizer(thread, setThread, setAlert),
    },
    {
      name: "Profile",
      leftComponent: <UserSummarizer user={user} setUser={setUser} />,
      rightComponent: <RightUser user={user} />,
      icon: <ImProfile />,
      details: () => user_summarizer(user, setUser, setAlert),
    },
  ];

  return (
    <>
      {Object.keys(alert).length > 0 && (
        <Alert error={alert.error} type={alert.type} />
      )}
      <Tabs tabs={tabs} />
    </>
  );
}
