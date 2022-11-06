import React from 'react';
import '../css/LeftContainer.css'
import { Trending, ThreadSummarizer, UserSummarizer } from "./index"

export default function LeftContainer(props) {
    return (
        <div className="left-container">
            {
                props.Component === "general" ?
                    <Trending
                        display_tweets={props.display_tweets}
                        show_tweets={props.show_tweets}
                    /> :
                    (props.Component === "thread-summarizer" ?
                        <ThreadSummarizer
                            seturl={props.seturl}
                            thread={props.thread} /> :
                        <UserSummarizer
                            wordclouds={props.wordclouds}
                            tweets={props.tweets}
                            settweets={props.settweets}
                            setUsername={props.setUsername}
                            sentiments={props.sentiments} />)
            }
        </div>
    )
}