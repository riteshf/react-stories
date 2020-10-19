import * as React from 'react';
import { Renderer, Tester } from './../interfaces';

export const Crenderer: Renderer = (props) => {
    React.useEffect(() => {
        props.action('play');
    }, [props, props.story])
    const Content = props.story.originalContent;
    // @ts-ignore
    return <Content {...props} />
}

export const tester: Tester = (story) => {
    return {
        condition: !!story.content,
        priority: 2
    }
}

export default {
    Crenderer,
    tester
}