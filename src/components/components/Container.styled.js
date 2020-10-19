import styled from 'styled-components'

export const ContainerStyled = styled.div`
    display: flex;
    flexDirection: column;
    background: #111;
    position: relative;
    height:${props => props.height};
    width:${props => props.width};
`;
ContainerStyled.displayName ='ContainerStyled';


export const OverlayStyled = styled.div`
    position: absolute;
    height: inherit;
    width: inherit;
    display: flex;
`;
OverlayStyled.displayName ='OverlayStyled';
