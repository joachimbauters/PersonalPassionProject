import React from "react";
import styles from "./Account.module.css";
import userimage from "../assets/user1.png";

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
            <li className={styles.navItem}>Persoonlijke gegevens</li>
            <li className={styles.navItem}>Mijn asteroïden</li>
            <li className={styles.navItem}>Uitloggen</li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Account;
