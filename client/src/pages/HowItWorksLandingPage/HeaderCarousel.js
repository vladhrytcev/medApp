import React from "react";
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {
    HeaderSlide,
    CarouselFieldsWrapper,
    HeaderCarouselTypography,
    SendRequestButton,
    HeaderCarouselInfoText,
    HeaderCarouselWrapper,
    CarouselInfoField
} from '../globalLandingStyles.js';


const useStyles = makeStyles(theme => ({
    slideText: {
        width: 450,
        '@media (max-width: 600px)': {
            width: '100%',
        }
    }
}));


function HeaderCarousel() {
    const { t, i18n } = useTranslation();
    const classes = useStyles();

    const settings = {
        dots: true,
        autoplay: true,
        arrow: false,
    };


    return (
      <div>
        <HeaderCarouselWrapper {...settings}>
            {[1].map((item) => (
                <HeaderSlide key={item} slide='HeaderHowItWorksCarousel1.png'>
                    <CarouselFieldsWrapper>
                        <CarouselInfoField textColor='inherit'>
                            <Typography variant="h1" gutterBottom className={classes.slideText}>
                                {t('howitworks.header_carousel.'+item+'.title')}
                            </Typography>
                            <HeaderCarouselInfoText>
                                <Box pb={2}>
                                    <HeaderCarouselTypography variant="h6" className={classes.slideText}>
                                        {t('howitworks.header_carousel.'+item+'.sub')}
                                    </HeaderCarouselTypography>
                                </Box>
                            </HeaderCarouselInfoText>
                            <SendRequestButton>{t('global.send')}</SendRequestButton>
                        </CarouselInfoField>
                    </CarouselFieldsWrapper>
                </HeaderSlide>
            ))}
        </HeaderCarouselWrapper>
      </div>
    );
}


export default HeaderCarousel;