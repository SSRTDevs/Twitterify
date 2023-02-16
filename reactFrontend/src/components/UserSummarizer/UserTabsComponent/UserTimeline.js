import React from "react";
import "../../../css/LeftComponents/UserSummarizer.css"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, } from 'recharts';



export default function UserTimeline() {

  const Saket_data = [
    {
      "title": "Jan,'23",
      "week": 2,
      "month": "Jan",
      "year": 2023,
      "count": 1
    },
    {
      "title": "",
      "week": 52,
      "month": "Dec",
      "year": 2022,
      "count": 1
    },
    {
      "title": "Dec,'22",
      "week": 48,
      "month": "Dec",
      "year": 2022,
      "count": 3
    },
    {
      "title": "",
      "week": 46,
      "month": "Nov",
      "year": 2022,
      "count": 2
    },
    {
      "title": "Nov,'22",
      "week": 45,
      "month": "Nov",
      "year": 2022,
      "count": 2
    },
    {
      "title": "",
      "week": 44,
      "month": "Nov",
      "year": 2022,
      "count": 1
    },
    {
      "title": "",
      "week": 42,
      "month": "Oct",
      "year": 2022,
      "count": 2
    },
    {
      "title": "Oct,'22",
      "week": 41,
      "month": "Oct",
      "year": 2022,
      "count": 4
    },
    {
      "title": "",
      "week": 40,
      "month": "Oct",
      "year": 2022,
      "count": 3
    },
    {
      "title": "Sep,'22",
      "week": 39,
      "month": "Sep",
      "year": 2022,
      "count": 1
    }
  ]

  return <>
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
          <YAxis dataKey="count" />
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
  </>;
}
