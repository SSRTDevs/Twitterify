import React from "react";


export default function RightTrend(props) {
    return (
        <>
            {
                props.trends.show_tweets.length === 0 ? "Nothing to show" :
                    props.trends.show_tweets.map((item) => {
                        return (
                            <div>
                                <div className="card">
                                    <div className="card-body">
                                        <p className="card-text" >
                                            {item}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }

        </>
    )
}