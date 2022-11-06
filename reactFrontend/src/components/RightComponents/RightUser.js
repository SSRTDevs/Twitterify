import React from "react";
import "../../css/RightComponents/RightUser.css"
import twitter_logo from '../../images/twitter_logo.png'
export default function RightUser(props) {
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
            <div>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio vero numquam fugiat eos. Cupiditate error minima accusamus debitis corporis provident, enim neque aut expedita. Accusamus qui autem ratione voluptatum sapiente.</div>
            <br />
            <br />
            <div style={{ fontSize: "1.7rem"}}>User Statistics</div>
            <br />
            <span style={{ fontSize: "1.3rem" }}>No of tweets: &nbsp;&nbsp;&nbsp;</span>
            <span style={{ fontSize: "1.3rem" }}>No of followers: &nbsp;&nbsp;&nbsp;</span>
            <br />
            <br />
            <span style={{ fontSize: "1.3rem" }}>Last Tweet Date: &nbsp;&nbsp;&nbsp;</span>
            <br />
            <br />
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="badge bg-success" style={{fontSize: "1.5rem"}}>Positive: </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="badge bg-danger" style={{fontSize: "1.5rem"}}>Negative: </span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      
            <span class="badge bg-warning" style={{fontSize: "1.5rem"}}>Neutral: </span>
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