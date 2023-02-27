import { React, useState } from "react";
import "../../../css/LeftComponents/UserSummarizer.css";
import { VscGraph, VscGraphLine } from "react-icons/vsc";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";


export default function UserTimeline({ user }) {
  const [flipGraph, setFlipGraph] = useState(true);
  return (
    <>
      {user.details.payload.length > 0 && (
        <div className="flex flex-col items-center">
          <label className='swap swap-active badge bg-gray-700 badge-outline mr-32 p-3 items-end self-end'>
            <div
              className={`${
                flipGraph ? "swap-on" : "swap-off"
              } flex justify-center items-center w-fit`}
              onClick={() => setFlipGraph(!flipGraph)}>
              <VscGraph size={15} /> &nbsp; Histogram
            </div>
            <div
              className={`${
                !flipGraph ? "swap-on" : "swap-off"
              } flex justify-center items-center w-fit`}
              onClick={() => setFlipGraph(!flipGraph)}>
              <VscGraphLine size={15} /> &nbsp; Line Graph
            </div>
          </label>

          <div className='flex items-center'>
            {!flipGraph && (
              <div className="histogram">
                <BarChart
                  width={500}
                  height={300}
                  data={user.details.payload}
                  margin={{
                    top: 5,
                    right: 80,
                    left: 10,
                    bottom: 5,
                  }}>
                  <XAxis dataKey='title' />
                  <YAxis dataKey='count' />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey='count' fill='#00adee' />
                </BarChart>
              </div>
            )}
            {flipGraph && (
              <div className="line-graph">
                <LineChart
                  width={500}
                  height={300}
                  data={user.details.payload}
                  margin={{
                    top: 5,
                    right: 80,
                    left: 10,
                    bottom: 5,
                  }}>
                  <XAxis dataKey='title' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='count' stroke='#00adee' />
                </LineChart>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
