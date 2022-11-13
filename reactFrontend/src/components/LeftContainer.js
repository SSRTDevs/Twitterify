import React from 'react';
import '../css/LeftContainer.css'
import { PAGES } from '../App';
import { Trending, ThreadSummarizer, UserSummarizer } from "./index"

export default function LeftContainer(props) {
    return (
        <div className="left-container">
            {
                props.Component === PAGES.TRENDING ?
                    <Trending {...props} /> :
                    props.Component === PAGES.THREAD ?
                        <ThreadSummarizer {...props} /> :
                        <UserSummarizer {...props} />
            }
        </div>
    )
}