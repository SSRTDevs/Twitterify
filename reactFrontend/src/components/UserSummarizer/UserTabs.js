import { React, useState } from "react";

export default function UserTabs({ tabItems }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <>
      <div className='overflow-y-scroll space-y-6'>
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
        <div className='w-full'>{tabItems[activeTabIndex].component}</div>
      </div>
    </>
  );
}
