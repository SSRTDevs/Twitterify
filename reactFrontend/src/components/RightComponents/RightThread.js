import React from "react";
import twitter_logo from '../../images/twitter_logo.png'
import '../../css/RightComponents/RightThread.css'


export default function RightThread(props) {
    return (
        <>
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand" >
                    <img style={{ textAlign: "left", alignItems: "flex-start !important" }} src={props.thread.details['profile_image_url']} alt="Logo"></img>
                    &nbsp; &nbsp;
                    {props.thread.details['username']}
                </a>
            </nav>
            <br />
            <br />
            <div style={{ fontSize: "1.7rem" }}>Thread Statistics</div>
            <hr />
            <span style={{ fontSize: "1rem" }}>
                No of tweets in thread: &nbsp;{props.thread.details["thread_tweets"] === undefined ? 0 : props.thread.details["thread_tweets"].length}&nbsp;
            </span>
            <br />
            {/* <span style={{ fontSize: "1.3rem" }}>
                No of replies: &nbsp;{props.thread["reply_tweets"] === undefined ? 0 : props.thread["reply_tweets"].length}&nbsp;
            </span> */}
            <br />
            <span style={{ fontSize: "1rem" }}>Thread Sentiment: &nbsp;&nbsp;&nbsp;</span><span class="badge bg-success" style={{ fontSize: "1rem" }}>Positive</span>
            <br />
            <br />
            <div style={{ fontSize: "1.7rem" }}>Replies</div>
            <hr />
            <div className="reply-div">
                {
                    Object.keys(props.thread.details).length === 0 ?
                        <li className="replies">No replies yet</li> :
                        props.thread.details["reply_tweets"].map((item, key) => {
                            return <p className="replies">{item}</p>
                        })

                }
            </div>
        </>
    )
}