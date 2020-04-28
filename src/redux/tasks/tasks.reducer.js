import {
  GET_TASKS,
  TASK_ERROR,
  CREATE_TASK,
  UPDATE_TASK,
  SORT_TASKS,
  DELETE_TASK
} from './tasks.types';

const initialState = { allTasks: [], loading: true };

export const tasksReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TASKS:
    case SORT_TASKS:
      return {
        ...state,
        allTasks: payload,
        loading: false
      };
    case CREATE_TASK:
      return {
        ...state,
        allTasks: [payload, ...state.allTasks],
        loading: false
      };
    case UPDATE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.map(task =>
          task._id === payload._id ? { ...payload } : task
        ),
        loading: false
      };
    case DELETE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.filter(({ _id }) => _id !== payload),
        loading: false
      };
    case TASK_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
