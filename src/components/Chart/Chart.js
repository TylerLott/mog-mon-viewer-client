import React, { useEffect, useState } from "react"
import { AreaChart, YAxis, XAxis, Area } from "recharts"
import * as COLORS from "../../styles/colors"

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window
  return { width, height }
}

const Chart = ({ data, thresh, team }) => {
  const [windowDims, setWindowDims] = useState(getWindowDimensions())

  useEffect(() => {
    const handleResize = () => {
      setWindowDims(getWindowDimensions())
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  console.log("dat", data)

  return (
    <AreaChart
      width={windowDims.width / 2.1}
      height={windowDims.height / 4}
      data={data[team.name]}
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
        dataKey={(v) => thresh}
        stroke={COLORS.BUTTON_RED}
        fillOpacity={1}
        fill="none"
        isAnimationActive={false}
      />
      <Area
        type="monotone"
        dataKey={(v) => v}
        stroke="red"
        fillOpacity={1}
        fill="url(#colorUv)"
        isAnimationActive={true}
      />
    </AreaChart>
  )
}

export default Chart
