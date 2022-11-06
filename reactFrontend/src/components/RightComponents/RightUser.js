import React from "react";
import pos from '../../images/positive.png'
import neutral from '../../images/neutral.png'
import neg from '../../images/negative.png'
import "../../css/RightComponents/RightUser.css"

export default function RightUser(props) {
    return (
        <>
            {props.sentiments === "" ? "Nothing to display" :
                Object.keys(props.sentiments["sentiments"]["Tweet"]).map((index, key) => {
                    return (
                        <div className="card w-75">
                            <div data-aos="fade-left" className="card-body">
                                <p className="card-text">{props.sentiments["sentiments"]["Tweet"][key]}.</p>
                                <p className="status">{props.sentiments["sentiments"]["Sentiment"][key]} : {props.sentiments["sentiments"]["Subjectivity"][key]}</p>
                                {
                                    props.sentiments["sentiments"]["Sentiment"][key] == "pos" ?
                                        <img width={50} src={pos} /> :
                                        (props.sentiments["sentiments"]["Sentiment"][key] == "neutral" ?
                                            <img width={50} src={neutral} /> :
                                            <img width={50} src={neg} />)
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}