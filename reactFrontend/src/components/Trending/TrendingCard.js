import React from 'react'

function TrendingTags({hashtag}) {
    const smoothScroll = () => {
        const element = document.getElementById(hashtag);
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
      <>
        <a 
        style={{ textAlign: 'left', textDecoration: "underline", cursor: "pointer" }} 
        onClick={smoothScroll}
        >{hashtag} </a> &nbsp; &nbsp;
      </>
    )
  }
function TrendingCard({trends, hashtag, setTrends}) {
    return (
        <>
            <div>
                <div id={`${hashtag}`} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{hashtag}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Cricket</h6>
                        <h6 className="card-subtitle">
                            Sentiment Stats: &nbsp; &nbsp;
                            <span style={{ color: "green" }}>Pos: {trends.latest_trends.pos} &nbsp; &nbsp;</span>
                            <span style={{ color: "red" }}>Neg: {trends.latest_trends.neg} &nbsp; &nbsp;</span>
                            <span style={{ color: "yellow" }}>Neutral: {trends.latest_trends.neu} &nbsp; &nbsp;</span>
                        </h6>
                        <br />
                        <p className="card-text" >
                            {trends.latest_trends[hashtag].summary}
                        </p>
                        <div style={{ textAlign: "right", textDecoration: "underline", cursor: "pointer" }}
                            onClick={() => {
                                setTrends({
                                    ...trends,
                                    'show_tweets': trends.latest_trends[hashtag].tweets
                                })
                            }}>Read Tweets</div>
                    </div>
                </div>
            </div>
        </>
    )
}

TrendingCard.Tags = TrendingTags;
export default TrendingCard ;