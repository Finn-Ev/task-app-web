import React, { useEffect } from 'react';
import './TaskList.styles.scss';
import TaskItem from '../../components/task-list-components/task-item/TaskItem.component';
import TaskListMenu from '../../components/task-list-components/task-list-menu/TaskListMenu.component';
import { Helmet } from 'react-helmet';
import Alert from '../../components/alert/Alert.component';

// redux
import { connect } from 'react-redux';
import { fetchTasks } from '../../redux/tasks/tasks.actions';

const TaskList = ({ tasks, loadingTasks }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Übersicht | Semoto </title>
      </Helmet>
      <div className="task-list">
        <h3 className="task-list-header">Offene Aufgaben</h3>
        <TaskListMenu />
        <Alert />
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
            <p className="spinner">Lädt...</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ tasks: { allTasks, loading } }) => ({
  tasks: allTasks,
  loadingTasks: loading
});

export default connect(mapStateToProps, { fetchTasks })(TaskList);
