import { React } from "react";
import {Carousel} from "../"

export default function ThreadSummarizer({ thread, setThread }) {
  return (
    <>
      <div className='container mx-auto w-[75%]'>
        <div className='flex flex-row'>
          <input
            type='search'
            id='default-search'
            className='block p-3 py-2 pl-10 w-full text-sm bg-neutral-800 rounded-lg text-base'
            placeholder='Enter Thread URL'
            onChange={(e) => {
              setThread({ ...thread, url: e.target.value });
            }}
          />
        </div>
      </div>
      <br />
      <div
        tabIndex={0}
        className='collapse collapse-open border border-base-300 bg-base-100 rounded-box'>
        <div className='collapse-title text-xl font-medium'>Thread Summary</div>
        <div className='collapse-content'>
          {Object.keys(thread.details).length === 0 ? (
            <p>No summary to show</p>
          ) : (
            thread.details["thread_summary"]
          )}
        </div>
      </div>
      <div className='h-96 overflow-y-scroll text-center w-full space-y-4 checker-bg border border-base-300 rounded-lg px-3 py-2 border mt-3 justify-around gap-3'>
        <div className='collapse m-auto w-80 collapse-arrow'>
          <input type='checkbox' />
          <div className='collapse-title text-xl font-medium'>
            Reference/Links
          </div>
          <div className='collapse-content'>
            {Object.keys(thread.details).length === 0 ? (
              <p>Summarize a Thread to see the links associated with it </p>
            ) : (
              thread.details["references"]["urls"].map((item, id) => {
                return (
                  <div className='text-blue-600 dark:text-blue-500 hover:underline'>
                    <a href={item} target='blank' rel='noopener noreferrer'>
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
        ) : <Carousel thread={thread}/>}
      </div>
    </>
  );
}
