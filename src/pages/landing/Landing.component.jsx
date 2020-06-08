import React from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Alert from "../../components/alert/Alert.component";
import Button from "../../components/button/Button.component";
import "./Landing.styles.scss";

const Landing = ({ history, auth: { isAuthenticated, user } }) => {
  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home | TaskApp </title>
      </Helmet>
      <div className="landing">
        <div className="landing-logo">
          <img src="logo.png" alt="Logo" />
          <span className="landing-logo-text">TaskApp</span>
        </div>
        <Alert />
        {isAuthenticated ? (
          <div className="landing-info">
            <h4 style={{ fontWeight: "350" }}>
              {user && `Willkommen zurück, ${user.name}!`}
            </h4>

            <br />
            <p style={{ fontSize: "1.1rem", fontWeight: "350" }}>
              Sieh nach was noch zu erledigen ist und erstelle neue Aufgaben.
            </p>
            <Button
              type="button"
              onClick={() => history.push("/tasks")}
              style={{ marginTop: "2rem", backgroundColor: "#0bbbda" }}
            >
              Meine Aufgaben
            </Button>
          </div>
        ) : (
          <div className="landing-info">
            Dies ist ein Aufgaben-Manager, welcher lediglich als
            Portfolioprojekt dient. <br /> Es kann keine Datensicherheit
            garantiert werden. <br />
            <Button
              type="button"
              onClick={() => history.push("/login")}
              style={{ marginTop: "2rem", backgroundColor: "#0bbbda" }}
            >
              Zum Login
            </Button>
          </div>
        )}

        {/* <p className="py-4">
          - Allgemeine Produktivitäts-Tipps <br /> - Erklärung des Konzepts von
          Semoto
        </p> */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps)(Landing);
