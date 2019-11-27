import React from "react";
import styles from "./LoginForm.module.css";
import FormInput from "../FormInput";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import facebook_icon from "../../assets/facebook.svg";
import { ROUTES } from "../../constants";

const LoginForm = ({ history }) => {
  const emailInput = React.createRef();
  const pwdInput = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    history.push(ROUTES.landing);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.titel}>Login</h2>
        <div className={styles.formflex}>
          <FormInput
            titel={"Email adres"}
            type={"email"}
            name={"email"}
            id={"email"}
            placeholder={"you@mail.com"}
            ref={emailInput}
          />
          <FormInput
            titel={"Wachtwoord"}
            type={"password"}
            name={"wachtwoord"}
            id={"wachtwoord"}
            placeholder={"Enter een wachtwoord"}
            ref={pwdInput}
          />
        </div>
        <div>
          <button className={styles.facebook}>
            <img src={facebook_icon} alt="facebook_icon"></img>
            <p>Log in met Facebook</p>
          </button>
          <input type="submit" value="login" className={styles.btn} />
        </div>
        <div className={styles.registreer}>
          <NavLink exact={true} to={ROUTES.registreer}>
            Registreer
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default withRouter(LoginForm);
