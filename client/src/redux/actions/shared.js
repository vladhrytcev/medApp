import * as c from '../constants/shared';


export const openDeletingDialog = props => ({
  type: c.OPEN_DELETING_DIALOG,
  ...props
});

export const closeDeletingDialog = props => ({
  type: c.CLOSE_DELETING_DIALOG,
  ...props
});