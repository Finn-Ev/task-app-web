import React from 'react';
import '../../styles/auth-form.scss';
import { Link, Redirect } from 'react-router-dom';
import Button from '../../components/button/Button.component';
import { useAuthForm } from '../../utils/form-validation/useAuthForm';
import { validateForm } from '../../utils/form-validation/validateForm';
import { Helmet } from 'react-helmet';
import Alert from '../../components/alert/Alert.component';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../../redux/auth/auth.actions';

const Login = ({ loginUser, isAuthenticated }) => {
  const { handleChange, handleSubmit, formData, errors } = useAuthForm(
    () => loginUser(email, password),
    validateForm,
    'login'
  );
  const { email, password } = formData;

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Einloggen | Semoto </title>
      </Helmet>

      <div className="form-wrapper">
        <div className="auth-form pt-5">
          <h3 className="mb-3">Einloggen</h3>
          <p className="pb-2">Hier kannst du dich Anmelden</p>
          <Alert />
          <form noValidate className="form" onSubmit={e => handleSubmit(e)}>
            <div className="input-wrapper">
              <input
                className="input"
                type="email"
                placeholder="Email Adresse"
                name="email"
                onChange={e => handleChange(e)}
                value={email}
              />
              <span className="error-text">{errors?.email}</span>
            </div>
            <div className="input-wrapper">
              <input
                className="input"
                type="password"
                placeholder="Passwort"
                name="password"
                minLength={6}
                onChange={e => handleChange(e)}
                value={password}
              />
              <span className="error-text">
                {errors.password && 'Ihr Passwort ist min. sechs Zeichen lang'}
              </span>
            </div>

            <Button
              type="submit"
              style={{ marginTop: '2rem', backgroundColor: '#0bbbda' }}
            >
              Einloggen
            </Button>
          </form>
          <p className="my-3 form-redirect">
            Du hast noch keinen Account?{' '}
            <Link to="/register">Registrieren</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({
  isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);
