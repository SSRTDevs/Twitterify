import React, { useState, useEffect } from 'react';
import { TrendingCard, TrendingTags } from '../index'
import '../../css/LeftContainer.css'

export default function Trending(props) {

    useEffect(() => {
        // //Runs only on the first render
        props.trending();
    }, []);

    return (
        <>
            <div className='heading'>Trending Today</div>
            <br />
            <div className='trending'>{
                Object.keys(props.trends).map((item) => (
                    <TrendingTags hashtag={item} />
                ))}
            </div>
            {
                Object.keys(props.trends).map((key) => (
                    <TrendingCard
                        trend_data={{ "hashtag": key, ...props.trends[key] }}
                        display_tweets={props.display_tweets}
                        show_tweets={props.show_tweets}
                    />
                ))
            }
        </>
    )
}