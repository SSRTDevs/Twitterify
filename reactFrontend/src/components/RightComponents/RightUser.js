import { React } from "react";
import "../../css/RightComponents/RightUser.css"
export default function RightUser(props) {

    return (
        <>
            <nav className="navbar navbar-light bg-dark">
                <a className="navbar-brand" >
                    <img style={{ textAlign: "left", alignItems: "flex-start !important" }} src={props.user.details["profile_image_url"]} alt="Logo"></img>
                    &nbsp; &nbsp;
                    {props.user.details['username']}
                </a>
            </nav>
            <br />
            <br />
            <div>{props.user.details['description']}</div>
            <br />
            <br />
            <div style={{ fontSize: "1.7rem" }}>User Statistics</div>
            <hr />
            <span style={{ fontSize: "1.3rem" }}>
                No of followers: &nbsp;{props.user.details['followers_count']}&nbsp;
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
            <span class="badge bg-success" style={{ fontSize: "1.2rem" }}>Positive: {props.user.details["pos_count"]}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="badge bg-danger" style={{ fontSize: "1.2rem" }}>Negative: {props.user.details["neg_count"]}</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="badge bg-warning" style={{ fontSize: "1.2rem" }}>Neutral: {props.user.details["neutral_count"]}</span>
            <div className="wordclouds">
                {
                    props.user.clouds === "" ?
                        null :
                        <div className="wordcloud1">
                            <span>Things talked about</span>
                            <img
                                src={`data:image/png;base64,${JSON.parse(props.user.clouds["cloud_nouns"])}`} alt="wordcloud" />
                        </div>
                }

                {
                    props.user.clouds === "" ?
                        null :
                        <div className="wordcloud2">
                            <span>Names talked about</span>
                            <img
                                src={`data:image/png;base64,${JSON.parse(props.user.clouds["cloud_names"])}`} alt="wordcloud" />
                        </div>
                }
            </div>
        </>
    )
}