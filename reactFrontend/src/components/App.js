import { React, useState } from "react";
import {
  Trending,
  ThreadSummarizer,
  UserSummarizer,
  RightThread,
  RightTrend,
  RightUser,
  Alert,
  Tabs,
  Drawer
} from ".";
import { mock_thread, mock_trends, mock_user_details } from "./Mock_data";
import { trending, user_summarizer, thread_summarizer } from "../api/Api";
import { IoTrendingUpOutline } from "react-icons/io5";
import { MdOutlineSummarize } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import {
  Breakpoint,
  BreakpointProvider,
} from "react-socks";

export default function App() {
  const [user, setUser] = useState({
    Username: "@SharmaAbhitech",
    tweets: 0,
    details: mock_user_details,
    clouds: "",
    topics:[]
  });
  const [thread, setThread] = useState({
    url: "",
    details: mock_thread,
  });
  const [trends, setTrends] = useState({
    latest_trends: mock_trends,
    show_tweets: [],
    hash_tweets: {},
  });
  const [alert, setAlert] = useState({});

  const tabs = [
    {
      name: "Trending",
      leftComponent: (
        <Trending trends={trends} setTrends={setTrends} setAlert={setAlert} />
      ),
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
  // setDefaultBreakpoints([{ small: 767 }, { medium: 768 }]);

  return (
    <>
      <BreakpointProvider>
        {Object.keys(alert).length > 0 && (
          <Alert error={alert.error} type={alert.type} />
        )}

        <Breakpoint small down>
          <Drawer tabs={tabs}/>
        </Breakpoint>
        <Breakpoint medium up>
          <Tabs tabs={tabs} />
        </Breakpoint>
      </BreakpointProvider>
    </>
  );
}
