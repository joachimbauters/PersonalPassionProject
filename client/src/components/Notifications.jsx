import React from "react";
import styles from "./Notifications.module.css";

const Notifications = () => {
  const [selected, setSelected] = React.useState(true);

  return (
    <>
      <div className={styles.notifications}>
        <button
          className={styles.icon}
          onClick={() => {
            setSelected(!selected);
          }}
        >
          2
        </button>
        {selected ? (
          <></>
        ) : (
          <div className={styles.meldingencard}>
            <h2 className={styles.titel}>Meldingen</h2>
            <ul>
              <li className={styles.melding}>
                <p>
                  Het bod voor <span>(2015 RC)</span> van <span>€587.000</span>{" "}
                  is geacepteerd
                </p>
                <button>Bekijk</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;
