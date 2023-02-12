import {React,useEffect,useRef} from 'react';
import "../../css/LeftComponents/UserSummarizer.css"

export default function UserSummarizer({user, setUser}) {
    const Ntweets = useRef(0)
    useEffect(() => {
        setUser({ ...user, 'Username': '', 'tweets': 0 })
        Ntweets.current.value = 0
    }, [])

    return (
        <>

            <div className="container mx-auto w-[75%] mb-2">
                <div className="flex flex-col">
                    <input type="search" id="default-search" className="block p-3 py-2 pl-10 w-full text-sm bg-neutral-800 rounded-lg text-base" placeholder="Search Username" onChange={(e) => {
                        setUser({ ...user, "Username": e.target.value })
                    }} />
                    <div className="text-xl font-semibold my-2 underline  decoration-sky-500/50">
                        User Tweets
                    </div>
                </div>
            </div>
            <div className="slider mt-5 mx-auto">
                <label for="customRange1" className="text form-label">
                    Number of Tweets
                    {user.tweets == 0 ? "" : ` : ${user.tweets}`}
                </label>
                <div className="slider-element w-full">
                    <span className='min'>0&nbsp;</span>
                    <input ref={Ntweets} type="range" className="form-range w-full" min="0" max="100" id="customRange1"
                        onChange={(e) => {
                            // settweets(e.target.value)
                            setUser({ ...user, "tweets": e.target.value })
                            Ntweets.current.value = e.target.value
                        }} />
                    <span className='max'>&nbsp;100</span>
                </div>
            </div>
            <br />
            <br />
            {Object.keys(user.details).length === 0 ? "Nothing to display" :
                Object.keys(user.details.sentiments["Tweet"]).map((index, key) => {
                    return (
                        <>
                            <div
                                className="w-[80%] border border-neutral-800 my-px mx-auto rounded rounded-[50%] p-2 shadow-md hover:bg-neutral-800 mb-2">
                                <p className="py-1 text-sm leading-relaxed text-white-500 line-clamp-3 dark:text-white-500">
                                    {user.details.sentiments["Tweet"][key]}
                                </p>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}