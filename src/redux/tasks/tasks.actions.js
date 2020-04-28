import axios from 'axios';
import {
  GET_TASKS,
  TASK_ERROR,
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK
} from './tasks.types';
import { setAlert } from '../alert/alert.actions';
import { formatStringToDate } from '../../utils/formatStringToDate';

export const createTask = (
  taskName,
  dueDate,
  importance,
  notes = ''
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const dbDate = formatStringToDate(dueDate);
  console.log(dbDate);

  const body = JSON.stringify({ taskName, dueDate: dbDate, importance, notes });

  try {
    const res = await axios.post('/api/tasks', body, config);

    dispatch({
      type: CREATE_TASK,
      payload: res.data
    });
  } catch (error) {
    dispatch({ type: TASK_ERROR });
    dispatch(setAlert('Etwas ist schief gelaufen', 'danger'));
  }
};

export const deleteTask = taskId => async dispatch => {
  try {
    await axios.delete(`/api/tasks/${taskId}`);

    dispatch({
      type: DELETE_TASK,
      payload: taskId
    });
  } catch (error) {
    dispatch({ type: TASK_ERROR });
    dispatch(setAlert('Etwas ist schief gelaufen', 'danger'));
  }
};

export const updateTask = (
  taskId,
  dueDate,
  importance,
  notes = ''
) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const dbDate = formatStringToDate(dueDate);
  const body = JSON.stringify({ dueDate: dbDate, importance, notes });

  try {
    const res = await axios.put(`/api/tasks/${taskId}`, body, config);

    dispatch({
      type: UPDATE_TASK,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: TASK_ERROR });
    dispatch(setAlert('Etwas ist schief gelaufen', 'danger'));
  }
};

export const fetchTasks = sortBy => async dispatch => {
  try {
    const res = await axios.get(`/api/tasks/${sortBy}`);

    dispatch({
      type: GET_TASKS,
      payload: res.data.tasks
    });
  } catch (err) {
    dispatch({ type: TASK_ERROR });
    dispatch(setAlert('Etwas ist schief gelaufen', 'danger'));
  }
};
