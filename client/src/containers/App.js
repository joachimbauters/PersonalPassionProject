import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../constants";

import Home from "./Home.jsx";
import PreLoader from "./Preloader";
import PersoonlijkeGegevens from "./PersoonlijkeGegevens";
import Login from "./Login";
import Detail from "./Detail";
import Registreer from "./Registreer";
import MijnAsteroiden from "./MijnAsteroiden";

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
            <Route
              path={ROUTES.landing}
              exact
              strict
              render={() => <PreLoader />}
            />
          ) : (
            <>
              <Route
                path={ROUTES.landing}
                exact
                strict
                render={() => <Home astroidesArray={astroidesArray} />}
              />
              <Route
                path="/detail/:id"
                render={({ match }) => {
                  const id = match.params.id;
                  const astroidesArray2 = [];
                  for (let [, value] of Object.entries(astroidesArray)) {
                    value.forEach(astroid => {
                      astroidesArray2.push(astroid);
                    });
                  }
                  const asteroid = astroidesArray2.find(item => item.id === id);
                  return asteroid ? (
                    <Detail
                      asteroid={asteroid}
                      astroidesArray={astroidesArray}
                      key={id}
                      id={id}
                    />
                  ) : (
                    <p>error</p>
                  );
                }}
              />
              <Route
                path={ROUTES.gegevens}
                exact
                strict
                render={() => <PersoonlijkeGegevens />}
              />
              <Route
                path={ROUTES.mijnasteroiden}
                exact
                strict
                render={() => <MijnAsteroiden />}
              />
              <Route
                path={ROUTES.login}
                exact
                strict
                render={() => <Login />}
              />
              <Route
                path={ROUTES.registreer}
                exact
                strict
                render={() => <Registreer />}
              />
            </>
          )}
        </Switch>
      </>
    );
  }
}

export default App;
