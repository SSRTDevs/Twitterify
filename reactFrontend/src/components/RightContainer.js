import React from 'react';
import '../css/RightContainer.css'
import pos from '../images/positive.png'
import neutral from '../images/neutral.png'
import neg from '../images/negative.png'

export default function RightContainer(props) {

    // console.log(props.sentiments["Tweet"])
    if (props.Component === "general")
        return (
            <div className="right-container">
                Hello
            </div>
        )
    else if (props.Component == "user-summarizer")
        return (
            <div className="right-container">
                {props.sentiments === "" ? "Nothing to display" :
                    Object.keys(props.sentiments["Tweet"]).map((index, key) => {
                        console.log(props.sentiments);
                        return (
                            <div className="card w-75">
                                <div className="card-body">
                                    <p className="card-text">{props.sentiments["Tweet"][key]}.</p>
                                    <p className="status">{props.sentiments["Sentiment"][key]} : {props.sentiments["Subjectivity"][key]}</p>
                                    {
                                        props.sentiments["Sentiment"][key] == "pos" ?
                                            <img width={50} src={pos} /> :
                                            (props.sentiments["Sentiment"][key] == "neutral" ?
                                                <img width={50} src={neutral} /> :
                                                <img width={50} src={neg} />)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    else
        return (
            <div className="right-container">

            </div>
        )
}