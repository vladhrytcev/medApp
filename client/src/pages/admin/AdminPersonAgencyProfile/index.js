import React from "react";
import { func, object, array } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {
    getUserById,
    editCurrentUser,
} from '../../../redux/actions/adminPersonPannel';
import PersonAgencyProfile from './PersonAgencyProfile';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';



const propTypes = {
    match: object,
    local: object,
    editCurrentUser: func,
    getUserById: func,
    currentUser: object
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminPersonAgencyProfile({
    match,
    local,
    currentUser,
    editCurrentUser,
    getUserById,
}) {
    React.useEffect(() => {
        const id = match.params.id;
        getUserById(id);
    }, []);
  
    return (
        <div>
            {!isEmpty(currentUser) &&
                <>
                    <Typography variant="h3" gutterBottom display="inline">
                        User "{currentUser.firstName}&nbsp;{currentUser.lastName}"
                    </Typography>

                    <Divider my={6} />

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                                <Link component={NavLink} exact to={`/${local.language}/admin/persons/users`}>
                                    Agencies Admins List
                                </Link>
                                <Typography>Agency Admin {currentUser.firstName}&nbsp;{currentUser.lastName}</Typography>
                            </Breadcrumbs>
                            <PersonAgencyProfile
                                currentUser={currentUser}
                                local={local}
                                editCurrentUser={editCurrentUser}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}


AdminPersonAgencyProfile.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentUser: state.adminPersonPannel.currentUser,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    editCurrentUser: bindActionCreators(editCurrentUser, dispatch),
    getUserById: bindActionCreators(getUserById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPersonAgencyProfile);