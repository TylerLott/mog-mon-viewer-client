import React, { useEffect, useState } from "react"
import ReactGA from "react-ga"
import TopLogo from "../../components/TopLogo/TopLogo"
import { PageContainer, UIBoolButton } from "../../styles/styleGlobalComponents"
import Chart from "../../components/Chart/Chart"
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
} from "./ViewerComponents"
import socketIOClient from "socket.io-client"

const AD_LINK = "localhost"
let ws

const Viewer = () => {
  const [currentTeam, setCurrentTeam] = useState(null)
  const [waiting, setWaiting] = useState({}) // last submit time
  const [canSubmit, setCanSubmit] = useState(false)
  const [thresh, setThresh] = useState(1000)
  const [counts, setCounts] = useState({}) // obj with each team
  const [hist, setHist] = useState({}) // obj with each team
  const [teams, setTeams] = useState({}) // obj of all teams + their players
  const [players, setPlayers] = useState({}) // obj of all players + stats

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

  useEffect(() => {
    // set push the counts to hist in setTimeout
    // update every .5 seconds
  }, [hist])

  useEffect(() => {
    // connect to websocket -> set socket
    // set teams based on websocket
    // set players based on websocket
    // set counts based on websocket
    // set activeTeam to first team returned
    //
    //
    // ws = socketIOClient("socketurl", {
    //   auth: {
    //     token: "token",
    //   },
    //   path: "socketpath",
    // })
    // socket.on("add-team", () => {}) // should add get sent a bunch of these on connection
    // socket.on("update-count", () => {}) // should get alot of these...
    // socket.on("new-player", () => {}) // should get these on connection too
    // socket.on("settings", () => {}) // should get these on connection
    // socket.on("set-waiting", () => {}) // whenever you submit
  }, [])

  return (
    <PageContainer>
      <TopLogo />
      <ViewerContainer>
        <TeamListContainer>
          <MainContainerTop>
            <MainContainerTitle>Teams</MainContainerTitle>
          </MainContainerTop>
        </TeamListContainer>
        <MainContainer>
          <div>
            <MainContainerTop>
              <MainContainerTitle>Teamname</MainContainerTitle>
            </MainContainerTop>
            <MainContainerMid>
              <Chart thresh={thresh} data={hist[currentTeam]} />
              <MainContainerNumber>number or timeleft</MainContainerNumber>
              <UIBoolButton track={!waiting}>attack or timeleft</UIBoolButton>
              <TeamInfoContainer>team info</TeamInfoContainer>
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
