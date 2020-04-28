import React, { useState } from 'react';
import moment from 'moment';
import './TaskForm.styles.scss';

import { useTaskForm } from '../../../utils/form-validation/useTaskForm';
import { validateForm } from '../../../utils/form-validation/validateForm';

import Button from '../../button/Button.component';
import SwapVertRoundedIcon from '@material-ui/icons/SwapVertRounded';

//redux
import { connect } from 'react-redux';
import { createTask, updateTask } from '../../../redux/tasks/tasks.actions';

const TaskForm = ({ closeDialog, type, createTask, updateTask, tasks, id }) => {
  const validationSuccessHandler = () => {
    if (type === 'create') {
      createTask(taskName, dueDate, selectedImportance.option, notes);
    } else {
      updateTask(id, dueDate, selectedImportance.option, notes);
    }
    closeDialog();
  };

  // taskdata to be prefilled when editing the task
  let taskData = tasks.filter(({ _id }) => _id === id)[0];

  // only relevant for importance selection
  const importanceOptions = [
    { option: 'Niedrig', color: 'lightgrey' },
    { option: 'Mittel', color: 'orange' },
    { option: 'Hoch', color: 'red' }
  ];

  const initialImportance = taskData
    ? importanceOptions.find(({ option }) => option === taskData.importance)
    : importanceOptions[1];

  const [selectedImportance, setSelectedImportance] = useState(
    initialImportance
  );
  const handleImportanceSwap = () => {
    if (selectedImportance.option === importanceOptions[0].option)
      setSelectedImportance(importanceOptions[1]);
    else if (selectedImportance.option === importanceOptions[1].option)
      setSelectedImportance(importanceOptions[2]);
    else setSelectedImportance(importanceOptions[0]);
  };

  const { handleChange, handleSubmit, formData, errors } = useTaskForm(
    validationSuccessHandler,
    validateForm,
    taskData
  );
  const { taskName, notes, dueDate } = formData;

  return (
    <div className="task-form">
      <form
        noValidate
        autoComplete="off"
        className="form"
        onSubmit={e => handleSubmit(e)}
      >
        {type === 'create' && (
          <div className="input-wrapper">
            <input
              className="input"
              type="text"
              placeholder="Aufgabentitel"
              name="taskName"
              onChange={e => handleChange(e)}
              value={taskName}
            />
            <span className="error-text">
              {errors.taskName ? errors.taskName : ''}
            </span>
          </div>
        )}

        <div className="text-area-wrapper">
          <textarea
            onChange={e => handleChange(e)}
            value={notes}
            name="notes"
            placeholder=" Notizen (optional)"
          ></textarea>
          <span className="error-text">{errors.notes ? errors.notes : ''}</span>
        </div>

        <div className="input-wrapper">
          <p>
            Wichtigkeit:&nbsp;
            <span style={{ color: `${selectedImportance.color}` }}>
              {selectedImportance.option}
            </span>
            <SwapVertRoundedIcon
              onClick={handleImportanceSwap}
              style={{ cursor: 'pointer' }}
            />
          </p>
        </div>

        <div className="input-wrapper">
          <input
            value={dueDate}
            onChange={e => handleChange(e)}
            name="dueDate"
            className="input"
            type="text"
            placeholder="Zu erledigen bis: (TT.MM.JJJJ)"
          />
          <span className="error-text">
            {errors.dueDate ? errors.dueDate : ''}
          </span>
        </div>
        <Button
          type="submit"
          style={{ backgroundColor: '#0bbbda', margin: '2rem auto' }}
        >
          {type === 'create' ? 'Erstellen' : 'Bestätigen'}
        </Button>
      </form>
    </div>
  );
};

const mapStateToProps = ({ tasks: { allTasks } }) => ({
  tasks: allTasks
});

export default connect(mapStateToProps, { createTask, updateTask })(TaskForm);
