import { React, useState, useEffect } from "react";
import "../App.css"
import "../css/LeftContainer.css"
import "../css/RightContainer.css"
import "../css/TopContainer.css"


export default function Tabs({ tabs }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    useEffect(() => {
        console.log(tabs)
        tabs.map((tab, index) => {
            console.log(tab.name)
            return;
        })
    });

    return (
        <>
            <div className="god-container">
                <div className="tabs top-container">
                    {
                        tabs.map((tab, index) =>
                            <a
                                key={index}
                                className={`tab tab-lg tab-lifted w-64
                        ${activeTabIndex == index ? "tab-active" : ""}`}
                                onClick={() => setActiveTabIndex(index)}
                            >{tab.name}</a>
                        )
                    }
                </div>
                <div className="left-container">
                    {tabs[activeTabIndex].leftComponent}
                </div>
                <div className="right-container">
                    {tabs[activeTabIndex].rightComponent}
                </div>
            </div>
        </>
    )


}