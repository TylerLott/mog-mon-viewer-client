import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const ViewerContainer = styled.div`
  display: flex;
`

export const TeamListContainer = styled.div`
  width: 20%;
  height: 60vh;
  margin-top: 20px;
  margin-right: 20px;
  padding: 25px;
  background-color: ${COLORS.BACKGROUND_COLOR};
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  overflow: auto;
  outline: 2px solid ${COLORS.TEXT_COLOR};
  outline-offset: -10px;
  background-size: 20px 20px;
  color: ${COLORS.TEXT_COLOR};
  background-image: linear-gradient(
      0deg,
      ${COLORS.CONTAINER_GRID_LINES} 1px,
      transparent 1px
    ),
    linear-gradient(90deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px);
`

export const MainContainer = styled.div`
  width: 80%;
  margin-top: 20px;
  padding: 25px;
  background-color: ${COLORS.BACKGROUND_COLOR};
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  outline: 2px solid ${COLORS.TEXT_COLOR};
  outline-offset: -10px;
  background-size: 20px 20px;
  color: ${COLORS.TEXT_COLOR};
  background-image: linear-gradient(
      0deg,
      ${COLORS.CONTAINER_GRID_LINES} 1px,
      transparent 1px
    ),
    linear-gradient(90deg, ${COLORS.CONTAINER_GRID_LINES} 1px, transparent 1px);
`

export const MainContainerTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`
export const MainContainerTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 0;
  font-size: 2em;
  color: ${COLORS.TEXT_COLOR};
`

export const MainContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const MainContainerMid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MainContainerNumber = styled.h3`
  margin: 10px;
  height: 50px;
  font-size: 1.5em;
`

export const TeamInfoContainer = styled.div`
  margin-top: 20px;
  background-color: white;
  width: 100%;
  border-radius: 0.4em;
`

export const ThreshContainer = styled.h3`
  margin: 0px;
  padding: 0;
  height: 50px;
  font-size: 1.5em;
`
