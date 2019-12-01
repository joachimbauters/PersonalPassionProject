import React from "react";
import styles from "./Huren.module.css";
import Astroides from "./asteroides/Asteroides";

const Huren = ({ astroidesArray }) => {
  return (
    <>
      <div className={styles.kopenflex}>
        <h2 className={styles.title}>Een asteroïde huren</h2>
        <select name="sort" id="sort" className={styles.sorteren}>
          <option>Prijs hoog naar laag</option>
          <option>Prijs laag naar hoog</option>
          <option>Grootte hoog naar laag</option>
          <option>Grootte laag naar hoog</option>
          <option>Afstand hoog naar laag</option>
          <option>Afstand laag naar hoog</option>
        </select>
      </div>
      <section className={styles.astroidelist}>
        <Astroides astroidesArray={astroidesArray} />
      </section>
    </>
  );
};

export default Huren;
