import { combineReducers } from "redux";
import { tasksReducer } from "./tasks/tasks.reducer";
import { authReducer } from "./auth/auth.reducer";
import { alertReducer } from "./alert/alert.reducer";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  auth: authReducer,
  alert: alertReducer,
});

export default rootReducer;
