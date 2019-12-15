import React, { Component } from "react";
import styles from "./ActieveAsteroiden.module.css";
import { Query, Mutation } from "react-apollo";
import GET_ABBONEMENTEN_USER from "../graphql/getAbbonementenUser";
import DELETE_ABBONEMENT from "../graphql/deleteAbbonement";
import AsteroidContext from "../context/asteroid-context";
import GET_ABBONEMENTEN from "../graphql/getAbbonementen";

class ActieveAsteroiden extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  // eslint-enable-next-line

  deleteAbbonement = (cancelAbbonement, abbonementId, Options) => {
    if (abbonementId.trim().length === 0) {
      return;
    }

    cancelAbbonement({
      variables: {
        abbonementId: abbonementId.toString()
      },
      refetchQueries: () => [{ query: GET_ABBONEMENTEN_USER, context: Options }]
    });
  };

  render() {
    const { context } = this.props;
    const astroidesArray = [];
    const Options = {
      headers: {
        Authorization: context.userId ? `Bearer ${context.token}` : ""
      }
    };

    let price = 0;

    return (
      <AsteroidContext.Consumer>
        {context => {
          if (context.asteroiden) {
            for (let [, value] of Object.entries(context.asteroiden)) {
              value.forEach(astroid => {
                astroidesArray.push(astroid);
              });
            }
          }
          return (
            <div className={styles.flexcontainer}>
              <section>
                <Mutation
                  mutation={DELETE_ABBONEMENT}
                  context={Options}
                  update={(cache, { data: { cancelAbbonement } }) => {
                    const { abbonementen } = cache.readQuery({
                      query: GET_ABBONEMENTEN
                    });

                    const abbonement = abbonementen.find(
                      abbonement => abbonement._id === cancelAbbonement._id
                    );
                    const updatedAbbonementen = abbonementen.filter(
                      e => e !== abbonement
                    );

                    cache.writeQuery({
                      query: GET_ABBONEMENTEN,
                      data: {
                        abbonementen: updatedAbbonementen
                      }
                    });
                  }}
                >
                  {cancelAbbonement => {
                    return (
                      <Query query={GET_ABBONEMENTEN_USER} context={Options}>
                        {({ loading, error, data: { user } }) => {
                          if (loading) return <p>Loading...</p>;
                          if (error) return <p>Error :( </p>;
                          const abbonementen = user.createdAbbonementen;

                          return (
                            <>
                              <h2 className={styles.titel}>
                                Actieve Asteroïden
                              </h2>
                              <ul className={styles.list}>
                                {abbonementen.map(abbonement => {
                                  const asteroid = astroidesArray.find(
                                    item => item.id === abbonement.asteroidId
                                  );
                                  const abbonementId = abbonement._id;
                                  price += Math.round(
                                    asteroid.estimated_diameter.meters
                                      .estimated_diameter_min * 2.23
                                  );
                                  return abbonement.active === true ? (
                                    <li
                                      key={asteroid.id}
                                      className={styles.astroidItem}
                                    >
                                      <div className={styles.nameflex}>
                                        <p className={styles.name}>
                                          {asteroid.name} - {abbonement.naam}
                                        </p>
                                        <p className={styles.price}>
                                          €
                                          {Math.round(
                                            asteroid.estimated_diameter.meters
                                              .estimated_diameter_min * 2.23
                                          ) + " / maand"}
                                        </p>
                                        <p className={styles.aanrekening}>
                                          Volgende aanrekening:{" "}
                                          {new Date(
                                            abbonement.endTime
                                          ).toLocaleDateString("nl-BE")}
                                        </p>
                                      </div>
                                      <div className={styles.grootteflex}>
                                        <p className={styles.info}>
                                          {Math.round(
                                            asteroid.estimated_diameter.meters
                                              .estimated_diameter_min
                                          )}{" "}
                                          -{" "}
                                          {Math.round(
                                            asteroid.estimated_diameter.meters
                                              .estimated_diameter_max
                                          )}{" "}
                                          m
                                        </p>
                                        <p className={styles.infotext}>
                                          Grootte
                                        </p>
                                      </div>
                                      <div className={styles.afstandflex}>
                                        <p className={styles.info}>
                                          {asteroid.close_approach_data.map(
                                            asteroidaf =>
                                              Math.round(
                                                asteroidaf.miss_distance.lunar
                                              ) + " lunar"
                                          )}
                                        </p>
                                        <p className={styles.infotext}>
                                          Nominale afstand aarde{" "}
                                        </p>
                                      </div>
                                      <div className={styles.buttonflex}>
                                        <button
                                          className={styles.button}
                                          onClick={() =>
                                            this.deleteAbbonement(
                                              cancelAbbonement,
                                              abbonementId,
                                              Options
                                            )
                                          }
                                        >
                                          Stop huur
                                        </button>
                                      </div>
                                    </li>
                                  ) : (
                                    <></>
                                  );
                                })}
                              </ul>
                              <p className={styles.totaal}>
                                Totaalbedrag per maand: €{price}
                              </p>
                              );
                            </>
                          );
                        }}
                      </Query>
                    );
                  }}
                </Mutation>
              </section>
            </div>
          );
        }}
      </AsteroidContext.Consumer>
    );
  }
}

export default ActieveAsteroiden;
