import React, { useState, useEffect } from 'react';
import { TrendingCard, TrendingTags } from '../index'
import '../../css/LeftContainer.css'

export default function Trending(props) {
    const [trend_data, setTrenddata] = useState([])

    useEffect(() => {
        // //Runs only on the first render
        let data = [{ "hashtag": "#KingKohli", "summary": "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.", "positive": "88%", "negative": "10%", "neutral": "2%" }, { "hashtag": "#KingKohli", "summary": "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.", "positive": "88%", "negative": "10%", "neutral": "2%" }, { "hashtag": "#KingKohli", "summary": "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.", "positive": "88%", "negative": "10%", "neutral": "2%" }, { "hashtag": "#KingKohli", "summary": "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.", "positive": "88%", "negative": "10%", "neutral": "2%" }]
        setTrenddata(data)
    }, []);

    return (
        <>
            <div className='heading'>Trending Today</div>
            <br />
            <div className='trending'>{
                trend_data.map((item) => (
                    <TrendingTags trend_data={item} />
                ))}
            </div>
            {
                trend_data.map((item) => (
                    <TrendingCard
                        trend_data={item}
                        display_tweets={props.display_tweets}
                        show_tweets={props.show_tweets}
                    />
                ))
            }
        </>
    )
}