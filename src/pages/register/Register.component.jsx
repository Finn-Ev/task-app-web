import React, { useState } from "react";
import { Helmet } from "react-helmet";
//redux
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import Button from "../../components/button/Button.component";
import { registerUser } from "../../redux/auth/auth.actions";
import "../../styles/auth-form.scss";
import { useAuthForm } from "../../utils/form-validation/useAuthForm";
import { validateForm } from "../../utils/form-validation/validateForm";

const Register = ({ registerUser, isAuthenticated }) => {
  const [submitted, setSubmitted] = useState(false);

  const validationSuccess = () => {
    registerUser({ name, email, password });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  const { handleChange, handleSubmit, formData, errors } = useAuthForm(
    validationSuccess,
    validateForm,
    "register"
  );
  const { name, email, password, password2 } = formData;

  if (isAuthenticated) {
    return <Redirect to="/tasks" />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Registrieren | TaskApp </title>
      </Helmet>
      <div className="form-wrapper">
        <div className="auth-form pt-5">
          <h3 className="mb-3">Registrieren</h3>
          <p className="pb-2">Hier kannst du deinen Account erstellen</p>

          <form
            noValidate
            autoComplete="off"
            className="form"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="input-wrapper">
              <input
                className="input"
                type="text"
                placeholder="Name"
                name="name"
                required
                minLength={3}
                onChange={(e) => handleChange(e)}
                value={name}
                autoComplete="off"
              />
              <span className="error-text">{errors.name}</span>
            </div>

            <div className="input-wrapper">
              <input
                className="input"
                type="email"
                placeholder="Email Adresse"
                name="email"
                onChange={(e) => handleChange(e)}
                value={email}
                autoComplete="off"
              />
              <span className="error-text">{errors.email}</span>
            </div>
            <div className="input-wrapper">
              <input
                className="input"
                type="password"
                placeholder="Passwort"
                name="password"
                minLength={6}
                onChange={(e) => handleChange(e)}
                value={password}
              />
              <span className="error-text">{errors.password}</span>
            </div>
            <div className="input-wrapper">
              <input
                className="input"
                type="password"
                placeholder="Passwort bestätigen"
                name="password2"
                minLength={6}
                onChange={(e) => handleChange(e)}
                value={password2}
              />
              <span className="error-text">{errors.password2}</span>
            </div>
            <Button
              type="submit"
              style={{ marginTop: "2rem", backgroundColor: "#0bbbda" }}
            >
              {submitted ? (
                <MoonLoader size={20} loading={submitted} />
              ) : (
                "Registrieren"
              )}
            </Button>
          </form>

          <p className="my-3 form-redirect">
            Du hast bereits einen Account? <Link to="/login">Einloggen</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated,
});

export default connect(mapStateToProps, { registerUser })(Register);
