import React, { Component } from "react";
import styles from "./HuurForm.module.css";
import AuthContext from "../context/auth-context";
import Checkout from "./Checkout";

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

  submitHandler = e => {
    e.preventDefault();
  };

  render() {
    const { asteroid } = this.props;
    const { checked } = this.state;
    return (
      <AuthContext.Consumer>
        {context => {
          return (
            <>
              <form
                className={styles.form}
                onSubmit={e => this.submitHandler(e)}
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
                  <Checkout
                    price={
                      Math.round(
                        asteroid.estimated_diameter.meters
                          .estimated_diameter_min * 2.23
                      ) * 100
                    }
                    naam={this.naamEl}
                    checked={checked}
                    asteroidId={asteroid.id}
                    context={context}
                  />
                </div>
              </form>
            </>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default HuurForm;
