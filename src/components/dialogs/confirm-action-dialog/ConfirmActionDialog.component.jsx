import React, { useState } from 'react';
import './ConfirmActionDialog.styles.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CancelIcon from '@material-ui/icons/Cancel';

import CheckRoundedIcon from '@material-ui/icons/CheckRounded';

const ConfirmActionDialog = ({ taskName, confirmedAction }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <span onClick={handleClickOpen}>
        <CheckRoundedIcon />
      </span>
      <Dialog
        className="confirm-action-dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="confirm-action-dialog"
      >
        <DialogContent>
          <h4 className="confirm-action-dialog-heading">
            "{taskName}" als erledigt markieren?
          </h4>
          <div className="confirm-action-dialog-icons">
            <CheckRoundedIcon
              onClick={() => confirmedAction()}
              className="confirm-action-dialog-icon-done"
            />
            <CancelIcon
              onClick={handleClose}
              className="confirm-action-dialog-icon-cancel"
            />
          </div>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmActionDialog;
