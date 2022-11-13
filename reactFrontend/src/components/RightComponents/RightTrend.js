import React from "react";

export default function RightTrend(props) {
    return (
        <>
            {
                props.show_tweets === "" ? "Nothing to show" :
                    props.show_tweets.map((item) => {
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