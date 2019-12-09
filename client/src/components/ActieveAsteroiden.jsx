import React, { Component } from "react";
import styles from "./ActieveAsteroiden.module.css";
import { Query, Mutation } from "react-apollo";
import GET_ABBONEMENTEN_USER from "../graphql/getAbbonementenUser";
import DELETE_ABBONEMENT from "../graphql/deleteAbbonement";
import AsteroidContext from "../context/asteroid-context";

class ActieveAsteroiden extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  // eslint-enable-next-line

  deleteAbbonement = (cancelAbbonement, abbonementId) => {
    if (abbonementId.trim().length === 0) {
      return;
    }

    cancelAbbonement({
      variables: {
        abbonementId: abbonementId.toString()
      }
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
            <Mutation mutation={DELETE_ABBONEMENT} context={Options}>
              {cancelAbbonement => {
                return (
                  <Query query={GET_ABBONEMENTEN_USER} context={Options}>
                    {({ loading, error, data: { user } }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) return <p>Error :( </p>;
                      const abbonementen = user.createdAbbonementen;
                      return (
                        <>
                          <h2 className={styles.titel}>Actieve Asteroïden</h2>
                          <ul className={styles.list}>
                            {abbonementen.map(abbonement => {
                              const asteroid = astroidesArray.find(
                                item => item.id === abbonement.asteroidId
                              );

                              const abbonementId = abbonement._id;

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
                                    <p className={styles.infotext}>Grootte</p>
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
                                          abbonementId
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
                          );
                        </>
                      );
                    }}
                  </Query>
                );
              }}
            </Mutation>
          );
        }}
      </AsteroidContext.Consumer>
    );
  }
}

export default ActieveAsteroiden;
