import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ROUTES } from "../constants";
import AuthContext from "../context/auth-context";

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

  state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    const { loading, astroidesArray } = this.state;

    return (
      <>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
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
                  {!this.state.token && <Redirect from="/" to="/login" exact />}
                  {this.state.token && <Redirect from="/" to="/" exact />}
                  {this.state.token && <Redirect from="/login" to="/" exact />}
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
                      const asteroid = astroidesArray2.find(
                        item => item.id === id
                      );
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
          </AuthContext.Provider>
        </React.Fragment>
      </>
    );
  }
}

export default App;
