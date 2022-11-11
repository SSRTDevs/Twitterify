import { React } from 'react';
import '../css/RightContainer.css'
import { RightTrend, RightThread, RightUser } from "./index"


export default function RightContainer(props) {
    return (
        <div className="right-container">
            {
                props.Component === "general" ?
                    <RightTrend {...props} /> :
                    props.Component === "thread-summarizer" ?
                        <RightUser {...props} /> :
                        <RightThread {...props} />
            }
        </div>
    )
}