import React from 'react';
import '../css/LeftContainer.css'
import { Trending, ThreadSummarizer, UserSummarizer } from "./index"

export default function LeftContainer(props) {
    return (
        <div className="left-container">
            {
                props.Component === "general" ?
                    <Trending /> :
                    (props.Component === "thread-summarizer" ?
                        <ThreadSummarizer /> :
                        <UserSummarizer
                            wordclouds={props.wordclouds}
                            tweets={props.tweets}
                            settweets={props.settweets}
                            setUsername={props.setUsername} />)
            }
        </div>
    )
}