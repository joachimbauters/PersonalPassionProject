import React from "react";
import styles from "./Notifications.module.css";
import openSocket from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();

const Notifications = () => {
  const controller = new AbortController();
  const [selected, setSelected] = React.useState(true);
  const [notification, setNotification] = React.useState("geen notificatie");

  const socket = openSocket(`http://localhost:5000`);

  socket.on(`connection`, () => {
    console.log(`Connected: ${socket.id}`);
  });

  React.useEffect(() => {
    socket.on(`notification`, notification => {
      setNotification(notification.notification);
      return () => controller.abort();
    });
  });

  const handleClickButton = () => {
    setNotification("geen notificatie");
  };

  return (
    <>
      <div className={styles.notifications}>
        <button
          className={styles.icon}
          onClick={() => {
            setSelected(!selected);
          }}
        >
          {notification === "geen notificatie" ? (
            <></>
          ) : (
            <div className={styles.bol}></div>
          )}
        </button>
        {selected ? (
          <></>
        ) : (
          <div className={styles.meldingencard}>
            <h2 className={styles.titel}>Meldingen</h2>
            <ul>
              <li className={styles.melding}>
                <p>{notification}</p>
                {notification === "geen notificatie" ? (
                  <></>
                ) : (
                  <button onClick={handleClickButton}>Verwijder</button>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;
