import React from "react";
import tweet_cnt from '../../images/tweet_cnt.png'
import sentiment from '../../images/sentiment.png'
import '../../css/RightComponents/RightThread.css'

export default function RightThread(props) {
    return (
        <>
            <div>
                <div className="h-auto w-full flex items-center border-black-700  rounded-lg p-2  bg-neutral-800">
                    <div className="w-14 h-auto rounded-full bg-cover flex-none">
                        <img className="rounded-full w-[100%]" src={props.thread.details["profile_image_url"]} />
                    </div>
                    <div className="ml-[5%]">
                        <h1 className="text-2xl font-bold">
                            {props.thread.details['username']}
                        </h1>
                    </div>
                </div>
            </div>

            <br />

            <div className="h-auto w-full checker-bg flex flex-col items-start border-gray-200 rounded-lg px-3 py-2 border mt-3 justify-around gap-3">
                <div className="w-full">
                    <div className="text-2xl">Statistics</div>
                </div>
                <div className="flex w-full justify-around">
                    <div className="flex flex-1 items-center">
                        <div className="icon flex-none w-10 h-10 p-px  text-white rounded-full mr-3">
                            <img src={tweet_cnt} alt="tweet_cnt" />
                        </div>
                        <div className="flex flex-col justify-center content-center">

                            <div className="text-lg leading-4">
                                {props.thread.details["thread_tweets"] === undefined ? '' :
                                    props.thread.details["thread_tweets"].length}
                            </div>
                            <div className="text-sm text-gray-400">Tweets Length</div>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center">
                        <div className="icon flex-none w-10 h-10 p-px text-white rounded-full mr-3">
                            <img src={sentiment} alt="sentiment" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg leading-4">
                                Positive
                            </div>
                            <div className="text-sm text-gray-400">Sentiment</div>
                        </div>
                    </div>
                </div>
            </div>


            <br />

            <div className="h-auto w-full checker-bg flex flex-col items-start border-gray-200 rounded-lg px-3 py-2 border mt-3 justify-around gap-3">
                <div className="w-full">
                    <div className="text-2xl">Replies</div>
                </div>
                <div className="reply-div">
                    {
                        Object.keys(props.thread.details).length === 0 ?
                            <p className="replies text-lg hover:bg-[#f4f4f40f]">
                                No replies yet </p> :
                            props.thread.details["reply_tweets"].map((item, key) => {
                                return <p className="replies text-md border border-x-0 border-gray-700 hover:bg-[#f4f4f40f]">{item}</p>
                            })

                    }
                </div>
            </div>
        </>
    )
}