import React from "react";
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {
    FieldsWrapper
} from '../globalLandingStyles.js';



const useStyles = makeStyles(theme => ({
    headerText: {
        textAlign: 'center',
        marginBottom: 80,
        fontWeight: 500,
    },
    fieldWrapper: {
        marginBottom: 60,
        padding: "0 20px"
    },
    iconWrapper: {
        width: 60,
        paddingRight: 20,
    },
    itemText: {
        fontWeight: 300,
        marginTop: 10
    }
}));


function AdvantagesField() {
    const { t, i18n } = useTranslation();
    const classes = useStyles();

    return (
      <FieldsWrapper>
            <Typography variant="h1" className={classes.headerText}>
                {t('agencies.advantage.header')}
            </Typography>
            <Grid container justify="space-between" alignItems="center">
                <Grid item xs={12} sm={6} lg={4} className={classes.fieldWrapper}>
                    <Grid container justify="space-between" alignItems="flex-start">
                        <Grid item>
                            <img src={`/static/img/icons/agenciesAdv5.png`} className={classes.iconWrapper} />
                        </Grid>
                        <Grid item xs={12} sm>
                            <Typography variant="h5">{t('agencies.advantage.1.title')}</Typography>
                            <Typography variant="h6" className={classes.itemText}>
                                {t('agencies.advantage.1.text')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className={classes.fieldWrapper}>
                    <Grid container justify="space-between" alignItems="flex-start">
                        <Grid item>
                            <img src={`/static/img/icons/agenciesAdv2.png`} className={classes.iconWrapper} />
                        </Grid>
                        <Grid item xs={12} sm>
                            <Typography variant="h5">{t('agencies.advantage.2.title')}</Typography>
                            <Typography variant="h6" className={classes.itemText}>
                                {t('agencies.advantage.2.text')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} className={classes.fieldWrapper}>
                    <Grid container justify="space-between" alignItems="flex-start">
                        <Grid item>
                            <img src={`/static/img/icons/agenciesAdv3.png`} className={classes.iconWrapper} />
                        </Grid>
                        <Grid item xs={12} sm>
                            <Typography variant="h5">{t('agencies.advantage.3.title')}</Typography>
                            <Typography variant="h6" className={classes.itemText}>
                                {t('agencies.advantage.3.text')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
      </FieldsWrapper>
    );
}


export default AdvantagesField;