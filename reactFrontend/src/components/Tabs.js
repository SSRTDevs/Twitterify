import { React, useState } from "react";
import "../css/App.css";
import "../css/LeftContainer.css";
import "../css/RightContainer.css";
import "../css/TopContainer.css";
import twitter_logo from "../images/twitter_logo.png";

export default function Tabs({ tabs }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <>
      <div className='god-container grid grid-cols-6 h-screen '>

        <div className='left-section h-screen col-span-4 flex flex-col w-full p-2'>

          <div className='top-container h-fit flex justify-between items-start p-1 mb-5'>
            <img style={{ width: "5%" }} src={twitter_logo} alt='Logo'></img>
            <div className='tabs'>
              {tabs.map((tab, index) => (
                <a
                  key={index}
                  className={`tab tab-lg tab-lifted w-52
                                ${activeTabIndex == index ? "tab-active" : ""}`}
                  onClick={() => setActiveTabIndex(index)}>
                  {tab.name}
                </a>
              ))}
            </div>
            <button
              className='btn btn-outline btn-primary'
              onClick={() => {
                tabs[activeTabIndex].details();
              }}>
              Twiterify
            </button>
          </div>

          <div className='left-container h-full overflow-y-scroll items-start text-center p-2 m-2'>
            {tabs[activeTabIndex].leftComponent}
          </div>

        </div>

        <div className='right-container h-screen col-span-2 p-5 w-full text-center'>
          {tabs[activeTabIndex].rightComponent}
        </div>
      </div>
    </>
  );
}
