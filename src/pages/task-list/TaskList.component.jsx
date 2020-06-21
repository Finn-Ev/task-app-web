import React from "react";
import { Helmet } from "react-helmet";
// redux
import { connect } from "react-redux";
import MoonLoader from "react-spinners/MoonLoader";
import TaskItem from "../../components/task-list-components/task-item/TaskItem.component";
import TaskListMenu from "../../components/task-list-components/task-list-menu/TaskListMenu.component";
import { fetchTasks } from "../../redux/tasks/tasks.actions";
import "./TaskList.styles.scss";

const TaskList = ({ tasks, loadingTasks }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Aufgaben | TaskApp</title>
      </Helmet>
      <div className="task-list">
        <h3 className="task-list-header">Offene Aufgaben</h3>
        <TaskListMenu />

        <div className="task-wrapper">
          {tasks.length ? (
            tasks.map(({ taskName, notes, dueDate, importance, _id }) => (
              <TaskItem
                key={_id}
                id={_id}
                taskName={taskName}
                notes={notes}
                dueDate={dueDate}
                importance={importance}
              />
            ))
          ) : !loadingTasks ? (
            <h4 className="no-pending-tasks">
              Du hast keine ausstehenden Aufgaben
            </h4>
          ) : (
            <MoonLoader size={80} color={"#fff"} loading={loadingTasks} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ tasks: { allTasks, loading } }) => ({
  tasks: allTasks,
  loadingTasks: loading,
});

export default connect(mapStateToProps, { fetchTasks })(TaskList);
