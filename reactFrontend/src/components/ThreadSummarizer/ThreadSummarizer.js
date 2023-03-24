import { React } from "react";
import { RightThread, Threadtabs, InputWithBtn } from "../";
import { Breakpoint } from "react-socks";
import { thread_summarizer } from "../../api/Api";
import { ImAngry } from "react-icons/im";
import { BsEmojiFrown, BsEmojiNeutral, BsEmojiDizzy } from "react-icons/bs";
import { FaRegSadCry, FaRegSurprise } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
// import '../../css/RightComponents/RightThread.css'

const EmotionIcon = ({ emotion, className = "" }) => {
  return (
    <>
      <div className="tooltip tooltip-top p-4" data-tip={emotion}>
        {emotion === "anger" && <ImAngry className={`text-red-500 ${className}`} size={30} />}
        {emotion === "fear" && <BsEmojiFrown className={`text-yellow-500 ${className}`} size={30} />}
        {emotion === "neutral" && (
          <BsEmojiNeutral className={`text-orange-500 ${className}`} size={30} />
        )}
        {emotion === "sadness" && (
          <FaRegSadCry className={`text-gray-400 ${className}`} size={30} />
        )}
        {emotion === "joy" && <BiHappy className={`text-green-500 ${className}`} size={35} />}
        {emotion === "surprise" && (
          <FaRegSurprise className={`text-pink-500 ${className}`} size={30} />
        )}
        {emotion === "disgust" && (
          <BsEmojiDizzy className={`text-green-800 ${className}`} size={30} />
        )}
      </div>
    </>
  );
};

export default function ThreadSummarizer({ thread, setThread }) {
  const removeSlug = (url) => {
    url = url.split("?")[0];
    return url;
  };

  return (
    <>
      <div className="container mx-auto w-[75%] h-1/10">
        <div>
          <Breakpoint small down>
            <InputWithBtn run={() => thread_summarizer(thread,setThread)} placeholder="Thread URL..."/>
          </Breakpoint>
          <Breakpoint medium up>
          <input
            type="search"
            id="default-search"
            className="block p-3 py-2 pl-10 w-full text-sm bg-neutral-800 rounded-lg"
            placeholder="Enter Thread URL"
            onChange={(e) => {
              setThread({ ...thread, url: removeSlug(e.target.value) });
            }}
          />
          </Breakpoint>
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
          <div
            className={`collapse-content text-left min-h-[100px] mx-4  ${
              thread.details["thread_summary"] === ""
                ? "animate-pulse bg-[#4e4b4b] rounded"
                : ""
            }`}
          >
            {Object.keys(thread.details).length === 0 ? (
              <p>No summary to show</p>
            ) : (
              thread.details["thread_summary"]
            )}
          </div>
          <div className="flex justify-between w-1/4 mx-auto">
          {thread.details.common_emotions.map((emo, index) => {
            return <EmotionIcon emotion={emo[0]} className="" />;
          })}
        </div>
        </div>

        <div className="text-center w-full space-y-4 px-3 py-2 mt-3 justify-around gap-3">
          <Threadtabs references={thread.details["references"]} />
        </div>
      </div>
      <Breakpoint small down>
        <br />
        <RightThread thread={thread} />
      </Breakpoint>
    </>
  );
}
