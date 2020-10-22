import React from "react";
import { array, func, object } from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../../../components/Loader';
import {
  getAllAdminPersonUsers,
  deletePersonUsers,
} from '../../../redux/actions/adminPersonPannel';
import UsersListTable from '../AdminPersonUsersList/UsersListTable';


const propTypes = {
  getAllAdminPersonUsers: func,
  usersList: array,
  adminPersonPannel: object,
  local: object,
  deletePersonUsers: func,
  match: object,
};


function AdminPersonOrgsList({
  getAllAdminPersonUsers,
  usersList,
  adminPersonPannel,
  local,
  deletePersonUsers,
  match,
}) {
  
  React.useEffect(() => {
    getAllAdminPersonUsers("ORG_ADMIN");
  }, []);
  
  return (
    <div>
        {
          (isEmpty(usersList) && adminPersonPannel.isLoading) ?
          <Loader /> :
          <UsersListTable
            usersList={usersList}
            deletePersonUsers={deletePersonUsers}
            local={local}
            personType={match.path.split('/').slice(4)}
          />
        }
    </div>
  );
}


AdminPersonOrgsList.propTypes = propTypes;

const mapStateToProps = (state) =>({
    usersList: state.adminPersonPannel.usersList,
    adminPersonPannel: state.adminPersonPannel,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getAllAdminPersonUsers: bindActionCreators(getAllAdminPersonUsers, dispatch),
    deletePersonUsers: bindActionCreators(deletePersonUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPersonOrgsList);