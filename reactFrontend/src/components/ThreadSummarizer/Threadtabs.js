import { React, useState } from "react";
import { Carousel } from "..";

function Links({ urls }) {
    return (
        <>
            <div className="overflow-x-auto">
                {urls ? (
                    <table className="table w-full">
                        <tbody>
                            {urls.map((item, index) => {
                                return (
                                    <tr style={{ "line-height": "1px" }}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <a className="link" href={item.url}>
                                                {item.display}
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default function Threadtabs({ references }) {
    const tabItems = [
        {
            label: "Media",
            Component: <Carousel media_urls={references["media_urls"]} />,
        },
        {
            label: "Links",
            Component: <Links urls={references["urls"]} />,
        },
    ];
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    return (
        <>
            <div className="tabs">
                {tabItems.map((tab, index) => {
                    return (
                        <a
                            className={`tab tab-bordered my-2 ${activeTabIndex == index ? "tab-active" : ""}`}
                            onClick={() => setActiveTabIndex(index)}
                        >
                            {tab.label}
                        </a>
                    );
                })}
            </div>
            <div>{tabItems[activeTabIndex].Component}</div>
        </>
    );
}
