import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { ROUTES } from "../constants";

import Home from "./Home.jsx";

const App = () => {
  return (
    <>
      <Switch>
        <Route path={ROUTES.landing} exact strict component={Home} />
      </Switch>
    </>
  );
};

export default App;
