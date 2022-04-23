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
  TeamButton,
  PlayerName,
  PlayerKills,
  PlayerPlacement,
  PlayerTotal,
  PlayersContainer,
} from "./ViewerComponents"
import socketIOClient from "socket.io-client"
import { changeCount } from "../../reducers/reducers"
import Countdown from "react-countdown"
import * as COLORS from "../../styles/colors"

const AD_LINK = "localhost"
let WS_HOST = "ludwigmonday.gg"
let WS_PATH = "/api/viewer"
if (process.env.NODE_ENV !== "production") {
  WS_HOST = "localhost:7000"
  WS_PATH = ""
}

const Viewer = () => {
  const [ws, setWs] = useState(null)
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
  const handleAdClick = () => {
    ReactGA.event({
      category: "viewer",
      action: "adClick",
      label: "adClicked",
    })
  }

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      setCanSubmit(true)
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
    ws.emit("attack", {
      team: currentTeam.name,
    })
    setWaitTime(() => Date.now() + settings.timeout)
    setCanSubmit(() => false)
    ReactGA.event({
      category: "viewer",
      action: "attack",
      label: currentTeam,
    })
  }

  useEffect(() => {
    // set teams based on websocket
    // set players based on websocket
    // set counts based on websocket
    // set activeTeam to first team returned
    //
    //
    let socket = socketIOClient(WS_HOST, {
      path: WS_PATH,
    })
    setWs(socket)

    socket.on("add-teams", (teams) => {
      if (currentTeam.name === "loading...") {
        setCurrentTeam(teams[0])
      }
      let t = teams.reduce((acc, cur) => {
        acc[cur.name] = cur
        return acc
      }, {})
      setTeams(t)
      Object.keys(t).forEach((team) => {
        dispatchCounts({ type: "add-team", team: team })
      })
    }) // should be an array of all teams
    socket.on("add-players", (players) => {
      let p = players.reduce((agg, cur) => {
        agg[cur._id] = cur
        return agg
      }, {})
      setPlayers(p)
    }) // should be an array of all players
    socket.on("update-count", (cnt) => {
      dispatchCounts({
        type: "update-count",
        team: cnt.team,
        count: cnt.val ? parseInt(cnt.val) : 0,
      })
    }) // should get alot of these...
    socket.on("settings", (sets) => {
      setSettings(sets)
    }) // should get these on connection
    socket.on("set-waiting", (wait) => {
      setWaitTime(wait)
    }) // whenever you submit
  }, [])

  return (
    <PageContainer>
      <TopLogo />
      <ViewerContainer>
        <TeamListContainer>
          <MainContainerTop
            style={{ borderBottom: "1px solid white", marginBottom: 10 }}
          >
            <MainContainerTitle>Teams</MainContainerTitle>
          </MainContainerTop>
          {teams &&
            Object.entries(teams).map(([key, val]) => {
              return (
                <TeamButton key={key} onClick={() => setCurrentTeam(val)}>
                  {key}
                </TeamButton>
              )
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
              <TeamInfoContainer
                style={{ border: "1px solid white", padding: 0 }}
              >
                <PlayersContainer style={{ borderBottom: "1px solid white" }}>
                  <PlayerName style={{ fontSize: "1.8vw" }}>Player</PlayerName>
                  <PlayerKills style={{ fontSize: "1.8vw" }}>
                    Knocks
                  </PlayerKills>
                  <PlayerPlacement style={{ fontSize: "1.8vw" }}>
                    placement
                  </PlayerPlacement>
                  <PlayerTotal style={{ fontSize: "1.8vw" }}>Total</PlayerTotal>
                </PlayersContainer>
                {currentTeam.players.map((player, i) => {
                  let p = players[player]
                  return (
                    <PlayersContainer key={player._id}>
                      <PlayerName>{p.streamerName}</PlayerName>
                      <PlayerKills>{p.attributes.kills}</PlayerKills>
                      <PlayerPlacement>
                        {p.attributes.placement}
                      </PlayerPlacement>
                      <PlayerTotal>
                        {p.attributes.placement + p.attributes.kills}
                      </PlayerTotal>
                    </PlayersContainer>
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
