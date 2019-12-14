import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styles from "./LoginForm.module.css";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";
import LOGIN_USER from "../../graphql/loginUser";
import AuthContext from "../../context/auth-context";
import loader from "../../assets/preloadlogin.svg";

class LoginForm extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.wachtwoordEl = React.createRef();
  }
  submitHandler = (e, login) => {
    e.preventDefault();

    const email = this.emailEl.current.value;
    const wachtwoord = this.wachtwoordEl.current.value;

    if (email.trim().length === 0 || wachtwoord.trim().length === 0) {
      return;
    }

    login({
      variables: {
        email: email,
        wachtwoord: wachtwoord
      }
    });

    this.emailEl.current.value = "";
    this.wachtwoordEl.current.value = "";
  };
  render() {
    return (
      <Mutation
        mutation={LOGIN_USER}
        update={(cache, { data: { login } }) => {
          if (login.token) {
            this.context.login(
              login.token,
              login.userId,
              login.tokenExpiration
            );
          }
        }}
      >
        {(login, { loading, error }) => (
          <>
            <form
              className={styles.form}
              onSubmit={e => this.submitHandler(e, login)}
            >
              <h2 className={styles.titel}>Login</h2>
              <div className={styles.formflex}>
                {loading ? (
                  <p className={styles.loading}>aan het inloggen...</p>
                ) : (
                  <></>
                )}
                {error ? (
                  <p className={styles.error}>Verkeerde login</p>
                ) : (
                  <></>
                )}
                <div className={styles.formFlex2}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email adres
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={this.emailEl}
                    placeholder="you@mail.com"
                    className={styles.formInput}
                    required
                  />
                </div>
                <div className={styles.formFlex2}>
                  <label htmlFor={"wachtwoord"} className={styles.formLabel}>
                    Wachtwoord
                  </label>
                  <input
                    type="password"
                    name="wachtwoord"
                    id="wachtwoord"
                    ref={this.wachtwoordEl}
                    placeholder="Enter een wachtwoord"
                    className={styles.formInput}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <button className={styles.btn}>
                    <img src={loader} alt="loader" className={styles.loader} />
                  </button>
                ) : (
                  <input type="submit" value="login" className={styles.btn} />
                )}
                <div className={styles.registreer}>
                  <NavLink exact={true} to={ROUTES.registreer}>
                    Registreer
                  </NavLink>
                </div>
              </div>
            </form>
          </>
        )}
      </Mutation>
    );
  }
}

export default withRouter(LoginForm);
