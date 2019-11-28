import React from "react";
import styles from "./preloader.module.css";
import asteroid_img from "../assets/asteroid.svg";
import asteroid_loader from "../assets/preload.svg";

const PreLoader = () => {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.loader_flex}>
          <div className={styles.asteroid}>
            <img src={asteroid_img} alt="asteroid"></img>
            <p className={styles.loadingtext}>loading...</p>
          </div>
          <img
            className={styles.loadergif}
            src={asteroid_loader}
            alt="loader"
          ></img>
        </div>
      </div>
    </>
  );
};

export default PreLoader;
