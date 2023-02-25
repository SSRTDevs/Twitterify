import { React, useState } from "react";
import { FiTwitter } from "react-icons/fi";
import twitter_logo from "../images/twitter_logo.png";

export default function Tabs({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = useState(2);

  return (
    <>
      <div className='god-container grid grid-cols-6 h-screen '
      data-theme="black">
        <div className='left-section h-screen col-span-4 flex flex-col w-full p-2'>
          <div className='top-container flex justify-between items-center p-4 mb-2'>
            <div className='avatar'>
              <div className='w-10 rounded-full'>
                <img src={twitter_logo} />
              </div>
            </div>
            <div className='tabs'>
              {tabs.map((tab, index) => (
                <a
                  key={index}
                  className={`tab tab-lg tab-lifted w-52 space-x-3
                                ${activeTabIndex == index ? "tab-active" : ""}`}
                  onClick={() => setActiveTabIndex(index)}>
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </a>
              ))}
            </div>
            <button
              className='btn btn-outline hover:bg-twitter-200 border-twitter-100 hover:border-twitter-200'
              onClick={() => {
                tabs[activeTabIndex].details();
              }}>
              Twiterify
            </button>
          </div>

          <div className='left-container h-fit overflow-y-scroll items-start text-center p-1'>
            {tabs[activeTabIndex].leftComponent}
          </div>
        </div>

        <div className='right-container overflow-y-scroll h-screen col-span-2 p-5 w-full text-center'>
          {tabs[activeTabIndex].rightComponent}
        </div>
      </div>
    </>
  );
}
