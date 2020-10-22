import styled from 'styled-components';
import { makeStyles } from '@material-ui/core';

export const PresenterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1120px;
  margin: 0 auto;
  @media (max-width: 959px) {
    flex-direction: ${({ sectionHead }) => (sectionHead === 'innovation') ? 'row' : 'column'};
  }
  @media (max-width: 769px) {
    flex-direction: column;
  }
`;

export const PresenterTextList = styled.div`
  width: 100%;
  max-width: 480px;
  @media (max-width: 959px) {
    max-width: 768px;
  }
`;

export const PresenterImagesContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth ? `${maxWidth}px` : 'auto'};
  height: 362px;
  margin-left: 20px;
  overflow-x: hidden;
  
  @media (max-width: 959px) {
    display: none;
  }
`;

export const PresenterImagesRow = styled.div`
  position: relative;
  left: ${props => `-${props.leftPosition}px`};
  display: flex;
  height: 100%;
  transition: all 0.3s ease;
`;

export const PresenterImageItem = styled.div`
  flex-shrink: 0;
  width: ${props => `${props.imgWidth}px`};
  height: 100%;

  img {
    width: 100%;
    height: 99%;
    object-fit: contain;
  }

  @media (max-width: 959px) {
    display: none;
  }
`;

export const PresenterImageItemMobile = styled.div`
  display: none;
  @media (max-width: 959px) {
    display: ${({ isActive }) => isActive ? 'block' : 'none'};
    img {
      width: 192px;
      margin-left: 55px;
      @media (max-width: 959px) {
        margin-left: 80px;
        width: ${({ sectionHead }) => (sectionHead === 'innovation') ? 188 : 544}px;
      }
      @media (max-width: 768px) {
        margin-left: 50px;
        width: 80%;
        max-width: ${({ sectionHead }) => (sectionHead === 'innovation') ? 288 : 'auto'}px;
      }
    }
  }
  
`;

export const presenterStyles = makeStyles(theme => ({
  presenterTitle: {
    marginBottom: '1.2em',
    lineHeight: '1.08em',
    letterSpacing: '-1px',
  }
})
);
