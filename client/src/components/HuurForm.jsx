import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styles from "./HuurForm.module.css";
import { withRouter } from "react-router-dom";
import CREATE_ABBONEMENT from "../graphql/createAbbonement";
import GET_ABBONEMENTEN from "../graphql/getAbbonementen";
import AuthContext from "../context/auth-context";
import { ROUTES } from "../constants";

class HuurForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };

    this.naamEl = React.createRef();
  }

  onChangeBevestig = e => {
    if (e.target.checked === true) {
      this.setState({ checked: !this.state.checked });
    }
  };

  submitHandler = (e, createAbbonement, id) => {
    e.preventDefault();

    const { asteroid } = this.props;

    const naam = this.naamEl.current.value;
    const startTime = new Date().toISOString();
    var endTime = new Date(startTime);
    endTime.setMonth(endTime.getMonth() + 1);

    if (naam.trim().length === 0 || this.state.checked === false) {
      return;
    }

    createAbbonement({
      variables: {
        abbonementInput: {
          asteroidId: asteroid.id,
          price: Math.round(
            asteroid.estimated_diameter.meters.estimated_diameter_min * 2.23
          ),
          naam: naam,
          startTime: startTime,
          endTime: endTime,
          active: true
        }
      }
    });

    this.naamEl.current.value = "";
    this.setState({ checked: false });

    this.props.history.push(ROUTES.huurbevestiging);
  };

  render() {
    const { asteroid } = this.props;
    return (
      <AuthContext.Consumer>
        {context => {
          const Options = {
            headers: {
              Authorization: context.userId ? `Bearer ${context.token}` : ""
            }
          };

          const id = context.userId;
          return (
            <Mutation
              mutation={CREATE_ABBONEMENT}
              context={Options}
              update={(cache, { data: { createAbbonement } }) => {
                const { abbonementen } = cache.readQuery({
                  query: GET_ABBONEMENTEN
                });
                cache.writeQuery({
                  query: GET_ABBONEMENTEN,
                  data: {
                    abbonementen: abbonementen.concat([createAbbonement])
                  }
                });
              }}
            >
              {createAbbonement => (
                <>
                  <form
                    className={styles.form}
                    onSubmit={e => this.submitHandler(e, createAbbonement, id)}
                  >
                    <div className={styles.formflex}>
                      <div className={styles.formFlex2}>
                        <div className={styles.formtext}>
                          Ik noem mijn Asteroïde
                          <input
                            type="text"
                            name="naam"
                            id="naam"
                            ref={this.naamEl}
                            className={styles.formInputNaam}
                            required
                          />
                          en
                          <div className={styles.checkbox}>
                            <input
                              type="checkbox"
                              name="bevestig"
                              id="bevestig"
                              onChange={this.onChangeBevestig}
                              required
                            />
                            <label htmlFor="bevestig"></label>
                          </div>
                          Bevestig dat ik deze wil huren voor{" "}
                          <span className={styles.highlight}>
                            €
                            {Math.round(
                              asteroid.estimated_diameter.meters
                                .estimated_diameter_min * 2.23
                            )}{" "}
                            <span className={styles.highlight2}>/ maand</span>
                          </span>
                          .
                        </div>
                      </div>
                    </div>
                    <div>
                      <input
                        type="submit"
                        value="Betaal nu"
                        className={styles.bevestighuur}
                      />
                    </div>
                  </form>
                </>
              )}
            </Mutation>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(HuurForm);
