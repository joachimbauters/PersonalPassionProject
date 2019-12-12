import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Astroides.module.css";
import { Query } from "react-apollo";
import img from "../../assets/user1.png";
import GET_ABBONEMENTEN from "../../graphql/getAbbonementen";
import GET_NEWABBONEMENT from "../../graphql/getNewAbbonement";

class asteroidesList extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  // eslint-enable-next-line

  subscribeToNewAbbonementen = subscribeToMore => {
    subscribeToMore({
      document: GET_NEWABBONEMENT,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newAbbonement = subscriptionData.data.newAbbonement;

        return {
          ...prev,
          abbonementen: [...prev.abbonementen, newAbbonement]
        };
      }
    });
  };

  render() {
    const { astroidesArray } = this.props;

    const astroidesArray2 = [];
    for (let [, value] of Object.entries(astroidesArray)) {
      value.forEach(astroid => {
        astroidesArray2.push(astroid);
      });
    }

    return (
      <>
        <Query query={GET_ABBONEMENTEN}>
          {({ loading, error, data: { abbonementen }, subscribeToMore }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :( </p>;

            this.subscribeToNewAbbonementen(subscribeToMore);

            return (
              <ul>
                {astroidesArray2.map(astroid => {
                  const abbonement = abbonementen.find(
                    item => item.asteroidId === astroid.id
                  );

                  return (
                    <li key={astroid.id} className={styles.astroidItem}>
                      <div className={styles.nameflex}>
                        {abbonement ? (
                          abbonement.active === true ? (
                            <p className={styles.name}>
                              {astroid.name} -{" "}
                              <span className={styles.namecustom}>
                                {abbonement.naam}
                              </span>
                            </p>
                          ) : (
                            <p className={styles.name}>{astroid.name}</p>
                          )
                        ) : (
                          <p className={styles.name}>{astroid.name}</p>
                        )}
                        {abbonement ? (
                          abbonement.active === true ? (
                            <></>
                          ) : (
                            <p className={styles.price}>
                              €
                              {Math.round(
                                astroid.estimated_diameter.meters
                                  .estimated_diameter_min * 2.23
                              ) + " / maand"}
                            </p>
                          )
                        ) : (
                          <p className={styles.price}>
                            €
                            {Math.round(
                              astroid.estimated_diameter.meters
                                .estimated_diameter_min * 2.23
                            ) + " / maand"}
                          </p>
                        )}
                      </div>
                      <div className={styles.grootteflex}>
                        <p className={styles.info}>
                          {Math.round(
                            astroid.estimated_diameter.meters
                              .estimated_diameter_min
                          )}{" "}
                          -{" "}
                          {Math.round(
                            astroid.estimated_diameter.meters
                              .estimated_diameter_max
                          )}{" "}
                          m
                        </p>
                        <p className={styles.infotext}>Grootte</p>
                      </div>
                      <div className={styles.afstandflex}>
                        <p className={styles.info}>
                          {astroid.close_approach_data.map(asteroid =>
                            astroid.close_approach_data.map(
                              asteroid =>
                                Math.round(asteroid.miss_distance.lunar) +
                                " lunar"
                            )
                          )}
                        </p>
                        <p className={styles.infotext}>
                          Nominale afstand aarde{" "}
                        </p>
                      </div>
                      <div className={styles.buttonflex}>
                        {abbonement ? (
                          abbonement.active === true ? (
                            <button className={styles.buttonRent}>
                              {abbonement.user.image === null ? (
                                <img
                                  src={img}
                                  alt="userimage"
                                  className={styles.btnImg}
                                />
                              ) : (
                                <img
                                  src={abbonement.user.image}
                                  alt="userimage"
                                  className={styles.btnImg}
                                />
                              )}
                              Verhuurd
                            </button>
                          ) : (
                            <Link
                              className={styles.button}
                              to={`detail/${astroid.id}`}
                            >
                              Te huur
                            </Link>
                          )
                        ) : (
                          <Link
                            className={styles.button}
                            to={`detail/${astroid.id}`}
                          >
                            Te huur
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </Query>
      </>
    );
  }
}

export default asteroidesList;
