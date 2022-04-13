import React, { useEffect, useState } from "react"
import { AreaChart, YAxis, XAxis, CartesianGrid, Legend, Area } from "recharts"

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]

const Chart = () => {
  const [data, setData] = useState([{ name: 3, uv: 0, pv: 10000, amt: 3000 }])

  useEffect(() => {
    let dat = [
      ...data,
      {
        name: data.at(-1).name + 1,
        uv: data.at(-1).uv + 50 * Math.random(),
        pv: 10000,
        amt: 3000,
      },
    ]
    if (dat.length > 50) {
      dat.shift()
    }
    setTimeout(() => setData(dat), 100)
    console.log("here")
  }, [data])
  return (
    <AreaChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="black" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" tick={false} />
      <YAxis
        domain={[0, 15000]}
        allowDataOverflow={true}
        ticks={[10000]}
        tickLine={false}
      />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Area
        type="monotone"
        dataKey="pv"
        stroke="red"
        fillOpacity={1}
        fill="none"
        isAnimationActive={false}
      />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="red"
        fillOpacity={1}
        fill="url(#colorUv)"
        isAnimationActive={false}
      />{" "}
    </AreaChart>
  )
}

export default Chart
