import React, { useEffect, useState } from "react"
import {
  AreaChart,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts"
import * as COLORS from "../../styles/colors"

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

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

const Chart = ({ ws, thresh }) => {
  const [data, setData] = useState(
    Array.apply(null, Array(120)).map(() => {
      return { p: 0, thresh: thresh }
    })
  )
  const [windowDims, setWindowDims] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDims(getWindowDimensions())
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    let dat = [
      ...data,
      {
        p: data.at(-1).p + 10 * Math.random(),
        thresh: thresh,
      },
    ]
    if (dat.length > 120) {
      dat.shift()
    }
    setTimeout(() => setData(dat), 500)
  }, [data])

  return (
    <AreaChart
      width={windowDims.width / 2.1}
      height={windowDims.height / 4}
      data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      background={{ fill: "blue" }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor={COLORS.BUTTON_RED} stopOpacity={0.8} />
          <stop offset="95%" stopColor={COLORS.BUTTON_RED} stopOpacity={0.4} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" tick={false} stroke="white" />
      <YAxis
        domain={[0, thresh * 1.2]}
        allowDataOverflow={true}
        ticks={[thresh]}
        tickLine={false}
        stroke="white"
      />
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <Area
        type="monotone"
        dataKey="thresh"
        stroke={COLORS.BUTTON_RED}
        fillOpacity={1}
        fill="none"
        isAnimationActive={false}
      />
      <Area
        type="monotone"
        dataKey="p"
        stroke="red"
        fillOpacity={1}
        fill="url(#colorUv)"
        isAnimationActive={true}
      />
    </AreaChart>
  )
}

export default Chart
