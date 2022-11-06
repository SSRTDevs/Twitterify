import React from "react";
import twitter_logo from '../../images/twitter_logo.png'
export default function RightThread() {
    return (
        <>
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand" >
                <img style={{width: "5%", textAlign: "left",alignItems:"flex-start !important"}}src={twitter_logo} alt="Logo"></img>
                    &nbsp; &nbsp;
                    Username
                </a>
            </nav>
            <br />
            <br />
            <br />
            <div style={{ fontSize: "1.7rem"}}>Thread Statistics</div>
            <br />
            <span style={{ fontSize: "1.3rem" }}>No of tweets in thread: &nbsp;&nbsp;&nbsp;</span>
            <span style={{ fontSize: "1.3rem" }}>No of replies: &nbsp;&nbsp;&nbsp;</span>
            <br />
            <br />
            <span style={{ fontSize: "1.3rem" }}>Thread Sentiment: &nbsp;&nbsp;&nbsp;</span><span class="badge bg-success" style={{ fontSize: "1.5rem" }}>Positive</span>
            <br />
            <br />
            <span style={{ fontSize: "1.3rem" }}>No of likes: &nbsp;&nbsp;&nbsp;</span>
            <br />
            <br />
            <div className="card">
                <div className="card-header" style={{fontSize: "1.5rem"}}>
                    Replies
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                </ul>
            </div>
        </>
    )
}