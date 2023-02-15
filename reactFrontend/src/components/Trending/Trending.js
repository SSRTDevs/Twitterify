import React, {  useEffect } from 'react';
import { TrendingCard, TrendingTags } from '../index'

export default function Trending({trends, setTrends}) {

    useEffect(() => {
        // Runs only on the first render
        // trending();
    }, []);

    return (
        <>
            <div className='heading text-xl'>Trending Today</div>
            <br />
            <div className='trending'>{
                Object.keys(trends.latest_trends).map((item,idx) => (
                    <TrendingTags key={idx} hashtag={item} />
                ))}
            </div>
            {
                Object.keys(trends.latest_trends).map((key,idx) => (
                    <TrendingCard
                        key={idx}
                        hashtag={key}
                        trends={trends}
                        setTrends={setTrends}
                    />
                ))
            }
        </>
    )
}