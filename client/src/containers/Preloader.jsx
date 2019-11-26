import React from "react";
import styles from "./preloader.module.css";
import asteroid_img from "../assets/asteroid.svg";
import asteroid_loader from "../assets/preload.svg";

const PreLoader = () => {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.loader_flex}>
          <img
            className={styles.asteroid}
            src={asteroid_img}
            alt="asteroid"
          ></img>
          <img
            className={styles.loadergif}
            src={asteroid_loader}
            alt="loader"
          ></img>
        </div>
        <p className={styles.loadingtext}>loading...</p>
      </div>
    </>
  );
};

export default PreLoader;
