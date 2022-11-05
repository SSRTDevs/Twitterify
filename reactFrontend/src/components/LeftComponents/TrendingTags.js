import React from 'react'

function TrendingTags(props) {
  return (
    <>
    <span style={{textAlign: 'left', textDecoration:"underline"}}>{props.trend_data.hashtag} </span> &nbsp; &nbsp;
    </>
  )
}

export default TrendingTags