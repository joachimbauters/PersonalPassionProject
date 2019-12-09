import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import styles from "./GegevensForm.module.css";
import { withRouter } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import GET_USER from "../../graphql/getUser";
import GET_USERS from "../../graphql/getUsers";
import UPDATE_USER from "../../graphql/updateUser";
import MyDropzone from "../MyDropzone";

class GegevensForm extends Component {
  constructor(props) {
    super(props);

    this.naamEl = React.createRef();
    this.emailEl = React.createRef();
    this.wachtwoordEl = React.createRef();
    this.state = {
      file: null,
      upload: false
    };
  }

  submitFile = file => {
    this.setState({ file: file });
  };

  submitHandler = (e, updateUser, context) => {
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

    updateUser({
      variables: {
        naam: naam,
        image: this.state.file,
        email: email,
        wachtwoord: wachtwoord
      },
      refetchQueries: [{ query: GET_USERS }]
    });

    this.naamEl.current.value = "";
    this.emailEl.current.value = "";
    this.wachtwoordEl.current = "";

    this.setState({ upload: true });
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
            <Mutation mutation={UPDATE_USER} context={Options}>
              {updateUser => {
                return (
                  <Query query={GET_USER}>
                    {({ loading, error, data: { user } }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error :( </p>;

                      return (
                        <>
                          <form
                            onSubmit={e =>
                              this.submitHandler(e, updateUser, context)
                            }
                            className={styles.form}
                          >
                            <h2 className={styles.titel}>
                              Persoonlijke gegevens
                            </h2>
                            <div className={styles.formflex}>
                              <div>
                                <MyDropzone submitFile={this.submitFile} />
                              </div>
                              <div className={styles.formFlex2}>
                                <label
                                  htmlFor="naam"
                                  className={styles.formLabel}
                                >
                                  Naam
                                </label>
                                <input
                                  type="text"
                                  name="naam"
                                  id="naam"
                                  ref={this.naamEl}
                                  defaultValue={user.naam}
                                  className={styles.formInput}
                                  required
                                />
                              </div>
                              <div className={styles.formFlex2}>
                                <label
                                  htmlFor="email"
                                  className={styles.formLabel}
                                >
                                  Email adres
                                </label>
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  ref={this.emailEl}
                                  defaultValue={user.email}
                                  className={styles.formInput}
                                  required
                                />
                              </div>
                              <div className={styles.formFlex2}>
                                <label
                                  htmlFor={"email"}
                                  className={styles.formLabel}
                                >
                                  Wachtwoord
                                </label>
                                <input
                                  type="password"
                                  name="Wachtwoord"
                                  id="Wachtwoord"
                                  ref={this.wachtwoordEl}
                                  placeholder="Nieuw wachtwoord"
                                  className={styles.formInput}
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              {this.state.upload === false ? (
                                <input
                                  type="submit"
                                  value="Opslaan"
                                  className={styles.registreer}
                                />
                              ) : (
                                <input
                                  type="submit"
                                  value="Opgeslagen!"
                                  className={styles.registreerupload}
                                />
                              )}
                            </div>
                          </form>
                        </>
                      );
                    }}
                  </Query>
                );
              }}
            </Mutation>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(GegevensForm);
