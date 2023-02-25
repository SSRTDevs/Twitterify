import React from "react";

function TrendingTags({ hashtag }) {
  const smoothScroll = () => {
    const element = document.getElementById(hashtag);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <a
        className='w-full text-sm'
        style={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={smoothScroll}>
        {hashtag.replaceAll(" ", "_")}{" "}
      </a>
    </>
  );
}
// #ffffff40
function TrendingCard({ index, trend, hashtag, setReadTweets }) {
  return (
    <>
      <div>
        <div id={`${hashtag}`} className='card shadow-md'>
          <div className='card-body p-5 space-y-1'>
            <div className='topbar w-full flex justify-between '>
              <h5 className='card-title w-fit'>{hashtag}</h5>
              <p className='text-sm text-right w-fit text-gray-400 hover:text-gray-300'>
                {trend.topic_tweet_count} tweets posted
              </p>
            </div>

            <h6 className='card-subtitle text-muted'>Cricket</h6>
            {/* <h6 className="card-subtitle">
                            Sentiment Stats: &nbsp; &nbsp;
                            <span style={{ color: "green" }}>Pos: {trend.pos} &nbsp; &nbsp;</span>
                            <span style={{ color: "red" }}>Neg: {trend.neg} &nbsp; &nbsp;</span>
                            <span style={{ color: "yellow" }}>Neutral: {trend.neu} &nbsp; &nbsp;</span>
                        </h6> */}

            <p className='card-text'>{trend.summary}</p>

            <div className="endbar flex justify-between w-full">
                <p className="text-xs text-left">{trend.time_stamp}</p>
            <a
              style={{
                textAlign: "right",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                setReadTweets(index);
              }}>
              Read Tweets
            </a>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

TrendingCard.Tags = TrendingTags;
export default TrendingCard;
