import { React, useEffect, useRef, PureComponent } from 'react';
import "../../css/LeftComponents/UserSummarizer.css"
import {BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Saket_data = [
    {
        "title":"Jan,'23",
        "week":2,
        "month":"Jan",
        "year":2023,
        "count":1
    },
    {
        "title":"",
        "week":52,
        "month":"Dec",
        "year":2022,
        "count":1
    },
    {
        "title":"Dec,'22",
        "week":48,
        "month":"Dec",
        "year":2022,
        "count":3
    },
    {
        "title":"",
        "week":46,
        "month":"Nov",
        "year":2022,
        "count":2
    },
    {
        "title":"Nov,'22",
        "week":45,
        "month":"Nov",
        "year":2022,
        "count":2
    },
    {
        "title":"",
        "week":44,
        "month":"Nov",
        "year":2022,
        "count":1
    },
    {
        "title":"",
        "week":42,
        "month":"Oct",
        "year":2022,
        "count":2
    },
    {
        "title":"Oct,'22",
        "week":41,
        "month":"Oct",
        "year":2022,
        "count":4
    },
    {
        "title":"",
        "week":40,
        "month":"Oct",
        "year":2022,
        "count":3
    },
    {
        "title":"Sep,'22",
        "week":39,
        "month":"Sep",
        "year":2022,
        "count":1
    }
]
// Saket_data.sort((a, b) => a.week - b.week);
export default function UserSummarizer({ user, setUser }) {
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
                            setUser({ ...user, "tweets": e.target.value })
                            Ntweets.current.value = e.target.value
                        }} />
                    <span className='max'>&nbsp;100</span>
                </div>
            </div>
            <br />
            <br />
            <div class="grid-container">
                <div class="grid-item">
                    <BarChart
                        width={500}
                        height={300}
                        data={Saket_data}
                        margin={{
                            top: 5,
                            right: 80,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="title" />
                        <YAxis dataKey="count"/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#00adee" />
                    </BarChart>
                </div>
                <div class="grid-item">
                    <LineChart
                        width={500}
                        height={300}
                        data={Saket_data}
                        margin={{
                            top: 5,
                            right: 80,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="title" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#00adee" />
                    </LineChart>
                </div>
            </div>

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