import React from "react";
import styles from "./Account.module.css";
import userimage from "../assets/user1.png";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants";
import Logout from "./auth/Logout";

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
              <NavLink exact={true} to={ROUTES.gegevens}>
                Persoonlijke gegevens
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink exact={true} to={ROUTES.mijnasteroiden}>
                Mijn Asteroïden
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <Logout />
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default withRouter(Account);
