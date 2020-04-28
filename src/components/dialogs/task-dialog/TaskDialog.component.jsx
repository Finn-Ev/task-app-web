import React, { useState } from 'react';
import './TaskDialog.styles.scss';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import AddIcon from '@material-ui/icons/Add';
import EditRoundedIcon from '@material-ui/icons/EditRounded';

import TaskForm from '../../task-list-components/task-form/TaskForm.component';

const TaskDialog = ({ type, taskName, id }) => {
  const [open, setOpen] = useState(false);

  if (type === 'newTask') {
    return (
      <React.Fragment>
        <span onClick={() => setOpen(true)}>
          Neu&nbsp; <AddIcon />
        </span>
        <Dialog
          className="task-dialog"
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="task-dialog-title"
        >
          <DialogActions>
            <span className="task-dialog-close" onClick={() => setOpen(false)}>
              X
            </span>
          </DialogActions>
          <DialogContent>
            <h4 className="task-dialog-header">Neue Aufgabe erstellen</h4>
            <TaskForm closeDialog={() => setOpen(false)} type="create" />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  } else if (type === 'editTask') {
    return (
      <React.Fragment>
        <span onClick={() => setOpen(true)}>
          <EditRoundedIcon />
        </span>
        <Dialog
          className="task-dialog"
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="task-dialog-title"
        >
          <DialogActions>
            <span className="task-dialog-close" onClick={() => setOpen(false)}>
              X
            </span>
          </DialogActions>
          <DialogContent>
            <h4 className="task-dialog-header">"{taskName}" bearbeiten</h4>
            <TaskForm
              closeDialog={() => setOpen(false)}
              type="edit"
              taskName={taskName}
              id={id}
            />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default TaskDialog;
