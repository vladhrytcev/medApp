import React, {useEffect, Fragment} from "react";
import ExterneAnfagen from './ExterneAnfagen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllOrganizationJobs } from '../../../redux/actions/organizationJobs';

function ExterneAnfagenContainer({
  getAllOrganizationJobs,
}) {

  useEffect(() => {
    getAllOrganizationJobs("id");
  }, []);

  return (
    <ExterneAnfagen/>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAllOrganizationJobs: bindActionCreators(getAllOrganizationJobs, dispatch),
});

export default connect(null, mapDispatchToProps)(ExterneAnfagenContainer);
