import React, { Component } from "react";
import styles from "./Logout.module.css";
import AuthContext from "../../context/auth-context";
import { withApollo } from "react-apollo";

class Logout extends Component {
  handleClickButton = logout => {
    logout();
    this.props.client.resetStore();
  };

  render() {
    return (
      <AuthContext.Consumer>
        {context => {
          const logout = context.logout;
          return (
            <>
              <button
                className={styles.button}
                onClick={() => this.handleClickButton(logout)}
              >
                Uitloggen
              </button>
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default withApollo(Logout);
