import { React, useState } from "react";
import { FiTwitter } from "react-icons/fi";
import twitter_logo from "../images/twitter_logo.png";

export default function Drawer({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <>
      <div
        className="god-container flex flex-col h-screen w-screen"
        data-theme="black"
      >

        <div className="container h-full overflow-y-scroll text-center p-1">
          {tabs[activeTabIndex].leftComponent}
        </div>

        <div className="bottom-container h-fit w-full flex justify-between items-center mt-2 p-2 border-t border-base-300">
          <div className="tabs tabs-boxed w-full">
            {tabs.map((tab, index) => (
              <a
                key={index}
                className={`tab w-1/3 space-x-1
                                ${activeTabIndex == index ? "tab-active" : ""}`}
                onClick={() => setActiveTabIndex(index)}
              >
                  <span>{tab.name}</span>
              </a>
            ))}
          </div>
          <button
            className="btn btn-sm text-xs btn-outline hover:bg-twitter-200 border-twitter-100 hover:border-twitter-200 normal-case"
            onClick={() => {
              tabs[activeTabIndex].details();
            }}
          >
            Twitterify
          </button>
        </div>
      </div>
    </>
  );
}
