import React from "react";
import "../../css/RightComponents/RightUser.css"
import { useState, useEffect } from "react";
import photo from "../../images/twitter-default-profile.png"
import plus from "../../images/plus.svg"
import minus from "../../images/minus.svg"
import people from "../../images/people.svg"

export default function RightUser(props) {
    let default_profile_url = photo;
    const [profile_image_url, setProfile_image_url] = useState(default_profile_url);

    useEffect(() => {
        if (props.sentiments["profile_image_url"]) {
            setProfile_image_url(props.sentiments["profile_image_url"])
        } else {
            setProfile_image_url(default_profile_url)
        }
    }, [props])

    return (
        <>
            <div>
                <div className="h-auto w-full flex items-center border-gray-200  rounded-lg p-3 bg-zinc-800">
                    <div className="w-16 h-16 rounded-full bg-cover flex-none">
                        <img className="rounded-full" src={profile_image_url} />
                    </div>
                    <div className="ml-[5%]">
                        <h1 className="text-2xl font-bold">
                            {props.user.details['username']}
                        </h1>
                        <h1 className="text-sm font-light">
                            {props.user.details['followers_count']}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="h-1/3 w-full checker-bg flex flex-col items-start border-gray-200 rounded-lg p-3 border mt-4 justify-around	">
                <h1 className="text-2xl">Statistics</h1>
                <div className="flex w-full">
                    <div className="flex">
                        <div className="icon flex-none w-12 h-auto p-2.5 bg-blue-400 text-white rounded-full mr-3">
                            <img src={people} alt="people" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">{props.user.details['followers_count']}</div>
                            <div className="text-sm text-gray-400">Followers</div>
                        </div>
                    </div>
                    <div className="flex ml-[18%]">
                        <div className="icon flex-none w-12 h-auto p-2.5 bg-blue-400 text-white rounded-full mr-3">
                            <img src={people} alt="people" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">{}</div>
                            <div className="text-sm text-gray-400">Following</div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-start">
                    <div className="flex">
                        <div className="icon flex-none w-12 h-auto p-2.5 bg-green-500 text-white rounded-full mr-3">
                            <img src={plus} alt="+" className="flex-none" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">{props.user.details["pos_count"]}</div>
                            <div className="text-sm text-gray-400">Positive Tweets</div>
                        </div>
                    </div>
                    <div className="flex ml-[10%]">
                        <div className="icon flex-none w-12 h-auto p-2.5 bg-red-500 text-white rounded-full mr-3  ">
                            <img src={minus} alt="-" className="flex-none" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <div className="text-lg">{props.user.details["neg_count"]}</div>
                            <div className="text-sm text-gray-400">Negative Tweets</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wordclouds">
                {
                    props.wordclouds == "" ?
                        null :
                        <div className="wordcloud1">
                            <span>Things talked about</span>
                            <img
                                src={`data:image/png;base64,${JSON.parse(props.wordclouds["cloud_nouns"])}`} alt="wordcloud" />
                        </div>
                }

                {
                    props.wordclouds == "" ?
                        null :
                        <div className="wordcloud2">
                            <span>Names talked about</span>
                            <img
                                src={`data:image/png;base64,${JSON.parse(props.wordclouds["cloud_names"])}`} alt="wordcloud" />
                        </div>
                }
            </div>
        </>
    )
}