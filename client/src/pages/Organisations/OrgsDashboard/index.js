import React, {useEffect, Fragment} from "react";
import ExterneAnfagen from '../ExterneAnfagen/ExterneAnfagen';
import Confirmation from '../Confirmation/Confirmation';
import OffeneShifts from '../OffeneShifts/OffeneShifts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllOrganizationJobs } from '../../../redux/actions/organizationJobs';

function OrgsDashboard({
  getAllOrganizationJobs,
}) {

  useEffect(() => {
    getAllOrganizationJobs("id");
  }, []);

  return (
    <Fragment>
      <ExterneAnfagen/>
      <Confirmation/>
      <OffeneShifts/>
    </Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAllOrganizationJobs: bindActionCreators(getAllOrganizationJobs, dispatch),
});

export default connect(null, mapDispatchToProps)(OrgsDashboard);
