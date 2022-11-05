import React from "react";

export default function RightTrend(props) {
    return (
        <>
        <div>
                <div className="card">
                    <div className="card-body">
                        <p className="card-text" >{props.show_tweets.tweet}</p>
                    </div>
                </div>
            </div>
        </>
    )
}