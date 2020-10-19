import React, { useContext, useState } from "react";

// context
import { StoriesContext } from "../store/stories.store";
import { ProgressContext } from "../store/progress/progress.store";
import { GlobalContext } from "../store/global/global.store";

// styles
import { StoriesStyles } from "./stories.styled";

const Stories = ({ width, height }) => {
  const {
    state: { stories = [] },
  } = useContext(StoriesContext);
  const [currentId, setCurrentId] = useState(0);
  const [pause, setPause] = useState(true);
  const [bufferAction, setBufferAction] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);

  const {
    width,
    height,
    loop,
    currentIndex,
    isPaused,
    keyboardNavigation,
  } = useContext(GlobalContext);
  return (
    <StoriesStyles width={width} height={height}>
      <ProgressContext.Provider
        value={{
          bufferAction: bufferAction,
          videoDuration: videoDuration,
          currentId,
          pause,
          next,
        }}
      >
        <ProgressArray />
      </ProgressContext.Provider>
      <Story
        action={toggleState}
        bufferAction={bufferAction}
        playState={pause}
        story={stories[currentId]}
        getVideoDuration={getVideoDuration}
      />
      <div style={styles.overlay}>
        <div
          style={{ width: "50%", zIndex: 999 }}
          onTouchStart={debouncePause}
          onTouchEnd={(e) => mouseUp(e, "previous")}
          onMouseDown={debouncePause}
          onMouseUp={(e) => mouseUp(e, "previous")}
        />
        <div
          style={{ width: "50%", zIndex: 999 }}
          onTouchStart={debouncePause}
          onTouchEnd={(e) => mouseUp(e, "next")}
          onMouseDown={debouncePause}
          onMouseUp={(e) => mouseUp(e, "next")}
        />
      </div>
    </StoriesStyles>
  );
};

export default Stories;
