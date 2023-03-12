import { React, useState } from "react";

export default function UserTabs({ tabItems }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <>
      <div className='space-y-4 h-9/10'>
        <div className='tabs w-full flex justify-center h-1/10'>
          {tabItems.map((tab, idx) => (
            <a
              key={idx}
              className={`tab tab-bordered ${
                activeTabIndex == idx ? "tab-active" : ""
              }`}
              onClick={() => setActiveTabIndex(idx)}>
              {tab.name}
            </a>
          ))}
        </div>
        <div className='w-full h-8/10 overflow-y-scroll'>{tabItems[activeTabIndex].component}</div>
      </div>
    </>
  );
}
