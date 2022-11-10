import { React } from 'react';
import '../css/RightContainer.css'
import { RightTrend, RightThread, RightUser } from "./index"


export default function RightContainer(props) {
    if (props.Component === "general") {
        return (
            <div className="right-container">
                {
                    props.show_tweets === "" ? "Nothing to show" :
                        props.show_tweets.map((item) => (
                            <RightTrend show_tweets={item} />
                        ))}
            </div>
        )
    }

    else if (props.Component === "user-summarizer")
        return (
            <div className="right-container">
                <RightUser {...props} />
            </div>
        )
    else
        return (
            <div className="right-container">
                <RightThread
                    thread={props.thread} />
            </div>
        )
}