import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styles from "./RegistreerForm.module.css";
import { withRouter } from "react-router-dom";
import CREATE_USER from "../../graphql/createUser";
import { ROUTES } from "../../constants";

class RegistreerForm extends Component {
  constructor(props) {
    super(props);

    this.naamEl = React.createRef();
    this.emailEl = React.createRef();
    this.wachtwoordEl = React.createRef();
  }

  submitHandler = (e, createUser) => {
    e.preventDefault();

    const naam = this.naamEl.current.value;
    const email = this.emailEl.current.value;
    const wachtwoord = this.wachtwoordEl.current.value;

    if (
      naam.trim().length === 0 ||
      email.trim().length === 0 ||
      wachtwoord.trim().length === 0
    ) {
      return;
    }

    createUser({
      variables: {
        userInput: {
          naam: naam,
          email: email,
          wachtwoord: wachtwoord
        }
      }
    });

    this.naamEl.current.value = "";
    this.emailEl.current.value = "";
    this.wachtwoordEl.current = "";

    this.props.history.push(ROUTES.login);
  };

  render() {
    return (
      <Mutation mutation={CREATE_USER}>
        {createUser => (
          <>
            <form
              className={styles.form}
              onSubmit={e => this.submitHandler(e, createUser)}
            >
              <h2 className={styles.titel}>Registreer</h2>
              <div className={styles.formflex}>
                <div className={styles.formFlex2}>
                  <label htmlFor="naam" className={styles.formLabel}>
                    Naam
                  </label>
                  <input
                    type="text"
                    name="naam"
                    id="naam"
                    ref={this.naamEl}
                    placeholder="jouw naam"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formFlex2}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email adres
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    ref={this.emailEl}
                    placeholder="you@mail.com"
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formFlex2}>
                  <label htmlFor={"email"} className={styles.formLabel}>
                    Wachtwoord
                  </label>
                  <input
                    type="password"
                    name="Wachtwoord"
                    id="Wachtwoord"
                    ref={this.wachtwoordEl}
                    placeholder="Enter een wachtwoord"
                    className={styles.formInput}
                  />
                </div>
              </div>
              <div>
                <input
                  type="submit"
                  value="registreer"
                  className={styles.registreer}
                />
              </div>
            </form>
          </>
        )}
      </Mutation>
    );
  }
}

export default withRouter(RegistreerForm);
