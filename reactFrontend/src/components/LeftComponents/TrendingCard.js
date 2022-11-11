import React from 'react'

function TrendingCard(props) {
    return (
        <>
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{props.trend_data.hashtag}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Cricket</h6>
                        <h6 className="card-subtitle">
                            Sentiment Stats: &nbsp; &nbsp;
                            <span style={{ color: "green" }}>Pos: {props.trend_data.pos} &nbsp; &nbsp;</span>
                            <span style={{ color: "red" }}>Neg: {props.trend_data.neg} &nbsp; &nbsp;</span>
                            <span style={{ color: "yellow" }}>Neutral: {props.trend_data.neu} &nbsp; &nbsp;</span>
                        </h6>
                        <br />
                        <p className="card-text" >{props.trend_data.summary}</p>
                        <div style={{ textAlign: "right", textDecoration: "underline", cursor: "pointer" }} onClick={() => {
                            props.setShowtweets(props.trend_data.tweets)
                        }}>Read Tweets</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TrendingCard