import { React, useState } from "react";
import "../css/App.css"
import "../css/LeftContainer.css"
import "../css/RightContainer.css"
import "../css/TopContainer.css"
import twitter_logo from '../images/twitter_logo.png'


export default function Tabs({ tabs }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    return (
        <>
            <div className="god-container">
                <div className="top-container m-2 p-1 flex justify-between items-center">
                    <img style={{ width: "5%" }} src={twitter_logo} alt="Logo"></img>
                    <div className="tabs">
                        {
                            tabs.map((tab, index) =>
                                <a
                                    key={index}
                                    className={`tab tab-lg tab-lifted w-52
                            ${activeTabIndex == index ? "tab-active" : ""}`}
                                    onClick={() => setActiveTabIndex(index)}>
                                    {tab.name}
                                </a>
                            )
                        }
                    </div>
                    <button
                        className="btn btn-outline btn-primary"
                        onClick={() => {
                            tabs[activeTabIndex].details();
                        }}>Twiterify</button>
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