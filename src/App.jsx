import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

// pages
import Navbar from "./components/navbar/Navbar.component";
import Landing from "./pages/landing/Landing.component";
import Login from "./pages/login/Login.component";
import Register from "./pages/register/Register.component";
import Settings from "./pages/settings/Settings.component";
import TaskList from "./pages/task-list/TaskList.component";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { loadUser } from "./redux/auth/auth.actions";

//utils
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/HOCs/PrivateRoute";

//set API url to base url
axios.defaults.baseURL = "https://semoto-api.herokuapp.com/";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/settings" component={Settings} />
            <PrivateRoute exact path="/tasks" component={TaskList} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
