import { React } from "react";

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
        className='collapse border border-base-300 bg-base-100 rounded-box'>
        <div className='collapse-title text-xl font-medium'>Thread Summary</div>
        <div className='collapse-content'>
          {Object.keys(thread.details).length === 0 ? (
            <p>No summary to show</p>
          ) : (
            thread.details["thread_summary"]
          )}
        </div>
      </div>
      <div className='h-auto text-center w-full space-y-4 checker-bg border border-base-300 rounded-lg px-3 py-2 border mt-3 justify-around gap-3'>
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
        ) : (
          <div className='carousel w-96 h-96 m-auto rounded'>
            {thread.details["references"]["images"].map((item, id, images) => {
              return (
                <div
                  id={`slide${id + 1}`}
                  className='carousel-item relative w-full'>
                  <img size={20} src={item} className='w-full' alt="image_resource"/>
                  <div className='absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2'>
                    <a
                      href={`#slide${id === 0 ? images.length : id}`}
                      className='btn btn-circle'>
                      ❮
                    </a>
                    <a
                      href={`#slide${id + 2 > images.length ? 1 : id + 2}`}
                      className='btn btn-circle'>
                      ❯
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          // <div className='grid grid-flow-col'>
          //   <div className='col-start-auto gap-6 columns-3xs'>
          //     {thread.details["references"]["urls"].map((item, id) => {
          //       let randomNumber = Math.floor(Math.random() * 2);
          //       return (
          //         <div className='my-1'>
          //           <img
          //             className={`w-full rounded-xl ${
          //               randomNumber ? `aspect-video` : `aspect-square`
          //             }`}
          //             src={item}
          //             alt='thread-images'
          //           />
          //         </div>
          //       );
          //     })}
          //   </div>
          //   <div className='col-start-end'>
          //     {Object.keys(thread.details).length === 0 ? (
          //       <span style={{ textAlign: "left" }}>No references to show</span>
          //     ) : (
          //       thread.details["references"]["urls"].map((item, id) => {
          //         return (
          //           <div className='text-blue-600 dark:text-blue-500 hover:underline'>
          //             <a href={item} target='blank' rel='noopener noreferrer'>
          //               {item}
          //             </a>
          //           </div>
          //         );
          //       })
          //     )}
          //   </div>
          // </div>
        )}
      </div>
    </>
  );
}
