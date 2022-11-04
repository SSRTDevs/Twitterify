import React, {  useEffect} from 'react';
import TrendingCard from './SubComponents/TrendingCard';
import '../css/LeftContainer.css'
import TrendingTags from './SubComponents/TrendingTags';

export default function General() {
    const trend_data = [
        {
            hashtag: "#KingKohli",
            summary: "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.",
            positive: "88%",
            negative: "10%",
            neutral: "2%"
        },
        {
            hashtag: "#KingKohli",
            summary: "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.",
            positive: "88%",
            negative: "10%",
            neutral: "2%"
        },
        {
            hashtag: "#KingKohli",
            summary: "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.",
            positive: "88%",
            negative: "10%",
            neutral: "2%"
        },
        {
            hashtag: "#KingKohli",
            summary: "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.",
            positive: "88%",
            negative: "10%",
            neutral: "2%"
        }
    ]
    var trending_data_summary = trend_data.map((item) => (
        <TrendingCard trend_data={item} />
    ))
    var trending_tags = trend_data.map((item) => (
        <TrendingTags trend_data={item} />
    ))
    useEffect(() => {
        trending_data_summary = trend_data.map((item) => (
            <TrendingCard trend_data={item} />
        ))
        trending_tags = trend_data.map((item) => (
            <TrendingTags trend_data={item} />
        ))
    });
    return (
        <>
            <div className='heading'>Trending Today</div>
            <br />
            <div className='trending'>{trending_tags}</div>
            {trending_data_summary}
        </>
    )
}