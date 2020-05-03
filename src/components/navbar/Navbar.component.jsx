import React, { useState } from "react";
import "./Navbar.styles.scss";
import { NavLink, withRouter } from "react-router-dom";

// icons
import DoubleArrowRoundedIcon from "@material-ui/icons/DoubleArrowRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { connect } from "react-redux";
import { logoutUser } from "../../redux/auth/auth.actions";
import { setAlert } from "../../redux/alert/alert.actions";

const Navbar = ({
  auth: { isAuthenticated, loading },
  logoutUser,
  setAlert,
  history,
}) => {
  const handleLogout = () => {
    logoutUser();
    setAlert("Du wurdest ausgeloggt", "success");
    history.push("/");
  };
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="logo ">
          <span className="nav-link ">
            <span className="link-text logo-text">TaskApp</span>
            <DoubleArrowRoundedIcon className="nav-toggler" />
          </span>
        </li>

        <li className="nav-item">
          <NavLink exact to="/" className="nav-link">
            <HomeRoundedIcon className="nav-icon" />
            <span className="link-text">Home</span>
          </NavLink>
        </li>

        {isAuthenticated && !loading ? (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/tasks" className="nav-link">
                <FormatListBulletedIcon className="nav-icon" />
                <span className="link-text">Aufgaben</span>
              </NavLink>
            </li>

            <li className="nav-item ">
              <NavLink to="/settings" className="nav-link ">
                <SettingsRoundedIcon className="nav-icon" />
                <span className="link-text">Einstellungen</span>
              </NavLink>
            </li>

            <li className="nav-item logout">
              <span className="nav-link " onClick={handleLogout}>
                <ExitToAppIcon className="nav-icon" />
                <span className="link-text">Ausloggen</span>
              </span>
            </li>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                <ExitToAppIcon className="nav-icon" />
                <span className="link-text">Einloggen</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                <PersonAddIcon className="nav-icon" />
                <span className="link-text">Registrieren</span>
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default withRouter(
  connect(mapStateToProps, { logoutUser, setAlert })(Navbar)
);
