import React from "react";
import styles from "./Logout.module.css";
import { withRouter } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const Logout = () => (
  <AuthContext.Consumer>
    {context => {
      return (
        <>
          <button className={styles.button} onClick={context.logout}>
            Uitloggen
          </button>
        </>
      );
    }}
  </AuthContext.Consumer>
);

export default withRouter(Logout);
