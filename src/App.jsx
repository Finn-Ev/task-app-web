import axios from "axios";
import React, { useEffect } from "react";
//redux
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import Alert from "./components/alert/Alert.component";
import PrivateRoute from "./components/HOCs/PrivateRoute";
// pages
import Navbar from "./components/navbar/Navbar.component";
import Landing from "./pages/landing/Landing.component";
import Login from "./pages/login/Login.component";
import Register from "./pages/register/Register.component";
import Settings from "./pages/settings/Settings.component";
import TaskList from "./pages/task-list/TaskList.component";
import { loadUser } from "./redux/auth/auth.actions";
import store from "./redux/store";
//utils
import setAuthToken from "./utils/setAuthToken";

//set base url
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
        <Alert />
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
