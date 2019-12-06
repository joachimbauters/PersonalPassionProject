import React, { Component } from "react";
import { Mutation } from "react-apollo";
import styles from "./HuurForm.module.css";
import { withRouter } from "react-router-dom";
import CREATE_ABBONEMENT from "../graphql/createAbbonement";
import AuthContext from "../context/auth-context";
class HuurForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      naam: ""
    };
    this.naamEl = React.createRef();
  }

  onChangeBevestig = e => {
    if (e.target.checked === true) {
      this.setState({ checked: !this.state.checked });
    }
  };

  submitHandler = (e, createAbbonement) => {
    e.preventDefault();

    const { asteroid } = this.props;

    const naam = this.naamEl.current.value;
    const startTime = new Date().toISOString();
    var endTime = new Date(startTime);
    endTime.setMonth(endTime.getMonth() + 1);

    if (naam.trim().length === 0 || this.state.checked === false) {
      return;
    }

    this.setState({ naam: naam });

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
    this.setState({ checked: !this.state.checked });
  };

  render() {
    return (
      <AuthContext.Consumer>
        {context => {
          const Options = {
            headers: {
              Authorization: context.userId ? `Bearer ${context.token}` : ""
            }
          };
          return (
            <Mutation mutation={CREATE_ABBONEMENT} context={Options}>
              {createAbbonement => (
                <>
                  <form
                    className={styles.form}
                    onSubmit={e => this.submitHandler(e, createAbbonement)}
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
                            €700{" "}
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
