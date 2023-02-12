import React, {  useEffect } from 'react';
import { TrendingCard, TrendingTags } from '../index'
import '../../css/LeftContainer.css'

export default function Trending({trends, setTrends}) {

    useEffect(() => {
        // Runs only on the first render
        // trending();
    }, []);

    return (
        <>
            <div className='heading'>Trending Today</div>
            <br />
            <div className='trending'>{
                Object.keys(trends.latest_trends).map((item) => (
                    <TrendingTags hashtag={item} />
                ))}
            </div>
            {
                Object.keys(trends.latest_trends).map((key) => (
                    <TrendingCard
                        hashtag={key}
                        trends={trends}
                        setTrends={setTrends}
                    />
                ))
            }
        </>
    )
}