import React from "react";
import styles from "./GegevensForm.module.css";
import FormInput from "../FormInput";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";

const GegevensForm = ({ history }) => {
  const naamInput = React.createRef();
  const emailInput = React.createRef();
  const pwdInput = React.createRef();
  const pwd2Input = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    history.push(ROUTES.landing);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.titel}>Persoonlijke gegevens</h2>
        <div className={styles.formflex}>
          <FormInput
            titel={"Naam"}
            type={"text"}
            name={"naam"}
            id={"naam"}
            value={"Emilee Simchenko"}
            placeholder={""}
            ref={naamInput}
          />
          <FormInput
            titel={"Email adres"}
            type={"email"}
            name={"email"}
            id={"email"}
            value={"emilee.simchenko@gmail.com"}
            placeholder={""}
            ref={emailInput}
          />
          <FormInput
            titel={"Wachtwoord"}
            type={"password"}
            name={"wachtwoord"}
            id={"wachtwoord"}
            value={"kip"}
            placeholder={""}
            ref={pwdInput}
          />
          <FormInput
            titel={"Bevestig wachtwoord"}
            type={"password"}
            name={"b_wachtwoord"}
            id={"b_wachtwoord"}
            value={"kip"}
            placeholder={""}
            ref={pwd2Input}
          />
        </div>
        <div>
          <input type="submit" value="Opslaan" className={styles.registreer} />
        </div>
      </form>
    </>
  );
};

export default withRouter(GegevensForm);
