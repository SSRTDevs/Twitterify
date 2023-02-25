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
        <a className='w-full'
        style={{ textDecoration: "underline", cursor: "pointer", }} 
        onClick={smoothScroll}
        >{hashtag.replaceAll(" ","_")} </a>
      </>
    )
  }
function TrendingCard({index, trend, hashtag, setReadTweets}) {
    return (
        <>
            <div>
                <div id={`${hashtag}`} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{hashtag}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Cricket</h6>
                        <h6 className="card-subtitle">
                            Sentiment Stats: &nbsp; &nbsp;
                            <span style={{ color: "green" }}>Pos: {trend.pos} &nbsp; &nbsp;</span>
                            <span style={{ color: "red" }}>Neg: {trend.neg} &nbsp; &nbsp;</span>
                            <span style={{ color: "yellow" }}>Neutral: {trend.neu} &nbsp; &nbsp;</span>
                        </h6>
                        <br />
                        <p className="card-text" >
                            {trend.summary}
                        </p>
                        <div style={{ textAlign: "right", textDecoration: "underline", cursor: "pointer" }}
                            onClick={() => {
                                setReadTweets(index);
                            }}>Read Tweets</div>
                    </div>
                </div>
            </div>
        </>
    )
}

TrendingCard.Tags = TrendingTags;
export default TrendingCard ;