import React, { useEffect, useState } from "react"
import ReactGA from "react-ga"

const AD_LINK = "localhost"

const Viewer = () => {
  const activeTeam = useState(null)
  const teams = useState(null)
  const counts = useState(null)
  const players = useState(null)
  const socket = useState(null)

  const handleClick = () => {
    ReactGA.event({
      category: "viewer",
      action: "attack",
      label: activeTeam,
    })
    // make websocket call
  }

  const handleAdClick = () => {
    ReactGA.event({
      category: "viewer",
      action: "adClick",
      label: "adClicked",
    })
  }

  useEffect(() => {
    // connect to websocket -> set socket
    // set teams based on websocket
    // set players based on websocket
    // set counts based on websocket
    // set activeTeam to first team returned
  })

  return (
    <div>
      <div>TeamList</div>
      <div>
        Teaminfo
        <button onClick={handleClick}>attack</button>
        <div>
          <a href={AD_LINK} onClick={handleAdClick}>
            <img alt="get-that-bread" />
            AdsHere
          </a>
        </div>
      </div>
    </div>
  )
}

export default Viewer
