import React from "react";
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import {
    FieldsWrapper,
    SendRequestButton
} from '../globalLandingStyles.js';



const useStyles = makeStyles(theme => ({
    root: {
        textAlign: "center"
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 500,
    },
    headerString: {
        textAlign: 'center',
        fontWeight: 300,
        margin: '0 auto 60px',
        width: 500,
        '@media (max-width: 600px)': {
            width: '100%'
        }

    },
    fieldWrapper: {
        marginBottom: 60,
        padding: "0 20px",
        '@media (max-width: 600px)': {
            '&:nth-child(odd)': {
                marginBottom: 10,
            }
        }
    },
    fieldTextWrapper: {
        '&>h1': {
            textAlign: 'left',
            color: '#2c57a9'
        },
        '&>h6': {
            textAlign: 'left',
        },
        '&>h6:first-of-type': {
            margin: '15px 0',
        },
        '&>h6:last-of-type': {
            fontWeight: 300,
        }
    },
    iconWrapper: {
        width: '80%',
        '@media (max-width: 1280px)': {
            width: '100%'
        }
    },
    itemText: {
        fontWeight: 300,
        marginTop: 10
    },
    reverseRow: {
        flexDirection: 'row-reverse',
        '@media (max-width: 600px)': {
            flexDirection: 'row',
        }
    },
	numberField: {
        width: 70,
        height: 70,
        borderRadius: 40,
        background: '#2c57a9',
        position: 'relative',
        '& h1': {
            color: '#fff',
            display: 'inline-block',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        '@media (max-width: 1280px)': {
            width: 60,
            height: 60,
        },
        '@media (max-width: 800px)': {
            width: 40,
            height: 40,
        }
    }
}));


function HumanResource() {
    const { t, i18n } = useTranslation();
    const classes = useStyles();

    return (
      <FieldsWrapper className={classes.root}>
            <Typography variant="h1" className={classes.headerText}>
                {t('agencies.process.header')}
            </Typography>
            <Typography variant="h6" className={classes.headerString}>
                {t('agencies.process.sub')}
            </Typography>
            <Grid container justify="space-between" alignItems="center">
                <Grid container justify="space-between" alignItems="center" className={classes.reverseRow}>
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                        <img src={`/static/img/background/HR1.png`} className={classes.iconWrapper} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={classnames({
                            [classes.fieldWrapper]: true,
                            [classes.fieldTextWrapper]: true,
                        })}
                    >
						<Box className={classes.numberField}>
							<Typography variant="h1" className={classes.headerText}>
								1
							</Typography>
						</Box>
                        <Typography variant="h6" className={classes.headerText}>
                            {t('agencies.process.1.title')}
                        </Typography>
                        <Typography variant="h6" className={classes.headerText}>
                            {t('agencies.process.1.text')}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                        <img src={`/static/img/background/HR2.png`} className={classes.iconWrapper} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={classnames({
                            [classes.fieldWrapper]: true,
                            [classes.fieldTextWrapper]: true,
                        })}
                    >
						<Box className={classes.numberField}>
							<Typography variant="h1" className={classes.headerText}>
							2
							</Typography>
						</Box>
                        <Typography variant="h6" className={classes.headerText}>
                            {t('agencies.process.2.title')}
                        </Typography>
                        <Typography variant="h6" className={classes.headerText}>
                            {t('agencies.process.2.text')}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="space-between" alignItems="center" className={classes.reverseRow}>
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                        <img src={`/static/img/background/HR3.png`} className={classes.iconWrapper} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        className={classnames({
                            [classes.fieldWrapper]: true,
                            [classes.fieldTextWrapper]: true,
                        })}
                    >
						<Box className={classes.numberField}>
							<Typography variant="h1" className={classes.headerText}>
							3
							</Typography>
						</Box>
                        <Typography variant="h6" className={classes.headerText}>
                            {t('agencies.process.3.title')}
                        </Typography>
                        <Typography variant="h6" className={classes.headerText}>
                            {t('agencies.process.3.text')}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <SendRequestButton>{t('global.contact_us')}</SendRequestButton>
      </FieldsWrapper>
    );
}


export default HumanResource;