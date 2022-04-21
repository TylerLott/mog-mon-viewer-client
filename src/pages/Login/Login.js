import React from "react"
import { PageContainer } from "../../styles/styleGlobalComponents"
import TopLogo from "../../components/TopLogo/TopLogo"
import { LoginPage } from "./LoginComponents"

const Login = ({ handleLogin, handleRoomcode }) => {
  return (
    <PageContainer>
      <LoginPage>
        <TopLogo />
        <div>Oauth prompts</div>
      </LoginPage>
    </PageContainer>
  )
}

export default Login
