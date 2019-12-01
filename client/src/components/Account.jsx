import React from "react";
import styles from "./Account.module.css";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { ROUTES } from "../constants";
import Logout from "./auth/Logout";
import AccountCard from "./AccountCard";

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
          <AccountCard />
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
