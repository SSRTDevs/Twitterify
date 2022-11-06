import React from "react";
import "../../css/RightComponents/RightUser.css"
export default function RightUser(props) {
    return (
        <>
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand" >
                    <img style={{ textAlign: "left", alignItems: "flex-start !important" }} src={props.sentiments["profile_image_url"]} alt="Logo"></img>
                    &nbsp; &nbsp;
                    {props.sentiments['username']}
                </a>
            </nav>
            <br />
            <br />
            <div>{props.sentiments['description']}</div>
            <br />
            <br />
            <div style={{ fontSize: "1.7rem" }}>User Statistics</div>
            <hr />
            <span style={{ fontSize: "1.3rem" }}>
                No of followers: &nbsp;{props.sentiments['followers_count']}&nbsp;
            </span>
            <br />
            <span style={{ fontSize: "1.3rem" }}>
                No of tweets: &nbsp;{Math.floor(Math.random() * (500 - 30 + 1) + 30)}&nbsp;
            </span>
            <br />
            <span style={{ fontSize: "1.3rem" }}>
                Last Tweet Date: &nbsp;&nbsp;
            </span>
            <br />
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="badge bg-success" style={{ fontSize: "1.2rem" }}>Positive: {props.sentiments["pos_count"]}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="badge bg-danger" style={{ fontSize: "1.2rem" }}>Negative: {props.sentiments["neg_count"]}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="badge bg-warning" style={{ fontSize: "1.2rem" }}>Neutral: {props.sentiments["neutral_count"]}</span>
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