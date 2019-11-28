import React, { Component } from "react";
import img from "../assets/user1.png";
import styles from "./RecentGekocht.module.css";

class RecentGekocht extends Component {
  render() {
    return (
      <ul className={styles.list}>
        <li className={styles.item}>
          <img src={img} alt="user" />
          <p>
            Heeft zojuist <span>(2015 RC)</span> gekocht
          </p>
        </li>
        <li className={styles.item}>
          <img src={img} alt="user" />
          <p>
            Heeft zojuist <span>(2015 RC)</span> gekocht
          </p>
        </li>
        <li className={styles.item}>
          <img src={img} alt="user" />
          <p>
            Heeft zojuist <span>(2015 RC)</span> gekocht
          </p>
        </li>
        <li className={styles.item}>
          <img src={img} alt="user" />
          <p>
            Heeft zojuist <span>(2015 RC)</span> gekocht
          </p>
        </li>
        <li className={styles.item}>
          <img src={img} alt="user" />
          <p>
            Heeft zojuist <span>(2015 RC)</span> gekocht
          </p>
        </li>
        <li className={styles.item}>
          <img src={img} alt="user" />
          <p>
            Heeft zojuist <span>(2015 RC)</span> gekocht
          </p>
        </li>
      </ul>
    );
  }
}

export default RecentGekocht;
