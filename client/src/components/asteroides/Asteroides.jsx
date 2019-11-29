import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Astroides.module.css";

class asteroidesList extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  // eslint-enable-next-line

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
        <ul>
          {astroidesArray2.map(astroid => (
            <li key={astroid.id} className={styles.astroidItem}>
              <div className={styles.nameflex}>
                <p className={styles.name}>{astroid.name}</p>
                <p className={styles.price}>
                  €{Math.round(astroid.absolute_magnitude_h * 10).toFixed(3)}
                </p>
              </div>
              <div className={styles.grootteflex}>
                <p className={styles.info}>
                  {Math.round(
                    astroid.estimated_diameter.meters.estimated_diameter_min
                  )}{" "}
                  -{" "}
                  {Math.round(
                    astroid.estimated_diameter.meters.estimated_diameter_max
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
                        Math.round(asteroid.miss_distance.lunar) + " lunar"
                    )
                  )}
                </p>
                <p className={styles.infotext}>Nominale afstand aarde </p>
              </div>
              <div className={styles.buttonflex}>
                <Link className={styles.button} to={`detail/${astroid.id}`}>
                  Detail
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default asteroidesList;
