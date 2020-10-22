import React from "react";
import { array, func, object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllAdminOrganisations, deleteAdminOrganisations } from '../../../redux/actions/adminOrgsPannel';
import OrganisationsListTable from './OrganisationsListTable';




const propTypes = {
    organisationsList: array,
    getAllAdminOrganisations: func,
    local: object,
    deleteAdminOrganisations: func
};


function AdminOrganisationsList({
    organisationsList,
    getAllAdminOrganisations,
    local,
    deleteAdminOrganisations
}) {
  
  React.useEffect(() => {
    getAllAdminOrganisations(); 
  }, []);
  
  return (
    <div>
        <OrganisationsListTable
            organisationsList={organisationsList}
            local={local}
            deleteAdminOrganisations={deleteAdminOrganisations}
        />
    </div>
  );
}


AdminOrganisationsList.propTypes = propTypes;

const mapStateToProps = (state) =>({
    organisationsList : state.adminOrgsPannel.organisationsList,
    local : state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getAllAdminOrganisations: bindActionCreators(getAllAdminOrganisations, dispatch),
    deleteAdminOrganisations: bindActionCreators(deleteAdminOrganisations, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrganisationsList);