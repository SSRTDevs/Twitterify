import { React } from 'react';
import '../css/RightContainer.css'
import { RightTrend, RightThread, RightUser } from "./index"


export default function RightContainer(props) {
    if (props.Component === "general") {
        if (props.show_tweets !== "") {
            var trending_tweets;
            try {
                trending_tweets = props.show_tweets.map((item) => (
                    <RightTrend
                        show_tweets={item}
                    />
                ))
            } catch (e) {
                console.log("Error mila in right container trends")
            }
            return (
                <div className="right-container">
                    {trending_tweets}
                </div>
            )
        }
        else{
            return (
                <div className="right-container">
                    Nothing to show
                </div>
            )
        }
    }
    else if (props.Component === "user-summarizer")
        return (
            <div className="right-container">
                <RightUser
                    sentiments={props.sentiments} />
            </div>
        )
    else
        return (
            <div className="right-container">
                <RightThread />
            </div>
        )
}