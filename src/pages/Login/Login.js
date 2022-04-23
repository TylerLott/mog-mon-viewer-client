import React from "react"
import { PageContainer } from "../../styles/styleGlobalComponents"
import TopLogo from "../../components/TopLogo/TopLogo"
import { LoginPage } from "./LoginComponents"
import { useNavigate } from "react-router-dom"
import { UIBoolButton } from "../../styles/styleGlobalComponents"

const Login = ({ handleLogin, handleRoomcode }) => {
  let navigate = useNavigate()
  return (
    <PageContainer>
      <LoginPage>
        <TopLogo />
        <UIBoolButton onClick={() => navigate("/viewer")} track={false}>
          Sign In
        </UIBoolButton>
      </LoginPage>
    </PageContainer>
  )
}

export default Login
