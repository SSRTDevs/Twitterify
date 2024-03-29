import { React, useState } from "react";
import { FiTwitter } from "react-icons/fi";
import twitter_logo from "../images/twitterify_logo.png";

const Themes = [
  "black",
  "dark",
  "forest",
  "luxury",
  "night",
  "halloween",
  "coffee",
  "dracula",
  "synthwave",
  "valentine",
  "retro", 
  "cyberpunk",
  "autumn"
];

export default function Tabs({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);

  return (
    <>
      <div
        className="god-container grid grid-cols-6 h-screen "
        data-theme={Themes[themeIndex]}
      >
        <div className="left-section h-screen col-span-4 flex flex-col w-full p-4 px-5 border-r border-zinc-800">
          <div className="top-container h-1/10 flex justify-between items-center mb-2 p-2 border-b border-base-300">
            <div
              className="avatar tooltip tooltip-bottom cursor-pointer"
              data-tip={Themes[themeIndex]}
              onClick={() => setThemeIndex((themeIndex + 1) % Themes.length)}
            >
              <div className="w-16 h-16">  
                <img src={twitter_logo} />
              </div>
            </div>
            <div className="tabs tabs-boxed w-full mx-10">
              {tabs.map((tab, index) => (
                <a
                  key={index}
                  className={`tab w-1/3 space-x-3
                                ${activeTabIndex == index ? "tab-active" : ""}`}
                  onClick={() => setActiveTabIndex(index)}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </a>
              ))}
            </div>
            <button
              className="btn btn-sm btn-outline hover:bg-twitter-200 border-twitter-100 hover:border-twitter-200 normal-case rounded"
              onClick={() => {
                tabs[activeTabIndex].details();
              }}
            >
              Twitterify
            </button>
          </div>

          <div className="left-container h-9/10 items-start text-center p-1">
            {tabs[activeTabIndex].leftComponent}
          </div>
        </div>

        <div className="right-container overflow-y-scroll h-screen col-span-2 p-5 w-full text-center">
          {tabs[activeTabIndex].rightComponent}
        </div>
      </div>
    </>
  );
}
