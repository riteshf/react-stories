import React, { useContext, useState, useEffect, useRef, useCallback } from 'react'

// context
import { ProgressContext } from '../../store/progress/progress.store'
import { GlobalContext } from "../../store/global/global.store";
import { StoriesContext } from '../../store/stories/stories.store'

// components
import Progress from '../progress/progress'

export default () => {
    const [count, setCount] = useState(0)
    const { currentId, next, videoDuration, pause } = useContext(ProgressContext)
    const { defaultInterval, onStoryEnd, onStoryStart, onAllStoriesEnd } = useContext(GlobalContext);
    const stories = useContext(StoriesContext);

    let animationFrameId = useRef()

    let countCopy = count;
    const incrementCount = useCallback(() => {
        if (countCopy === 0) storyStartCallback()
        setCount((count) => {
            const interval = getCurrentInterval()
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
            cancelAnimationFrame(animationFrameId.current)
            next()
        }
    })

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

    useEffect(() => {
        setCount(0)
    }, [currentId])

    useEffect(() => {
        if (!pause) {
            animationFrameId.current = requestAnimationFrame(incrementCount)
        }
        return () => {
            cancelAnimationFrame(animationFrameId.current)
        }
    }, [incrementCount, pause])

    
    return (
        <div style={styles.progressArr}>
            {stories.map((_, i) =>
                <Progress
                    key={i}
                    count={count}
                    width={1 / stories.length}
                    active={i === currentId ? 1 : (i < currentId ? 2 : 0)}
                />)}
        </div>
    )
}

const styles = {
    progressArr: {
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '100%',
        flexWrap: 'row',
        position: 'absolute',
        width: '98%',
        padding: 5,
        paddingTop: 7,
        alignSelf: 'center',
        zIndex: 99,
        filter: 'drop-shadow(0 1px 8px #222)'
    }
}