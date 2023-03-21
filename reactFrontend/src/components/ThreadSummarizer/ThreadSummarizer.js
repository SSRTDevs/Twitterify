import { React } from "react";
import {RightThread, Threadtabs} from "../";
import {Breakpoint} from "react-socks"

export default function ThreadSummarizer({ thread, setThread }) {

  const removeSlug = (url) => {
    url = url.split("?")[0];
    return url
  }

  return (
    <>
      <div className="container mx-auto w-[75%] h-1/10">
        <div className="flex flex-row">
          <input
            type="search"
            id="default-search"
            className="block p-3 py-2 pl-10 w-full text-sm bg-neutral-800 rounded-lg"
            placeholder="Enter Thread URL"
            onChange={(e) => {
              setThread({ ...thread, url: removeSlug(e.target.value) });
            }}
          />
        </div>
      </div>
      <div className="h-9/10 overflow-y-scroll px-4">
        <div
          tabIndex={0}
          className="!bg-[#1c1c1c] collapse collapse-open rounded-box h-fit"
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
        </div>

      </div>
      <Breakpoint small down>
        <br/>
        <RightThread  thread={thread}/>
      </Breakpoint>
    </>
  );
}
