import React, { useEffect, useState, useReducer, useMemo } from "react"
import ReactGA, { set } from "react-ga"
import TopLogo from "../../components/TopLogo/TopLogo"
import { PageContainer, UIBoolButton } from "../../styles/styleGlobalComponents"
import {
  ViewerContainer,
  TeamListContainer,
  MainContainer,
  MainContainerTitle,
  MainContainerTop,
  MainContainerMid,
  MainContainerContent,
  MainContainerNumber,
  TeamInfoContainer,
  ThreshContainer,
} from "./ViewerComponents"
import socketIOClient from "socket.io-client"
import { changeCount, appendHist } from "../../reducers/reducers"
import Countdown from "react-countdown"
import * as COLORS from "../../styles/colors"

const AD_LINK = "localhost"

const Viewer = () => {
  const [currentTeam, setCurrentTeam] = useState({
    name: "loading...",
    createdBy: "",
    players: [],
  })
  const [waitTime, setWaitTime] = useState(Date.now()) // last submit time
  const [canSubmit, setCanSubmit] = useState(false)
  const [settings, setSettings] = useState({
    thresh: 1000,
    timeout: 60000,
    cooldown: 600000,
  })
  const [teams, setTeams] = useState([{ name: "loading..." }, { name: "two" }]) // obj of all teams + their players
  const [players, setPlayers] = useState([]) // obj of all players + stats
  const [counts, dispatchCounts] = useReducer(changeCount, {
    // "loading...": `time,${Date.now()}`,
    "loading...": 10,
  })

  // FUNCTIONS
  const handleClick = (socket) => {
    ReactGA.event({
      category: "viewer",
      action: "attack",
      label: currentTeam,
    })
    // make websocket call
    socket.emit("attack")
  }

  const handleAdClick = () => {
    ReactGA.event({
      category: "viewer",
      action: "adClick",
      label: "adClicked",
    })
  }

  // Random component
  const Completionist = () => {
    if (waitTime < Date.now()) {
      setCanSubmit(true)
      setWaitTime(Date.now() + settings.timeout)
    }
  }

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      )
    }
  }

  const handleAttack = () => {
    setCanSubmit(() => false)
    setWaitTime(Date.now() + settings.timeout)
  }

  useEffect(() => {
    // connect to websocket -> set socket
    // set teams based on websocket
    // set players based on websocket
    // set counts based on websocket
    // set activeTeam to first team returned
    //
    //
    let socket = socketIOClient("localhost:7000", {
      path: "",
    })
    socket.on("add-teams", (teams) => {
      let t = teams.reduce((acc, cur) => {
        acc[cur.name] = cur
        return acc
      }, {})
      setTeams(t)
    }) // should be an array of all teams
    socket.on("add-players", (players) => {
      let p = players.reduce((agg, cur) => (agg[cur._id] = cur), {})
      setPlayers(p)
    }) // should be an array of all players
    socket.on("update-count", (cnt) => {
      changeCount({
        type: "update-count",
        team: cnt.team,
        count: cnt.val,
      })
    }) // should get alot of these...
    socket.on("settings", (sets) => {
      setSettings(sets)
    }) // should get these on connection
    socket.on("set-waiting", (wait) => {
      setWaitTime(wait)
    }) // whenever you submit
  }, [])

  useEffect(() => {
    setTimeout(
      () =>
        dispatchCounts({
          type: "update-count",
          team: currentTeam.name,
          count: counts[currentTeam.name] + 1,
        }),
      1000
    )
  })

  useEffect(() => {
    console.log("teams", teams)
    console.log("players", players)
  }, [teams, players])

  return (
    <PageContainer>
      <TopLogo />
      <ViewerContainer>
        <TeamListContainer>
          <MainContainerTop>
            <MainContainerTitle>Teams</MainContainerTitle>
          </MainContainerTop>
          {teams &&
            Object.entries(teams).forEach(([key, val]) => {
              return <h2 onClick={() => setCurrentTeam(val)}>{key.name}</h2>
            })}
        </TeamListContainer>
        <MainContainer>
          <div>
            <MainContainerTop>
              <MainContainerTitle>{currentTeam.name}</MainContainerTitle>
            </MainContainerTop>
            <MainContainerMid>
              <ThreshContainer>{settings.thresh}</ThreshContainer>
              <div
                style={{
                  backgroundColor: COLORS.BUTTON_RED,
                  width: "10vw",
                  height: "23vh",
                  margin: "10px 0 10px 0",
                  borderRadius: "2vw",
                }}
              >
                <div
                  style={{
                    backgroundColor: COLORS.CONTAINER_BACKGROUND,
                    width: "100%",
                    height: `${
                      counts[currentTeam.name] <= settings.thresh
                        ? 100 -
                          (counts[currentTeam.name] / settings.thresh) * 100
                        : 0
                    }%`,
                    borderRadius: "2vw 2vw 0 0",
                  }}
                ></div>
              </div>
              <MainContainerNumber>
                {Number.isInteger(counts[currentTeam.name]) && (
                  <div>{counts[currentTeam.name]}</div>
                )}
                {!Number.isInteger(counts[currentTeam.name]) && (
                  <Countdown
                    date={
                      parseInt(counts[currentTeam.name].split(",")[1]) +
                      settings.cooldown
                    }
                    renderer={renderer}
                  />
                )}
              </MainContainerNumber>
              <UIBoolButton track={canSubmit}>
                {canSubmit && <div onClick={handleAttack}>Attack!</div>}
                {!canSubmit && (
                  <Countdown date={waitTime + 100} renderer={renderer} />
                )}
              </UIBoolButton>
              <TeamInfoContainer>
                {currentTeam.players.forEach((player, i) => {
                  let p = players[player]
                  return (
                    <div
                      key={player._id}
                      style={{
                        backgroundColor: COLORS.BACKGROUND_LINES,
                        border: "1px solid white",
                      }}
                    >
                      <div>{p.streamerName}</div>
                      <div>{p.attributes.kills}</div>
                      <div>{p.attributes.placement}</div>
                      <div>{p.attributes.placement + p.attribues.kills}</div>
                    </div>
                  )
                })}
              </TeamInfoContainer>
            </MainContainerMid>
          </div>
          <MainContainerContent>
            <MainContainerMid>
              <a href={AD_LINK} onClick={handleAdClick}>
                <img alt="get-that-bread" />
              </a>
            </MainContainerMid>
          </MainContainerContent>
        </MainContainer>
      </ViewerContainer>
    </PageContainer>
  )
}

export default Viewer
