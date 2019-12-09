import React, { Component } from "react";
import styles from "./HuurBevestiging.module.css";
import * as THREE from "three";
import { ROUTES } from "../constants";
import { withRouter } from "react-router-dom";

class HuurBevestiging extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  // eslint-enable-next-line
  async componentDidMount() {
    let camera, renderer, scene, particles, particleSystem;

    const createCamera = () => {
      // Create a Camera
      const fov = 30;
      const aspect = window.innerWidth / window.innerHeight;
      const near = 0.1;
      const far = 7000;

      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(10, 70, 10);
      camera.up.set(0, 0, 1);
      camera.lookAt(0, 0, 0);
    };

    const createRenderer = () => {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 0);
      this.mount.appendChild(renderer.domElement);
    };

    const stars = () => {
      particles = new THREE.CircleGeometry(0.5, 50);
      for (let p = 0; p < 100000; p++) {
        const particle = new THREE.Vector3(
          Math.random() * 1000 - 250,
          Math.random() * 5000 - 450,
          Math.random() * 3000 - 500
        );
        particles.vertices.push(particle);
      }

      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1
      });
      particleSystem = new THREE.Points(particles, particleMaterial);
      particleSystem.position.z = -200;
      scene.add(particleSystem);
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const update = () => {
      particleSystem.position.x += 0.008;
    };

    const init = () => {
      scene = new THREE.Scene();
      scene.updateMatrixWorld(true);

      stars();
      createCamera();
      createRenderer();
      onWindowResize();

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
    const xWidth = window.innerWidth;
    const yHeight = window.innerHeight;
    const { naam, history } = this.props;
    return (
      <>
        <div className={styles.loginGrid}>
          <div
            style={{ width: xWidth, height: yHeight }}
            className={styles.container}
            ref={mount => {
              this.mount = mount;
            }}
          />
          <section className={styles.homeinfogrid}>
            <div className={styles.card}>
              <p className={styles.titel}>Jouw asteroïde - {naam} is klaar!</p>
              <p className={styles.subtitle}>Bestelling was succesvol</p>
              <div className={styles.btn_flex}>
                <button
                  className={styles.btn1}
                  onClick={() => {
                    history.push(ROUTES.landing);
                  }}
                >
                  Terug naar home
                </button>
                <button
                  className={styles.btn2}
                  onClick={() => {
                    history.push(ROUTES.mijnasteroiden);
                  }}
                >
                  Mijn Asteroïden
                </button>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default withRouter(HuurBevestiging);
