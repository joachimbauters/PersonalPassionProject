import React from "react";
import styles from "./Samenvatting.module.css";

const Samenvatting = ({ asteroid }) => {
  return (
    <>
      <section className={styles.container}>
        <div>
          <h2 className={styles.titel}>Over jouw Asteroïde</h2>
          <div className={styles.card}>
            <p className={styles.text}>
              Jouw asteroïde:{" "}
              <span className={styles.highlight}>{asteroid.name}</span>
            </p>
            <p className={styles.textyellow}>
              Huur:{" "}
              <span className={styles.highlightyellow}>
                €
                {Math.round(
                  asteroid.estimated_diameter.meters.estimated_diameter_min *
                    2.23
                )}{" "}
                / maand
              </span>
            </p>
            <p className={styles.text}>
              Nominale afstand aarde:{" "}
              <span className={styles.highlight}>
                {asteroid.close_approach_data.map(
                  asteroidaf =>
                    Math.round(asteroidaf.miss_distance.lunar) + " lunar"
                )}
              </span>
            </p>
            <p className={styles.text}>
              Grootte:{" "}
              <span className={styles.highlight}>
                {Math.round(
                  asteroid.estimated_diameter.meters.estimated_diameter_min
                )}{" "}
                -{" "}
                {Math.round(
                  asteroid.estimated_diameter.meters.estimated_diameter_max
                )}{" "}
                m
              </span>
            </p>
          </div>
        </div>
        <div>
          <h2 className={styles.titel}>Over de betaling</h2>
          <div className={styles.card}>
            <p className={styles.text}>
              Methode betaling:{" "}
              <span className={styles.highlight}>Domiciëlering</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Samenvatting;
