import styled from "styled-components";

const getProgressStyle = ({ active, count }) => {
  switch (active) {
    case 2:
      return { width: "100%" };
    case 1:
      return { transform: `scaleX(${count / 100})` };
    case 0:
      return { width: 0 };
    default:
      return { width: 0 };
  }
};

const getProgressWrapperStyle = ({ width, pause, bufferAction }) => ({
  width: `${width * 100}%`,
  opacity: pause && !bufferAction ? 0 : 1,
});

export const ProgressWrapperStyled = styled.div`
  ${props => getProgressWrapperStyle(props)}
  height: 2;
  maxwidth: 100%;
  background: #555;
  margin: 2;
  borderradius: 2;
  transition: opacity 400ms ease-in-out;
`;
ProgressWrapperStyled.displayName = "ProgressWrapperStyled";

export const ProgressStyled = styled.div`
${props => getProgressStyle(props)}
  background: #fff;
  height: 100%;
  maxwidth: 100%;
  borderradius: 2;
  transformorigin: center left;

  webkitbackfacevisibility: hidden;
  mozbackfacevisibility: hidden;
  msbackfacevisibility: hidden;
  backfacevisibility: hidden;

  webkitperspective: 1000;
  mozperspective: 1000;
  msperspective: 1000;
  perspective: 1000;
`;
ProgressStyled.displayName = "ProgressStyled";
