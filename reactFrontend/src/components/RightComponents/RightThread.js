import React from "react";
import twitter_logo from '../../images/twitter_logo.png'
export default function RightThread(props) {
    return (
        <>
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand" >
                    <img style={{ textAlign: "left", alignItems: "flex-start !important" }} src={props.thread['profile_image_url']} alt="Logo"></img>
                    &nbsp; &nbsp;
                    {props.thread['username']}
                </a>
            </nav>
            <br />
            <br />
            <br />
            <div style={{ fontSize: "1.7rem" }}>Thread Statistics</div>
            <hr />
            <span style={{ fontSize: "1.3rem" }}>
                No of tweets in thread: &nbsp;{props.thread["thread_tweets"] === undefined ? 0 : props.thread["thread_tweets"].length};&nbsp;
            </span>
            <span style={{ fontSize: "1.3rem" }}>
                No of replies: &nbsp;{props.thread["reply_tweets"] === undefined ? 0 : props.thread["reply_tweets"].length}&nbsp;
            </span>
            <br />
            <br />
            <span style={{ fontSize: "1.3rem" }}>Thread Sentiment: &nbsp;&nbsp;&nbsp;</span><span class="badge bg-success" style={{ fontSize: "1.5rem" }}>Positive</span>
            <br />
            <br />
            <span style={{ fontSize: "1.3rem" }}>No of likes: &nbsp;&nbsp;&nbsp;</span>
            <br />
            <br />
            <div className="card">
                <div className="card-header" style={{ fontSize: "1.5rem" }}>
                    Replies
                </div>
                <ul className="list-group list-group-flush">
                    {
                        Object.keys(props.thread).length === 0 ?
                            <li className="list-group-item">No replies yet</li> :
                            props.thread["reply_tweets"].map((item, key) => {
                                return <li className="list-group-item">{item}</li>
                            })

                    }
                </ul>
            </div>
        </>
    )
}