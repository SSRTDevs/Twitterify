import { React, useEffect, useRef } from 'react';
import "../css/UserSummarizer.css"
import loader from '../images/loader.gif';

export default function UserSummarizer(props) {
    const Ntweets = useRef(0)
    useEffect(() => {
        Ntweets.current.value = 0
    }, [])

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Username</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder='@username'
                    onChange={(e) => {
                        props.setUsername(e.target.value)
                    }} />
            </div>
            <div className="slider">
                <label for="customRange1" class="form-label">
                    Number of Tweets
                    {props.tweets == 0 ? "" : ` : ${props.tweets}`}
                </label>
                <div className="slider-element">
                    <span className='min'>0&nbsp;</span>
                    <input ref={Ntweets} type="range" class="form-range" min="0" max="100" id="customRange1"
                        onChange={(e) => {
                            props.settweets(e.target.value)
                            Ntweets.current.value = e.target.value
                        }} />
                    <span className='max'>&nbsp;100</span>
                </div>

            </div>
            <div className="wordclouds">

                {
                    props.wordcloud1 == "" ?
                        <img src={loader} alt="Loader" /> :
                        <div className="wordcloud1">
                            <span>Things talked about</span>
                            <img src={`data:image/png;base64,${props.wordcloud1}`} alt="wordcloud" />
                        </div>
                }

                {
                    props.wordcloud2 == "" ?
                        <img src={loader} alt="Loader" /> :
                        <div className="wordcloud2">
                            <span>Names talked about</span>
                            <img src={`data:image/png;base64,${props.wordcloud2}`} alt="wordcloud" />
                        </div>
                }
            </div>
        </>
    )
}