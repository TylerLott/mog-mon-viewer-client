import styled from "styled-components"
import * as COLORS from "../../styles/colors"

export const ViewerContainer = styled.div`
  display: flex;
`

export const TeamListContainer = styled.div`
  width: 30%;
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
  width: 60%;
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
`

export const ThreshContainer = styled.h3`
  margin: 0px;
  padding: 0;
  height: 50px;
  font-size: 1.5em;
`

export const TeamButton = styled.button`
  margin: 5px 0 0 5px;
  padding: 5px;
  background-color: rgba(0, 0, 0, 0);
  border: 2px solid ${COLORS.TEXT_COLOR};
  color: ${COLORS.TEXT_COLOR};
  font-weight: 600;
  border-radius: 0.5em;
  transition: 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  &:focus {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

export const PlayersContainer = styled.div`
  display: grid;
  grid-template-columns: 30% 23% 23% 23%;
  background-color: ${COLORS.BACKGROUND_LINES};
  padding: 20px;
`
export const PlayerName = styled.h3`
  grid-column: 1;
  margin: 0;
  font-size: 1.5vw;
`
export const PlayerKills = styled.h3`
  grid-column: 2;
  margin: 0;
  font-size: 1.5vw;
  justify-self: center;
`
export const PlayerPlacement = styled.h3`
  grid-column: 3;
  margin: 0;
  font-size: 1.5vw;
  justify-self: center;
`
export const PlayerTotal = styled.h3`
  grid-column: 4;
  margin: 0;
  font-size: 1.5vw;
  justify-self: center;
`
