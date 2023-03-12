import { React, useState } from "react";

export default function UserTabs({ tabItems }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <>
      <div className='space-y-8 mt-2'>
        <div className='tabs w-full flex justify-center'>
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
        <div className='w-full h-fit max-h-[28rem] overflow-y-scroll'>{tabItems[activeTabIndex].component}</div>
      </div>
    </>
  );
}
