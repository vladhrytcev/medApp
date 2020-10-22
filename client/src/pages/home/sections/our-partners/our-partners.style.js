import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import breakpoints from '../../../../theme/breakpoints';

const { values } = breakpoints;

export const OurPartnersContainer = styled.div`
  padding: 65px 0 80px;
  @media (max-width: ${values.md}px) {
    padding: 0;
    padding-bottom: 84px;
  }
  @media (max-width: ${values.sm}px) {
    padding: 0;
    padding-bottom: 58px;
  }
`;

export const TypographyHeader = styled.h2`
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
  color: #828898;
`;

export const OurPartnersIcon = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: ${values.md}px) {
    margin: 0 auto;
    & img {
      width: 90%;
    }
  }

  @media(max-width: ${values.sm}px) {
    height: 50px;
    width: 50px;
    margin: 0 auto;
    & img {
      width: 90%;
    }
  }
`;

export const OurPartnerGrid = styled(Grid)`
  margin-bottom: 60px;
  padding: 0 117px;

  @media(max-width: 600px) {
    &:nth-child(odd) {
      margin-bottom: 10x;
    }
  }
`;

export const OurPartnerTypography = styled(Typography)`
  text-align: left;
  font-weight: 600;
`;

export const PlatformContainer = styled(Container)`
  width: 100%;
  height: 462px;
  margin-bottom: 147px;
`;

export const DesktopGrid = styled(Grid)`
  display: flex;
  flex-direction: row;
  @media (max-width: ${values.sm}px) {
    display: flex;
  }
`;

export const MobileGrid = styled(Grid)`
  display: none !important;
  @media (max-width: ${values.sm}px) {
    display: none;
  } 
`;