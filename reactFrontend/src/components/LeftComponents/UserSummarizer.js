import { React, useEffect, useRef } from 'react';
import "../../css/LeftComponents/UserSummarizer.css"
import pos from '../../images/positive.png'
import neutral from '../../images/neutral.png'
import neg from '../../images/negative.png'
export default function UserSummarizer(props) {
    const Ntweets = useRef(0)
    useEffect(() => {
        props.setUser({ ...props.user, 'Username': '', 'tweets': 0 })
        Ntweets.current.value = 0
    }, [])

    return (
        <>

            <div className="container w-[75%]">
                <div className="flex flex-row">
                    <input type="search" id="default-search" className="block p-3 py-2 pl-10 w-full text-sm bg-neutral-900 rounded-lg text-base" placeholder="Search Username" onChange={(e) => {
                        props.setUser({ ...props.user, "Username": e.target.value })
                    }} />
                </div>
            </div>
            <div className="slider">
                <label for="customRange1" class="form-label">
                    Number of Tweets
                    {props.user.tweets == 0 ? "" : ` : ${props.user.tweets}`}
                </label>
                <div className="slider-element">
                    <span className='min'>0&nbsp;</span>
                    <input ref={Ntweets} type="range" class="form-range" min="0" max="100" id="customRange1"
                        onChange={(e) => {
                            // props.settweets(e.target.value)
                            props.setUser({ ...props.user, "tweets": e.target.value })
                            Ntweets.current.value = e.target.value
                        }} />
                    <span className='max'>&nbsp;100</span>
                </div>
            </div>
            <br />
            <br />
            {Object.keys(props.user.details).length === 0 ? "Nothing to display" :
                Object.keys(props.user.details.sentiments["Tweet"]).map((index, key) => {
                    return (
                        <div className="card w-75">
                            <div data-aos="fade-left" className="card-body">
                                <p className="card-text">{props.user.details.sentiments["Tweet"][key]}.</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}