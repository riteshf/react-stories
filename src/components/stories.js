import React, { useContext, useState, useEffect, useRef, useCallback } from "react";

// context
import { StoriesContext } from "../store/stories/stories.store";
import { ProgressContext } from "../store/progress/progress.store";
import { GlobalContext } from "../store/global/global.store";

// components
import ProgressArray from './progress-array/progress-array'

// styles
import { StoriesStyled, OverlayStyled } from "./stories.styled";

const Stories = () => {
  const stories = useContext(StoriesContext);
  const { width, height, loop, currentIndex, isPaused, keyboardNavigation } = useContext(GlobalContext);
  
  const [currentId, setCurrentId] = useState(0);
  const [pause, setPause] = useState(true);
  const [bufferAction, setBufferAction] = useState(true);
  const [videoDuration, setVideoDuration] = useState(0);
  
  let mousedownId = useRef();

  const toggleState = (action, bufferAction) => {
      setPause(action === 'pause')
      setBufferAction(!!bufferAction)
  }

  const setCurrentIdWrapper = useCallback((callback) => {
      setCurrentId(callback);
      toggleState('pause', true);
  })

  const previous = useCallback(() => {
      setCurrentIdWrapper(prev => prev > 0 ? prev - 1 : prev)
  })

  const next = useCallback(() => {
      if (loop) {
          updateNextStoryIdForLoop()
      } else {
          updateNextStoryId()
      }
  });

  const updateNextStoryIdForLoop = () => {
      setCurrentIdWrapper(prev => (prev + 1) % stories.length)
  }

  const updateNextStoryId = () => {
      setCurrentIdWrapper(prev => {
          if (prev < stories.length - 1) return prev + 1
          return prev
      })
  }

  const debouncePause = (e) => {
      e.preventDefault()
      mousedownId.current = setTimeout(() => {
          toggleState('pause')
      }, 200)
  }

  const mouseUp = (e, type) => {
      e.preventDefault()
      mousedownId.current && clearTimeout(mousedownId.current)
      if (pause) {
          toggleState('play')
      } else {
          type === 'next' ? next() : previous()
      }
  }

  const getVideoDuration = (duration) => {
      setVideoDuration(duration * 1000)
  }

  useEffect(() => {
    if (typeof currentIndex === 'number') {
        if (currentIndex >= 0 && currentIndex < stories.length) {
            setCurrentIdWrapper(() => currentIndex)
        } else {
            console.error('Index out of bounds. Current index was set to value more than the length of stories array.', currentIndex)
        }
    }    
  }, [currentIndex, setCurrentIdWrapper, stories.length])

  useEffect(() => {
      if (typeof isPaused === 'boolean') {
          setPause(isPaused)
      }
  }, [isPaused])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
          previous()
      }
      else if (e.key === 'ArrowRight') {
          next()
      }
  }
      const isClient = (typeof window !== 'undefined' && window.document);
      if (isClient && (typeof keyboardNavigation === 'boolean' && keyboardNavigation)) {
          document.addEventListener("keydown", handleKeyDown);
          return () => {
              document.removeEventListener("keydown", handleKeyDown);
          }
      }
  }, [keyboardNavigation, next, previous])

  return (
    <StoriesStyled cWidth={width} cHeight={height}>
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

      <OverlayStyled>
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
      </OverlayStyled>
    </StoriesStyled>
  );
};

export default Stories;
