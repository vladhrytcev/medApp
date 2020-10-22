import React from "react";
import { array, func, object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllAdminAgencies } from '../../../redux/actions/adminPannel';
import AgenciesListTable from './AgenciesListTable';
import { deleteAdminAgencies } from '../../../redux/actions/adminPannel';



const propTypes = {
    agenciesList: array,
    getAllAdminAgencies: func,
    local: object,
    deleteAdminAgencies: func
};


function AdminAgenciesList({
    agenciesList,
    getAllAdminAgencies,
    local,
    deleteAdminAgencies
}) {
  
  React.useEffect(() => {
    getAllAdminAgencies(); 
  }, []);
  
  return (
    <div>
        {!isEmpty(agenciesList) && 
            <>
                <AgenciesListTable
                    agenciesList={agenciesList}
                    local={local}
                    deleteAdminAgencies={deleteAdminAgencies}
                />
            </>
        }
    </div>
  );
}


AdminAgenciesList.propTypes = propTypes;

const mapStateToProps = (state) =>({
    agenciesList : state.adminPannel.agenciesList,
    local : state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getAllAdminAgencies: bindActionCreators(getAllAdminAgencies, dispatch),
    deleteAdminAgencies: bindActionCreators(deleteAdminAgencies, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAgenciesList);