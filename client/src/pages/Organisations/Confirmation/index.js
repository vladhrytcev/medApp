import React, {useEffect, Fragment} from "react";
import Confirmation from './Confirmation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllOrganizationJobs } from '../../../redux/actions/organizationJobs';

function ConfirmationContainer({
  getAllOrganizationJobs,
}) {

  useEffect(() => {
    getAllOrganizationJobs("id");
  }, []);

  return (
    <Confirmation/>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAllOrganizationJobs: bindActionCreators(getAllOrganizationJobs, dispatch),
});

export default connect(null, mapDispatchToProps)(ConfirmationContainer);
