import React, { Component } from "react";
import * as THREE from "three";
import styles from "./DetailInfo.module.css";

class DetailInfo extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  // eslint-enable-next-line

  normalize = (val, minVal, maxVal, newMin, newMax) => {
    return newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
  };

  async componentDidMount() {
    let camera,
      renderer,
      scene,
      asteroidInfo,
      height = 400,
      width = 400;

    const createCamera = () => {
      const { asteroid } = this.props;
      this.size = 0;
      const average =
        (asteroid.estimated_diameter.kilometers.estimated_diameter_max +
          asteroid.estimated_diameter.kilometers.estimated_diameter_min) /
        2;

      this.size = average;
      console.log(this.size);

      // Create a Camera
      const fov = 30;
      const aspect = width / height;
      const near = 0.1;
      const far = 10;

      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      if (this.size >= 0.5) {
        camera.position.y = 5 * this.size;
        console.log("tegroot");
      } else if (this.size >= 0.1 && this.size <= 0.5) {
        camera.position.y = 7 * this.size;
        console.log("middelmatig");
      } else {
        camera.position.y = 3 * this.size * 5;
        console.log("teklein");
      }
      camera.up.set(1, 0, 0);
      camera.lookAt(0, 0, 0);
    };

    const createRenderer = () => {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      this.mount.appendChild(renderer.domElement);
    };

    const createLights = () => {
      const sunLight = new THREE.PointLight(0xffcc00, 0.5);
      sunLight.position.set(-20, -20, -10);
      sunLight.color.convertSRGBToLinear();
      const mainLight = new THREE.PointLight(0x004d6d, 1);
      const ambientLight = new THREE.AmbientLight(0xe5d5d5);
      ambientLight.intensity = 0.5;
      const hemisphereLight = new THREE.HemisphereLight(0x2f586d, 0x0e4a6d, 1);
      const shadowLight = new THREE.DirectionalLight(0x4e4376, 0.8);
      const shadowLight2 = new THREE.DirectionalLight(0x4e4376, 1);

      shadowLight.position.set(-1, 15, 4);
      shadowLight2.position.set(-20, 50, 10);

      shadowLight.castShadow = true;
      shadowLight2.castShadow = true;

      scene.add(
        sunLight,
        mainLight,
        ambientLight,
        hemisphereLight,
        shadowLight,
        shadowLight2
      );
    };

    class Astroid {
      constructor(size) {
        this.mesh = new THREE.Object3D();
        const geometry = new THREE.DodecahedronGeometry(size, 1);
        geometry.vertices.forEach(function(v) {
          v.x += 0 - Math.random() * (size / 4);
          v.y += 0 - Math.random() * (size / 4);
          v.z += 0 - Math.random() * (size / 4);
        });
        geometry.computeFaceNormals();
        geometry.center();
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));
        let color = "#111111";
        color = ColorLuminance(color, 2 + Math.random() * 10);
        const texture = new THREE.MeshStandardMaterial({
          color: color,
          flatShading: true,
          roughness: 0.8,
          metalness: 1
        });

        const cube = new THREE.Mesh(geometry, texture);
        cube.castShadow = true;
        cube.receiveShadow = true;

        this.mesh.add(cube);
      }
    }

    const ColorLuminance = (hex, lum) => {
      // validate hex string
      hex = String(hex).replace(/[^0-9a-f]/gi, "");
      if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      lum = lum || 0;

      // convert to decimal and change luminosity
      var rgb = "#",
        c,
        i;
      for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
      }

      return rgb;
    };

    const createAsteroid = () => {
      const { asteroid } = this.props;
      this.size = 0;

      const average =
        (asteroid.estimated_diameter.kilometers.estimated_diameter_max +
          asteroid.estimated_diameter.kilometers.estimated_diameter_min) /
        2;

      this.size = average;
      asteroidInfo = new Astroid(this.size);

      scene.add(asteroidInfo.mesh);
    };

    const update = () => {
      asteroidInfo.mesh.rotation.z -= 0.001;
      asteroidInfo.mesh.rotation.y -= 0.001;
      asteroidInfo.mesh.rotation.x -= 0.001;
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    const init = () => {
      scene = new THREE.Scene();
      scene.updateMatrixWorld(true);

      createCamera();
      createLights();
      createAsteroid();
      createRenderer();

      const animate = () => {
        requestAnimationFrame(animate);
        update();
        render();
      };
      animate();
    };
    init();
  }

  render() {
    const { asteroid } = this.props;

    return (
      <>
        <div className={styles.flexdetail}>
          <div
            className={styles.threecontainer}
            ref={mount => {
              this.mount = mount;
            }}
          />
          <div className={styles.detailinfo}>
            <div className={styles.detail1}>
              <h2 className={styles.name}>{asteroid.name}</h2>
              <p className={styles.price}>
                <span>
                  €
                  {Math.round(
                    asteroid.estimated_diameter.meters.estimated_diameter_min *
                      2.23
                  )}
                </span>{" "}
                / maand
              </p>
              <div className={styles.infogrid}>
                <div className={styles.grootteflex}>
                  <p className={styles.info}>
                    {Math.round(
                      asteroid.estimated_diameter.meters.estimated_diameter_min
                    )}{" "}
                    -{" "}
                    {Math.round(
                      asteroid.estimated_diameter.meters.estimated_diameter_max
                    )}{" "}
                    m
                  </p>
                  <p className={styles.infotext}>Grootte</p>
                </div>
                {console.log(asteroid)}
                <div className={styles.afstandflex}>
                  <p className={styles.info}>
                    {asteroid.close_approach_data.map(
                      asteroidaf =>
                        Math.round(asteroidaf.miss_distance.lunar) + " lunar"
                    )}
                  </p>
                  <p className={styles.infotext}>Nominale afstand aarde</p>
                </div>
                <div className={styles.snelheidflex}>
                  <p className={styles.info}>
                    {asteroid.close_approach_data.map(
                      asteroidaf =>
                        Math.round(
                          asteroidaf.relative_velocity.kilometers_per_second
                        ) + " km/s"
                    )}
                  </p>
                  <p className={styles.infotext}>Relatieve snelheid</p>
                </div>
              </div>
              <div className={styles.buttons}>
                <button className={styles.huurnubtn}>Huur nu</button>
                <a
                  className={styles.infobtn}
                  href={asteroid.nasa_jpl_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Download detail info
                </a>
              </div>
            </div>
            <div className={styles.cardinfo}>
              <h2 className={styles.charttitle}>Samenstelling</h2>
              <div className={styles.flexchart}>
                <p>Silicaten</p>
                <div className={styles.lineOuter}>
                  <div
                    className={styles.lineInner1}
                    style={{
                      maxWidth:
                        this.normalize(
                          asteroid.estimated_diameter.meters
                            .estimated_diameter_min,
                          0,
                          800,
                          0,
                          100
                        ) * 3
                    }}
                  ></div>
                </div>
                <p>Koolstof</p>
                <div className={styles.lineOuter}>
                  <div
                    className={styles.lineInner2}
                    style={{
                      maxWidth:
                        this.normalize(
                          asteroid.estimated_diameter.meters
                            .estimated_diameter_min,
                          0,
                          800,
                          0,
                          100
                        ) *
                        Math.random() *
                        4
                    }}
                  ></div>
                </div>
                <p>Ijzer</p>
                <div className={styles.lineOuter}>
                  <div
                    className={styles.lineInner3}
                    style={{
                      maxWidth:
                        this.normalize(
                          asteroid.estimated_diameter.meters
                            .estimated_diameter_min,
                          0,
                          800,
                          0,
                          100
                        ) *
                        Math.random() *
                        5
                    }}
                  ></div>
                </div>
                <p>Nikkel</p>
                <div className={styles.lineOuter}>
                  <div
                    className={styles.lineInner4}
                    style={{
                      maxWidth:
                        this.normalize(
                          asteroid.estimated_diameter.meters
                            .estimated_diameter_min,
                          0,
                          800,
                          0,
                          100
                        ) *
                        Math.random() *
                        6
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DetailInfo;
