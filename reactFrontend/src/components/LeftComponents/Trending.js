import React, {useState, useEffect} from 'react';
import TrendingCard from './TrendingCard';
import '../../css/LeftContainer.css'
import TrendingTags from './TrendingTags';

export default function Trending(props) {
    const [trend_data, setTrenddata] = useState("")
    var trending_data_summary;
    var trending_tags;
    try{
        trending_data_summary = trend_data.map((item) => (
            <TrendingCard 
            trend_data = {item}
            display_tweets={props.display_tweets}
            show_tweets={props.show_tweets}
            />
        ))
        trending_tags = trend_data.map((item) => (
            <TrendingTags trend_data = {item} />
        ))
    }catch(e){
        console.log("Error mila")
    }

    useEffect(() => {
        // //Runs only on the first render
        let data = '[{"hashtag": "#KingKohli","summary": "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.","positive": "88%","negative": "10%","neutral": "2%"},{"hashtag": "#KingKohli","summary": "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.","positive": "88%","negative": "10%","neutral": "2%"},{"hashtag": "#KingKohli","summary": "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.","positive": "88%","negative": "10%","neutral": "2%"},{"hashtag": "#KingKohli","summary": "Virat Kohli is an Indian international cricketer and former captain of the India national cricket team. He plays for Delhi in domestic cricket and Royal Challengers Bangalore in the Indian Premier League as a right-handed batsman. Kohli made his Test debut in 2011.","positive": "88%","negative": "10%","neutral": "2%"}]'
        let json_data = JSON.parse(data)
        setTrenddata(json_data)
      }, []);

    return (
        <>
            <div className='heading'>Trending Today</div>
            <br />
            <div className='trending'>{trending_tags}</div>
            {trending_data_summary}
        </>
    )
}