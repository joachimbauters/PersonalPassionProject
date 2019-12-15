import React, { Component } from "react";
import styles from "./HuurBevestiging.module.css";
import * as THREE from "three";
import { ROUTES } from "../constants";
import { withRouter } from "react-router-dom";
import gif from "../assets/confirm.gif";

class HuurBevestiging extends Component {
  constructor(props) {
    super(props);

    this.src = gif;
  }

  async componentDidMount() {
    let camera, scene, particles, particleSystem;

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
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(0x000000, 0);
      this.mount.appendChild(this.renderer.domElement);
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
      this.renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
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

  componentWillUnmount() {
    this.mount.removeChild(this.renderer.domElement);
  }

  render() {
    const xWidth = window.innerWidth;
    const yHeight = window.innerHeight;
    const { naam, history } = this.props;
    if (this.gif) this.gif.src = this.src;
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
              <img
                src={this.src}
                alt="gif"
                className={styles.gif}
                ref={input => (this.gif = input)}
              />
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
