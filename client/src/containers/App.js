import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../constants";

import Home from "./Home.jsx";
import asteroid_img from "../assets/asteroid.svg";
import asteroid_loader from "../assets/preload.svg";
import styles from "./App.module.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      astroidesArray: []
    };
  }

  componentDidMount() {
    const apiKey = "lRxJZBoR0LM0dfJtdcAWqoukQLZyKFHLyDJtDdCN";
    const curr = new Date();
    const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()))
      .toISOString()
      .slice(0, 10);
    const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7))
      .toISOString()
      .slice(0, 10);

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${firstday}&end_date=${lastday}&api_key=${apiKey}`
    )
      .then(r => r.json())
      .then(data => {
        this.setState({
          loading: false,
          astroidesArray: data.near_earth_objects
        });
      });
  }
  render() {
    const { loading, astroidesArray } = this.state;

    return (
      <>
        <Switch>
          {loading ? (
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
          ) : (
            <Route
              path={ROUTES.landing}
              exact
              strict
              render={() => <Home astroidesArray={astroidesArray} />}
            />
          )}
        </Switch>
      </>
    );
  }
}

export default App;
