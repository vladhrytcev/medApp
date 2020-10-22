import React, {useEffect, Fragment} from "react";
import OffeneShifts from './OffeneShifts';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllOrganizationJobs } from '../../../redux/actions/organizationJobs';

function OffeneShiftsContainer({
  getAllOrganizationJobs,
}) {

  useEffect(() => {
    getAllOrganizationJobs("id");
  }, []);

  return (
    <OffeneShifts/>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getAllOrganizationJobs: bindActionCreators(getAllOrganizationJobs, dispatch),
});

export default connect(null, mapDispatchToProps)(OffeneShiftsContainer);
