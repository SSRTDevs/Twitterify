import React from 'react'

function TrendingCard(props) {
    return (
        <>
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{props.hashtag}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Cricket</h6>
                        <h6 className="card-subtitle">
                            Sentiment Stats: &nbsp; &nbsp;
                            <span style={{ color: "green" }}>Pos: {props.trends.latest_trends.pos} &nbsp; &nbsp;</span>
                            <span style={{ color: "red" }}>Neg: {props.trends.latest_trends.neg} &nbsp; &nbsp;</span>
                            <span style={{ color: "yellow" }}>Neutral: {props.trends.latest_trends.neu} &nbsp; &nbsp;</span>
                        </h6>
                        <br />
                        <p className="card-text" >
                            {props.trends.latest_trends[props.hashtag].summary}
                        </p>
                        <div style={{ textAlign: "right", textDecoration: "underline", cursor: "pointer" }}
                            onClick={() => {
                                props.setTrends({
                                    ...props.trends,
                                    'show_tweets': props.trends.latest_trends[props.hashtag].tweets
                                })
                            }}>Read Tweets</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendingCard