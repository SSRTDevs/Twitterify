import React from "react";
import { motion } from "framer-motion";
import { Breakpoint } from "react-socks";

function Collapse({ RightComponent, click }) {
  return (
    <div onClick={click} tabIndex={0} className="collapse w-full">
      <div className="link collapse-title text-sm text-right">
        Read more
      </div>
      <div className="collapse-content w-full">
        {RightComponent}
      </div>
    </div>
  );
}

function TrendingDropdown({ trends }) {
  const smoothScroll = (hashtag) => {
    const element = document.getElementById(hashtag);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-sm normal-case">
          Trending Today
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-fit"
        >
          {trends.latest_trends.map((trend, idx) => (
            <li>
              <a
                key={idx}
                className="text-sm"
                style={{ textDecoration: "none", cursor: "pointer" }}
                onClick={() => smoothScroll(trend.topic_name)}
              >
                {trend.topic_name.replaceAll(" ", "_")}{" "}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function TrendingCard({
  index,
  trend,
  hashtag,
  setReadTweets,
  RightComponent,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          id={`${hashtag}`}
          className="card shadow-md rounded !bg-[#2222224a]"
        >
          <div className="card-body p-5 space-y-1">
            <div className="topbar w-full flex justify-between ">
              <h5 className="card-title w-fit">{hashtag}</h5>
              <p className="text-sm text-right w-fit text-gray-400 hover:text-gray-300">
                {trend.topic_tweet_count} tweets posted
              </p>
            </div>

            {/* <h6 className='card-subtitle text-muted'>Cricket</h6> */}
            {/* <h6 className="card-subtitle">
                            Sentiment Stats: &nbsp; &nbsp;
                            <span style={{ color: "green" }}>Pos: {trend.pos} &nbsp; &nbsp;</span>
                            <span style={{ color: "red" }}>Neg: {trend.neg} &nbsp; &nbsp;</span>
                            <span style={{ color: "yellow" }}>Neutral: {trend.neu} &nbsp; &nbsp;</span>
                        </h6> */}

            <p className="card-text text-left">{trend.summary}</p>

            <div className="endbar flex justify-between w-full">
              <p className="text-xs text-left text-[#707070]">
                {trend.time_stamp}
              </p>
              <Breakpoint small down>
                <Collapse RightComponent={RightComponent} click={() => setReadTweets(index)}/>
              </Breakpoint>
              <Breakpoint medium up>
                <a
                  className="link text-right"
                  onClick={() => {
                    setReadTweets(index);
                  }}
                >
                  Read Tweets
                </a>
              </Breakpoint>
            </div>
          </div>
          
        </div>
      </motion.div>
    </>
  );
}

TrendingCard.Dropdown = TrendingDropdown;
export default TrendingCard;
