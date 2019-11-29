import React from "react";
import styles from "./Account.module.css";
import userimage from "../assets/user1.png";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants";

const Account = () => {
  const [selected, setSelected] = React.useState(true);

  return (
    <>
      <div className={styles.account}>
        <button
          className={styles.currentuser}
          onClick={() => {
            setSelected(!selected);
          }}
        >
          <div className={styles.label}>
            <img src={userimage} alt="user" />
            <div className={styles.flextext}>
              <span>Welkom,</span>
              <span>Emilee Simchenko</span>
            </div>
          </div>
        </button>
        {selected ? (
          <></>
        ) : (
          <ul className={styles.nav}>
            <li className={styles.navItem}>
              <Link to={ROUTES.gegevens}>Persoonlijke gegevens</Link>
            </li>
            <li className={styles.navItem}>
              <Link to={ROUTES.mijnasteroiden}>Mijn Asteroïden</Link>
            </li>
            <li className={styles.navItem}>
              <button>Uitloggen</button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default withRouter(Account);
