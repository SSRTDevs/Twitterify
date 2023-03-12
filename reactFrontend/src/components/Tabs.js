import { React, useState } from "react";
import { FiTwitter } from "react-icons/fi";
import twitter_logo from "../images/twitter_logo.png";

export default function Tabs({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = useState(2);

  return (
    <>
      <div className='god-container grid grid-cols-6 h-screen '
      data-theme="black">
        <div className='left-section h-screen col-span-4 flex flex-col w-full p-4'>
          <div className='top-container h-1/10 flex justify-between items-center mb-2 p-2 border-b border-base-300'>
            <div className='avatar'>
              <div className='w-10 rounded-full'>
                <img src={twitter_logo} />
              </div>
            </div>
            <div className='tabs tabs-boxed'>
              {tabs.map((tab, index) => (
                <a
                  key={index}
                  className={`tab w-52 space-x-3
                                ${activeTabIndex == index ? "tab-active" : ""}`}
                  onClick={() => setActiveTabIndex(index)}>
                  <span>{tab.icon}</span>
                  <span>{tab.name}</span>
                </a>
              ))}
            </div>
            <button
              className='btn btn-sm btn-outline hover:bg-twitter-200 border-twitter-100 hover:border-twitter-200 normal-case'
              onClick={() => {
                tabs[activeTabIndex].details();
              }}>
              Twitterify
            </button>
          </div>

          <div className='left-container h-9/10 items-start text-center p-1'>
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
