//icons
import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import "./Settings.styles.scss";

const Profile = ({ user }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Einstellungen | TaskApp </title>
      </Helmet>
      <div className="settings-wrapper">
        <div className="settings">
          <h2>Einstellungen</h2>
          {/* <p>Du kannst deine Daten jederzeit ändern</p> */}
          <hr className="line" />
          <div className="settings-content">
            <div className="settings-categories">
              <span>Name</span>
              <span>Email</span>
              <span>Passwort</span>
            </div>
            <div className="settings-values">
              <span className="name">{user?.name}</span>
              <span className="email">{user?.email}</span>
              <span className="password">********</span>
            </div>
          </div>
          {/* <div className="settings-actions">
            <span className="edit-user">
              <EditIcon />
            </span>
            <span className="delete-user">
              <DeleteIcon />
            </span>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = ({ auth: { user } }) => ({
  user,
});

export default connect(mapStateToProps)(Profile);
