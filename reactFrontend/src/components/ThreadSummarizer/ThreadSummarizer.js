import { React } from "react";

export default function ThreadSummarizer({ thread, setThread }) {
<<<<<<< HEAD
    return (
        <>
            <div className="container mx-auto w-[75%]">
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
            <br />
            <div className="card w-full bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Thread Summary</h2>
                    <p>
                        {Object.keys(thread.details).length === 0 ? (
                            <p>No summary to show</p>
                        ) : (
                            thread.details["thread_summary"]
                        )}
                    </p>
                </div>
            </div>
            {/* <div className='h-auto w-full checker-bg flex flex-col items-start border-gray-200 rounded-lg px-3 py-2 border mt-3 justify-around gap-3'>
=======
  console.log("Thread Summarizer rendered again");
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
      <div className='card w-full bg-neutral text-neutral-content'>
        <div className='card-body items-center text-center'>
          <h2 className='card-title'>Thread Summary</h2>
          <p>
            {Object.keys(thread.details).length === 0 ? (
              <p>No summary to show</p>
            ) : (
              thread.details["thread_summary"]
            )}
          </p>
        </div>
      </div>
      {/* <div className='h-auto w-full checker-bg flex flex-col items-start border-gray-200 rounded-lg px-3 py-2 border mt-3 justify-around gap-3'>
>>>>>>> 8551472537834ffd3fa2d2539ac1a6a58b9d9ece
        <div className='w-full'>
          <div className='text-2xl'>Thread Summary</div>
        </div>
        <p className='card-text text-md bg-[#f4f4f40f] p-2.5 rounded-sm'>
          {Object.keys(thread.details).length === 0 ? (
            <p>No summary to show</p>
          ) : (
            thread.details["thread_summary"]
          )}
        </p>
      </div> */}
            <div className="h-auto w-full checker-bg border-gray-200 rounded-lg px-3 py-2 border mt-3 justify-around gap-3">
                <div className="w-full">
                    <div className="text-2xl">References</div>
                </div>
                {Object.keys(thread.details).length === 0 ? (
                    <span style={{ textAlign: "left" }}>No references to show</span>
                ) : (
                    <div className="grid grid-flow-col">
                        <div className="col-start-auto gap-6 columns-3xs">
                            {thread.details["references"].map((item, id) => {
                                let randomNumber = Math.floor(Math.random() * 2);
                                return (
                                    <div className="my-1">
                                        <img
                                            className={`w-full rounded-xl ${
                                                randomNumber ? `aspect-video` : `aspect-square`
                                            }`}
                                            src={item}
                                            alt="thread-images"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="col-start-end">
                            {Object.keys(thread.details).length === 0 ? (
                                <span style={{ textAlign: "left" }}>No references to show</span>
                            ) : (
                                thread.details["references"].map((item, id) => {
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
                )}
            </div>
        </>
    );
}

// <div className="text-white bg-[#ffffff78] w-10 h-10 p-1.5 rounded-[50%]">
//     <a className="" href={item}>
//     <img src={link} alt="links" />
// </a>
// </div>
