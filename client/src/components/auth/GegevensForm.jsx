import React from "react";
import styles from "./GegevensForm.module.css";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../../constants";

const GegevensForm = ({ history }) => {
  // const naamInput = React.createRef();
  // const emailInput = React.createRef();
  // const pwdInput = React.createRef();
  // const pwd2Input = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    history.push(ROUTES.landing);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.titel}>Persoonlijke gegevens</h2>
        <div className={styles.formflex}></div>
        <div>
          <input type="submit" value="Opslaan" className={styles.registreer} />
        </div>
      </form>
    </>
  );
};

export default withRouter(GegevensForm);
