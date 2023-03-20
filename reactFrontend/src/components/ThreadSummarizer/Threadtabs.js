import { React, useState } from "react";
import { Carousel } from "..";

function Attachements({ links }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <tbody>
            {/* row 1 */}
            {
                links.map((link, index) => {
                    return (
                        <tr style={{"line-height":"1px"}}>
                            <th>{index+1}</th>
                            <td>
                                <a className="link link-info" href={link}>{link}</a>
                            </td>
                        </tr>
                    )
                })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function Threadtabs({ references }) {
  const tabItems = [
    {
      label: "Attachements",
      Component: <Attachements links={references["urls"]} />,
    },
    {
      label: "Media",
      Component: <Carousel media={references["images"]} />,
    },
  ];
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  return (
    <>
      <div className="tabs">
        {tabItems.map((tab, index) => {
          return (
            <a
              className={`tab tab-bordered my-2 ${
                activeTabIndex == index ? "tab-active" : ""
              }`}
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
