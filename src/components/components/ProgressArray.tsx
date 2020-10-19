import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'
import Progress from './Progress'
import { ProgressContext, GlobalCtx, StoriesContext as StoriesContextInterface } from './../interfaces'
import ProgressCtx from './../context/Progress'
import GlobalContext from './../context/Global'
import StoriesContext from './../context/Stories'

import { ProgressArrStyled } from './ProgressArray.styled'

export default () => {
    const [count, setCount] = useState<number>(0)
    const { currentId, next, videoDuration, pause } = useContext<ProgressContext>(ProgressCtx)
    const { defaultInterval, onStoryEnd, onStoryStart, onAllStoriesEnd } = useContext<GlobalCtx>(GlobalContext);
    const { stories } = useContext<StoriesContextInterface>(StoriesContext);

    let animationFrameId = useRef<number>()

    const incrementCount = useCallback(() => {
        const storyStartCallback = () => {
            onStoryStart && onStoryStart(currentId, stories[currentId])
        }
    
        const storyEndCallback = () => {
            onStoryEnd && onStoryEnd(currentId, stories[currentId])
        }
    
        const allStoriesEndCallback = () => {
            onAllStoriesEnd && onAllStoriesEnd(currentId, stories)
        }
    
        const getCurrentInterval = () => {
            if (stories[currentId].type === 'video') return videoDuration
            if (typeof stories[currentId].duration === 'number') return stories[currentId].duration
            return defaultInterval
        }
        let countCopy = count;
        if (countCopy === 0) storyStartCallback()
        setCount((count: number) => {
            const interval = getCurrentInterval() || 1
            countCopy = count + (100 / ((interval / 1000) * 60))
            return count + (100 / ((interval / 1000) * 60))
        })
        if (countCopy < 100) {
            animationFrameId.current = requestAnimationFrame(incrementCount)
        } else {
            storyEndCallback()
            if (currentId === stories.length - 1) {
                allStoriesEndCallback()
            }
            cancelAnimationFrame(animationFrameId.current || 0)
            next()
        }
    }, [count, currentId, defaultInterval, next, onAllStoriesEnd, onStoryEnd, onStoryStart, stories, videoDuration])

    useEffect(() => {
        setCount(0)
    }, [currentId, stories])

    useEffect(() => {
        if (!pause) {
            animationFrameId.current = requestAnimationFrame(incrementCount)
        }
        return () => {
            cancelAnimationFrame(animationFrameId.current || 0)
        }
    }, [currentId, incrementCount, pause])

    return (
        <ProgressArrStyled>
            {stories.map((_, i) =>
                <Progress
                    key={i}
                    count={count}
                    width={1 / stories.length}
                    active={i === currentId ? 1 : (i < currentId ? 2 : 0)}
                />)}
        </ProgressArrStyled>
    )
}