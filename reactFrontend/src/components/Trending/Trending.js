import React, { useEffect, useState } from "react";
import { TrendingCard, RightTrend } from "../index";
import { Breakpoint } from "react-socks";
import { search_hash, trending } from "../../api/Api";

function TopSection({ children }) {
  return (
    <div className="topSection h-1/10 w-full">
      <Breakpoint small down>
        <div className="flex justify-between mt-2">{children}</div>
      </Breakpoint>
      <Breakpoint medium up>
        <div className="flex justify-between mt-2 px-[2vw]">{children}</div>
      </Breakpoint>
    </div>
  );
}

export default function Trending({ trends, setTrends, setAlert }) {
  const [tag, settag] = useState("AirIndia");

  useEffect(() => {
    // Runs only on the first render
    // trending();
  }, []);

  const read_tweets = (index) => {
    setTrends({
      ...trends,
      show_tweets: trends.latest_trends[index].topic_tweets,
      hash_tweets: [],
    });
  };

  const RightTrendComponent = (
    <RightTrend trends={trends} className="h-20 overflow-y-scroll text" />
  );

  return (
    <>
      <div className="w-full h-full flex items-center flex-col space-y-2 px-2">
        <TopSection>
          <TrendingCard.Dropdown trends={trends} />
          <div>
            <div className="form-control tooltip tooltip-left">
              <div className="input-group border border-zinc-800 rounded-sm">
                <input
                  type="text"
                  placeholder="Enter #hashtag or country"
                  className="input input-sm w-48"
                  onChange={(e) => settag(e.target.value)}
                />
                <button
                  className="btn btn-sm btn-square"
                  onClick={() => {
                    tag.includes("#")
                      ? search_hash(tag, setTrends, setAlert)
                      : trending(trends, setTrends, setAlert, tag);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center text-gray-500 text-xs ml-auto mt-2">
              <div>
                Last fetched: <span>{trends.latest_trends[0].time_stamp}</span>
              </div>
            </div>
          </div>
        </TopSection>

        <div className="h-9/10 overflow-y-scroll pr-2 px-3">
          {trends.latest_trends.map((trend, idx) => (
            <>
              <Breakpoint small down>
                <TrendingCard.TrendingSmallCard
                  key={idx}
                  index={idx}
                  hashtag={trend.topic_name}
                  trend={trend}
                  setReadTweets={read_tweets}
                  RightComponent={RightTrendComponent}
                />
              </Breakpoint>
              <Breakpoint medium up>
                <TrendingCard
                  key={idx}
                  index={idx}
                  hashtag={trend.topic_name}
                  trend={trend}
                  setReadTweets={read_tweets}
                />
              </Breakpoint>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
