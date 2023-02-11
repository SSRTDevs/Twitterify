import React, {  useEffect } from 'react';
import { TrendingCard, TrendingTags } from '../index'
import '../../css/LeftContainer.css'

export default function Trending(props) {

    useEffect(() => {
        // //Runs only on the first render
        // props.trending();
    }, []);

    return (
        <>
            <div className='heading'>Trending Today</div>
            <br />
            <div className='trending'>{
                Object.keys(props.trends.latest_trends).map((item) => (
                    <TrendingTags hashtag={item} />
                ))}
            </div>
            {
                Object.keys(props.trends.latest_trends).map((key) => (
                    <TrendingCard
                        hashtag={key}
                        trends={props.trends}
                        setTrends={props.setTrends}
                    />
                ))
            }
        </>
    )
}