import * as React from 'react';
import { Renderer, Tester } from './../interfaces';
import globalStyle from './../styles.css'
import WithHeader from './wrappers/withHeader';
import WithSeeMore from './wrappers/withSeeMore';

export const Crenderer: Renderer = ({ story, action }) => {
    React.useEffect(() => {
        action('play');
    }, [action, story])

    return <div style={styles.storyContent}>
        {/* @ts-ignore */}
        <p style={styles.text}>This story could not be loaded.</p>
    </div>
}

const styles = {
    storyContent: {
        width: "100%",
        maxHeight: "100%",
        margin: "auto"
    },
    text: {
        textAlign: 'center',
        color: 'white',
        width: '90%',
        margin: 'auto'
    }
};

export const tester: Tester = () => {
    return {
        condition: true,
        priority: 1
    };
}

export default {
    Crenderer,
    tester
}