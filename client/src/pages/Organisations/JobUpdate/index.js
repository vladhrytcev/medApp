import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import NursesJobUpload from '../JobUpload/NursesJobUpload';
import MedicalsJobUpload from '../JobUpload/MedicalsJobUpload';


function JobUpdate({location}) {

  if (location.state && location.state.state.toLowerCase().includes("external")) {
    return <MedicalsJobUpload/>
  } 
  else if ((location.state && location.state.state.toLowerCase().includes("internal"))) {
    return <NursesJobUpload/>
  }
}

export default withRouter(JobUpdate);