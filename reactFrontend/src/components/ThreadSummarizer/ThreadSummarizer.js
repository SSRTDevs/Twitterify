import { React } from "react";
import {RightThread, Threadtabs} from "../";
import {Breakpoint} from "react-socks"

export default function ThreadSummarizer({ thread, setThread }) {
  return (
    <>
      <div className="container mx-auto w-[75%] h-1/10">
        <div className="flex flex-row">
          <input
            type="search"
            id="default-search"
            className="block p-3 py-2 pl-10 w-full text-sm bg-neutral-800 rounded-lg text-base"
            placeholder="Enter Thread URL"
            onChange={(e) => {
              setThread({ ...thread, url: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="h-9/10 overflow-y-scroll px-4">
        <div
          tabIndex={0}
          className="!bg-[#2222224a] collapse collapse-open rounded-box h-fit"
        >
          <div className="collapse-title text-xl font-medium">
            Thread Summary
          </div>
          <div className="collapse-content text-left">
            {Object.keys(thread.details).length === 0 ? (
              <p>No summary to show</p>
            ) : (
              thread.details["thread_summary"]
            )}
          </div>
        </div>

        <div className="text-center w-full space-y-4 px-3 py-2 mt-3 justify-around gap-3">
          <Threadtabs references={thread.details["references"]}/>
          {/* <div className="collapse m-auto w-80 collapse-arrow">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              Reference/Links
            </div>
            <div className="collapse-content">
              {Object.keys(thread.details).length === 0 ? (
                <p>Summarize a Thread to see the links associated with it </p>
              ) : (
                thread.details["references"]["urls"].map((item, id) => {
                  return (
                    <div className="text-blue-600 dark:text-blue-500 hover:underline">
                      <a href={item} target="blank" rel="noopener noreferrer">
                        {item}
                      </a>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {Object.keys(thread.details).length === 0 ? (
            <span style={{ textAlign: "left" }}>No references to show</span>
          ) : (
            <Carousel thread={thread} />
          )} */}
        </div>

      </div>
      <Breakpoint small down>
        <br/>
        <RightThread  thread={thread}/>
      </Breakpoint>
    </>
  );
}
