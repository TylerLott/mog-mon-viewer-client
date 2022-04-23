import React, { useEffect } from "react"
import "./App.css"
import ReactGA from "react-ga"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login/Login"
import Viewer from "./pages/Viewer/Viewer"

const TRACKING_ID = "UA-199888472-3"
ReactGA.initialize(TRACKING_ID)

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/viewer" element={<Viewer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
