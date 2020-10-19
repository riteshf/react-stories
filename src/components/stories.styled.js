import styled from "styled-components";

export const StoriesStyles = styled.div`
  display: flex;
  flexdirection: column;
  background: #111;
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;
StoriesStyles.displayName = "StoriesStyles";
