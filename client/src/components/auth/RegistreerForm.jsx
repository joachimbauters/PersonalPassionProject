import React from "react";
import styles from "./RegistreerForm.module.css";
import FormInput from "../FormInput";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";

const RegistreerForm = ({ history }) => {
  const naamInput = React.createRef();
  const emailInput = React.createRef();
  const pwdInput = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    history.push(ROUTES.landing);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.titel}>Registreer</h2>
        <div className={styles.formflex}>
          <FormInput
            titel={"Naam"}
            type={"text"}
            name={"naam"}
            id={"naam"}
            placeholder={"jouw naam"}
            ref={naamInput}
          />
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
          <FormInput
            titel={"Bevestig wachtwoord"}
            type={"password"}
            name={"b_wachtwoord"}
            id={"b_wachtwoord"}
            placeholder={"Enter een wachtwoord"}
            ref={pwdInput}
          />
        </div>
        <div>
          <input
            type="submit"
            value="registreer"
            className={styles.registreer}
          />
        </div>
      </form>
    </>
  );
};

export default withRouter(RegistreerForm);
