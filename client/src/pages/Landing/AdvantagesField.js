import React from "react";
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

import {
    AdvantagesBox,
    IconBox,
    AdvantagesInfo,
    TypographyHeader,
    TypographyText,
    TypographyTextWrapper
} from './styledComponent.js';

import { HeaderCarouselTypography, FieldsWrapper } from '../globalLandingStyles.js';



function AdvantagesField() {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <FieldsWrapper>
                <TypographyHeader variant="h1" gutterBottom>{t('landing.advantage.header')}</TypographyHeader>
                <TypographyTextWrapper>
                    <TypographyText variant="h5">
                        {t('landing.advantage.sub')}
                    </TypographyText>
                </TypographyTextWrapper>
                <Grid container justify="space-between" alignItems="flex-start" spacing={0}>
                    <Grid item sm>
                        <AdvantagesBox textAlign="center">
                            <IconBox number={1} />
                            <AdvantagesInfo>
                                <Typography variant="h5" gutterBottom>{t('landing.advantage.1.title')}</Typography>
                                <HeaderCarouselTypography variant="h5">
                                    {t('landing.advantage.1.text')}
                                </HeaderCarouselTypography>
                            </AdvantagesInfo>
                        </AdvantagesBox>
                    </Grid>
                    <Grid item sm>
                        <AdvantagesBox textAlign="center">
                            <IconBox number={2} />
                            <AdvantagesInfo>
                                <Typography variant="h5" gutterBottom>{t('landing.advantage.2.title')}</Typography>
                                <HeaderCarouselTypography variant="h5">
                                    {t('landing.advantage.2.text')}
                                </HeaderCarouselTypography>
                            </AdvantagesInfo>
                        </AdvantagesBox>
                    </Grid>
                    <Grid item sm>
                        <AdvantagesBox textAlign="center">
                            <IconBox number={3} />
                            <AdvantagesInfo>
                                <Typography variant="h5" gutterBottom>{t('landing.advantage.3.title')}</Typography>
                                <HeaderCarouselTypography variant="h5">
                                    {t('landing.advantage.3.text')}
                                </HeaderCarouselTypography>
                            </AdvantagesInfo>
                        </AdvantagesBox>
                    </Grid>
                </Grid>
            </FieldsWrapper>
        </div>
    );
}


export default AdvantagesField;
