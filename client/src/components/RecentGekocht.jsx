import React, { Component } from "react";
import img from "../assets/user1.png";
import styles from "./RecentGekocht.module.css";
import { Subscription } from "react-apollo";
import GET_NEWABBONEMENT from "../graphql/getNewAbbonement";
class RecentGekocht extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abbonementen: []
    };
  }
  render() {
    return (
      <Subscription subscription={GET_NEWABBONEMENT}>
        {({ data, loading }) => {
          if (!loading) {
            this.state.abbonementen.unshift(data.newAbbonement);
          }

          return (
            <ul className={styles.list}>
              {this.state.abbonementen.map(abbonement => {
                return (
                  <li className={styles.item}>
                    <img
                      src={
                        abbonement.user.image === null
                          ? img
                          : abbonement.user.image
                      }
                      alt="user"
                    />
                    <p>
                      Heeft zojuist een asteroïde gekocht en{" "}
                      <span className={styles.span}>{abbonement.naam}</span>{" "}
                      genoemd
                    </p>
                  </li>
                );
              })}
            </ul>
          );
        }}
      </Subscription>
    );
  }
}

export default RecentGekocht;
