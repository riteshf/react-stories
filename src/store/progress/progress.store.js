import React, { createContext, useContext } from "react";
import { ProgressWrapperStyled, ProgressStyled } from "./progress.styled";

export const ProgressContext = createContext({
  currentId: 0,
  videoDuration: 0,
  bufferAction: false,
  pause: false,
  next: () => {},
});

export const ProgressProvider = (props) => {
  const { bufferAction, pause } = useContext(ProgressContext);

  const { width, active } = props;
  return (
    <ProgressWrapperStyled
      width={width}
      pause={pause}
      bufferAction={bufferAction}
    >
      <ProgressStyled active={active} />
    </ProgressWrapperStyled>
  );
};
