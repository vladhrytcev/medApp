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
  getCurrentAgencyUser,
  editCurrentAgencyUser,
  getAgencyById
} from '../../../redux/actions/adminPannel';
import AdminAgencyUserProfile from './AdminAgencyUserProfile';

import {
    Divider,
    Breadcrumbs,
  } from './styledComponent';



const propTypes = {
    currentAgencyUser: object,
    match: object,
    getCurrentAgencyUser: func,
    local: object,
    editCurrentAgencyUser: func,
    getAgencyById: func,
    currentAgency: object
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminAgencyUsers({
    match,
    local,
    currentAgencyUser,
    getCurrentAgencyUser,
    editCurrentAgencyUser,
    getAgencyById,
    currentAgency
}) {
    React.useEffect(() => {
        const id = match.params.user;
        const agencyId = match.params.id;
        getCurrentAgencyUser(id);
        getAgencyById(agencyId);
    }, []);
  
    return (
        <div>
            {!isEmpty(currentAgencyUser) && !isEmpty(currentAgency) &&
                <>
                    <Typography variant="h3" gutterBottom display="inline">
                        Agency User "{currentAgencyUser.firstName}&nbsp;{currentAgencyUser.lastName}"
                    </Typography>

                    <Divider my={6} />

                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                                <Link component={NavLink} exact to={`/${local.language}/admin/agencies`}>
                                    Agencies List
                                </Link>
                                <Link component={NavLink} exact to={`/${local.language}/admin/agencies/${match.params.id}`}>
                                    Agency {currentAgency.name}
                                </Link>
                                <Typography>Agency User {currentAgencyUser.firstName}&nbsp;{currentAgencyUser.lastName}</Typography>
                            </Breadcrumbs>
                            <AdminAgencyUserProfile
                                currentAgencyUser={currentAgencyUser}
                                editCurrentAgencyUser={editCurrentAgencyUser}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        </div>
    );
}


AdminAgencyUsers.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentAgencyUser: state.adminPannel.currentAgencyUser,
    currentAgency: state.adminPannel.currentAgency,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getCurrentAgencyUser: bindActionCreators(getCurrentAgencyUser, dispatch),
    editCurrentAgencyUser: bindActionCreators(editCurrentAgencyUser, dispatch),
    getAgencyById: bindActionCreators(getAgencyById, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAgencyUsers);