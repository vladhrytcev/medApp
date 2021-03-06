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
import UsersListTable from './UsersListTable';


const propTypes = {
  getAllAdminPersonUsers: func,
  usersList: array,
  adminPersonPannel: object,
  local: object,
  deletePersonUsers: func,
  match: object,
};


function AdminPersonUsersList({
  getAllAdminPersonUsers,
  usersList,
  adminPersonPannel,
  local,
  deletePersonUsers,
  match,
}) {
  
  React.useEffect(() => {
    getAllAdminPersonUsers('USER'); 
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


AdminPersonUsersList.propTypes = propTypes;

const mapStateToProps = (state) =>({
    usersList: state.adminPersonPannel.usersList,
    adminPersonPannel: state.adminPersonPannel,
    local: state.local,
});

const mapDispatchToProps = (dispatch) => ({
    getAllAdminPersonUsers: bindActionCreators(getAllAdminPersonUsers, dispatch),
    deletePersonUsers: bindActionCreators(deletePersonUsers, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPersonUsersList);