import React from "react";
import { func, object, array } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { NavLink as RouterNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import OrganisationPicturesForm from "./OrganisationPicturesForm";
import {
    getOrganisationById,
    editOrganisationPicById
} from '../../../redux/actions/adminOrgsPannel';

import {
    Divider,
    Breadcrumbs,
    LogoWraper
  } from './styledComponent';



const propTypes = {
    currentOrganisation: object,
    match: object,
    local: object,
    getOrganisationById: func,
    editOrganisationPicById: func
};


const NavLink = React.forwardRef((props, ref) => (
    <RouterNavLink innerRef={ref} {...props} />
));


function AdminOrganisationPictures({
    match,
    currentOrganisation,
    getOrganisationById,
    local,
    editOrganisationPicById
}) {
    
    React.useEffect(() => {
        if(isEmpty(currentOrganisation)) {
            const id = match.params.orgId;
            getOrganisationById(id);
        }
    }, []);

    const handleEditCurrentOrganisationPicture = (id, picId, arr) => {
        editOrganisationPicById(id, picId, arr);
    }

  
    return (
        <div>
            {
                !isEmpty(currentOrganisation) &&
                    <>
                        <Typography variant="h3" gutterBottom display="inline">
                            Organisation "{currentOrganisation.name}" pictures
                        </Typography>

                        <Divider my={6} />

                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                            <Breadcrumbs aria-label="Breadcrumb" mt={2}>
                                <Link component={NavLink} exact to={`/${local.language}/admin/organisation`}>
                                    Organisations List
                                </Link>
                                <Link component={NavLink} exact to={`/${local.language}/admin/organisation/${currentOrganisation.id}`}>
                                    Organisation "{currentOrganisation.name}""
                                </Link>
                                <Typography>Organisation {currentOrganisation.name} pictures</Typography>
                            </Breadcrumbs>
                            <OrganisationPicturesForm
                                match={match}
                                currentOrganisation={currentOrganisation}
                                local={local}
                                picture={currentOrganisation.pics.filter(el => el.id === match.params.picId)[0]}
                                editCurrentOrganisationPicture={handleEditCurrentOrganisationPicture}
                            />
                            </Grid>
                        </Grid>
                    </>
            }
        </div>
    );
}


AdminOrganisationPictures.propTypes = propTypes;

const mapStateToProps = (state) =>({
    currentOrganisation: state.adminOrgsPannel.currentOrganisation,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getOrganisationById: bindActionCreators(getOrganisationById, dispatch),
    editOrganisationPicById: bindActionCreators(editOrganisationPicById, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrganisationPictures);