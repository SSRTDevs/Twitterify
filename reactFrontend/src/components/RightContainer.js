import { React, useEffect } from 'react';
import '../css/RightContainer.css'
import { RightTrend, RightThread, RightUser } from "./index"


export default function RightContainer(props) {


    if (props.Component === "general")
        return (
            <div className="right-container">
                <RightTrend />
            </div>
        )
    else if (props.Component == "user-summarizer")
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