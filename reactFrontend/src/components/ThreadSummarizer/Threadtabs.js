import { React, useState } from "react";
import { Carousel } from "..";

function Links({ links }) {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <tbody>
                        {links.map((link, index) => {
                            return (
                                <tr style={{ "line-height": "1px" }}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <a className="link" href={link}>
                                            {link}
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default function Threadtabs({ references }) {
    const tabItems = [
        {
            label: "Media",
            Component: <Carousel media={references["images"]} />,
        },
        {
            label: "Links",
            Component: <Links links={references["urls"]} />,
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
