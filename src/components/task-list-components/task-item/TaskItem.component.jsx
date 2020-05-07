import React from "react";
import "./TaskItem.styles.scss";
import moment from "moment";

// icons
import PriorityHighRoundedIcon from "@material-ui/icons/PriorityHighRounded";

import TaskDialog from "../../dialogs/task-dialog/TaskDialog.component";
import ConfirmActionDialog from "../../dialogs/confirm-action-dialog/ConfirmActionDialog.component";
import { deleteTask } from "../../../redux/tasks/tasks.actions";
import { connect } from "react-redux";

const TaskItem = ({ taskName, importance, notes, dueDate, id, deleteTask }) => {
  let color = "";
  if (importance === "Hoch") color = "red";
  if (importance === "Mittel") color = "orange";

  return (
    <div className="task-item">
      <div className="task-header">
        <h4 className="task-heading">{taskName}</h4>
        {color && <PriorityHighRoundedIcon style={{ color: `${color}` }} />}
      </div>

      <React.Fragment>
        <div className="task-body">
          <p className="importance">{notes}</p>
        </div>
        <div className="task-footer">
          {
            <span className="due-date">
              bis zum {moment(dueDate).format("DD.MM.YYYY")}
            </span>
          }
          <div className="task-controls">
            <span className="task-edit">
              <TaskDialog type="editTask" taskName={taskName} id={id} />
            </span>
            <span className="task-done">
              <ConfirmActionDialog
                confirmedAction={() => deleteTask(id)}
                taskName={taskName}
              />
            </span>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
};

export default connect(null, { deleteTask })(TaskItem);
