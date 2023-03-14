import { React, useState } from "react";
import { FiTwitter } from "react-icons/fi";
import twitter_logo from "../images/twitter_logo.png";

export default function Drawer({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <>
      <div
        className="god-container grid grid-rows-6 h-screen w-screen"
        data-theme="black"
      >
        <div className="top-container h-1/4 row-span-2 w-full flex justify-between items-center mb-2 p-2 border-b border-base-300">
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

        <div className="container h-2/4  row-span-4 items-start text-center p-1">
          {/* {tabs[activeTabIndex].leftComponent} */}
        </div>

        <div className="bottom-container overflow-y-scroll h-1/4 row-span-2 p-5 w-full text-center">
          {/* {tabs[activeTabIndex].rightComponent} */}
        </div>
      </div>
    </>
  );
}
