import styled from "styled-components";

export const StoriesStyled = styled.div`
  display: flex;
  flexdirection: column;
  background: #111;
  position: relative;
  width: ${(props) => props.cWidth}px;
  height: ${(props) => props.cHeight}px;
  margin: 40px;
`;
StoriesStyled.displayName = "StoriesStyled";

export const OverlayStyled = styled.div`
  position: absolute;
  height: inherit;
  width: inherit;
  display: flex;
`;
OverlayStyled.displayName = "OverlayStyled";
