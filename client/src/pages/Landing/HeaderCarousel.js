import React from "react";
import { useTranslation } from 'react-i18next';
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


function HeaderCarousel() {
    const { t, i18n } = useTranslation();
  

    const settings = {
        dots: true,
        autoplay: true,
        arrow: false,
    };


    return (
      <div>
        <HeaderCarouselWrapper {...settings}>
            {[1].map((item) => (
                <HeaderSlide key={item} slide='HeaderCarousel1.png'>
                    <CarouselFieldsWrapper>
                        <CarouselInfoField textColor='inherit'>
                            <Typography variant="h1" gutterBottom>{t('landing.header_carousel.'+item+'.title')}</Typography>
                            <HeaderCarouselInfoText>
                                <Box pb={2}>
                                    <HeaderCarouselTypography variant="h6">
										{t('landing.header_carousel.'+item+'.sub')}
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