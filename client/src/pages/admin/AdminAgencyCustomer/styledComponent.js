import styled from "styled-components";

import {
  Divider as MuiDivider,
  Breadcrumbs as MuiBreadcrumbs,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";



export const Divider = styled(MuiDivider)`
    margin: 10px 0 20px!important;
`;

export const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);
