import React, { Component } from "react";
import * as THREE from "three";
import styles from "./Home.module.css";
const OrbitControls = require("three-orbit-controls")(THREE);

class ThreeContainer extends Component {
  componentDidMount() {
    let camera, renderer, scene, controls, meshes, particles;

    const createCamera = () => {
      // Create a Camera
      const fov = 35;
      const aspect = window.innerWidth / window.innerHeight;
      const near = 0.1;
      const far = 1000;

      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.set(10, 30, 10);
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
      // renderer.gammaFactor = 2.2;
      // renderer.gammaOutput = true;
      // renderer.physicallyCorrectLights = true;
      this.mount.appendChild(renderer.domElement);
    };

    const createLights = () => {
      const mainLight = new THREE.PointLight(0x004d6d, 1);
      const ambientLight = new THREE.AmbientLight(0xe5d5d5);
      ambientLight.intensity = 0.5;
      const hemisphereLight = new THREE.HemisphereLight(0x2f586d, 0x0e4a6d, 1);
      const shadowLight = new THREE.DirectionalLight(0x136d69, 0.8);
      const shadowLight2 = new THREE.DirectionalLight(0x4e4376, 1);

      shadowLight.position.set(20, -35, 0);
      shadowLight2.position.set(-20, 50, 10);

      shadowLight.castShadow = true;
      shadowLight2.castShadow = true;

      shadowLight.shadow.camera.left = -14;
      shadowLight.shadow.camera.right = 14;
      shadowLight.shadow.camera.top = 14;
      shadowLight.shadow.camera.bottom = -14;
      shadowLight.shadow.camera.near = 1;
      shadowLight.shadow.camera.far = 10;

      shadowLight.shadow.mapSize.width = 20.48;
      shadowLight.shadow.mapSize.height = 20.48;

      scene.add(
        mainLight,
        ambientLight,
        hemisphereLight,
        shadowLight,
        shadowLight2
      );
    };

    const stars = () => {
      particles = new THREE.CircleGeometry(0.5, 50);
      for (let p = 0; p < 10000; p++) {
        const particle = new THREE.Vector3(
          Math.random() * 500 - 250,
          Math.random() * 500 - 450,
          Math.random() * 3000 - 500
        );
        particles.vertices.push(particle);
      }

      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1
      });
      const particleSystem = new THREE.Points(particles, particleMaterial);
      particleSystem.position.y = 150;
      scene.add(particleSystem);
    };

    class Earth {
      constructor() {
        this.mesh = new THREE.Object3D();

        // create earthSphere with ocean color
        const geom = new THREE.OctahedronGeometry(55, 2);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x004d6d,
          flatShading: true,
          roughness: 0.8,
          metalness: 0.2
        });
        const earthSphere = new THREE.Mesh(geom, mat);

        earthSphere.receiveShadow = true;
        earthSphere.castShadow = true;

        //create northPole
        const northPoleGeom = new THREE.SphereGeometry(35, 5, 5);

        northPoleGeom.vertices[0].y -= 2;
        northPoleGeom.vertices[7].y += 5;
        northPoleGeom.vertices[8].y += 5;
        northPoleGeom.vertices[9].y += 5;
        northPoleGeom.vertices[10].y += 5;
        northPoleGeom.vertices[11].y += 5;

        const northPoleMat = new THREE.MeshStandardMaterial({
          color: 0xf7f7f3,
          flatShading: true,
          roughness: 0.8,
          metalness: 0.2
        });

        const northPole = new THREE.Mesh(northPoleGeom, northPoleMat);
        northPole.position.set(0, 24, 0);

        //create southPole
        const southPoleGeom = new THREE.SphereGeometry(35, 5, 5);

        southPoleGeom.vertices[0].y -= 2;
        southPoleGeom.vertices[7].y += 5;
        southPoleGeom.vertices[8].y += 5;
        southPoleGeom.vertices[9].y += 5;
        southPoleGeom.vertices[10].y += 5;
        southPoleGeom.vertices[11].y += 5;

        southPoleGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));

        const southPoleMat = new THREE.MeshStandardMaterial({
          color: 0xf7f7f3,
          flatShading: true,
          roughness: 0.8,
          metalness: 0.2
        });

        const southPole = new THREE.Mesh(southPoleGeom, southPoleMat);
        southPole.position.set(0, -24, 0);

        // create continent
        const contiGeom = new THREE.DodecahedronGeometry(25, 1);

        contiGeom.mergeVertices();

        const l = contiGeom.vertices.length;

        for (let i = 0; i < l; i++) {
          const v = contiGeom.vertices[i];

          if (i < l / 2) {
            v.y -= 5;
            v.z += Math.random() * 5;
            v.x += Math.random() * 5;
          } else {
            v.y += 7;
            v.z -= Math.random() * 5;
            v.x -= Math.random() * 5;
          }
        }

        contiGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI));

        const contiMat = new THREE.MeshStandardMaterial({
          color: 0x129b40,
          flatShading: true,
          roughness: 0.8,
          metalness: 0.2
        });

        const continent1 = new THREE.Mesh(contiGeom, contiMat);
        continent1.position.set(0, 10, 33);

        const continent2 = new THREE.Mesh(contiGeom, contiMat);
        continent2.position.set(0, -3, -33);
        continent2.rotation.x = (Math.PI / 180) * 6;

        const continent3 = new THREE.Mesh(contiGeom, contiMat);
        continent3.position.set(30, 15, 0);
        continent3.rotation.x = (Math.PI / 180) * 180;

        const continent4 = new THREE.Mesh(contiGeom, contiMat);
        continent4.position.set(28, -15, 0);
        continent4.rotation.x = (Math.PI / 180) * 270;
        continent4.rotation.y = (Math.PI / 180) * 50;

        const continent5 = new THREE.Mesh(contiGeom, contiMat);
        continent5.position.set(28, 0, 20);
        continent5.rotation.x = (Math.PI / 180) * 270;

        const continent6 = new THREE.Mesh(contiGeom, contiMat);
        continent6.position.set(-28, 20, 0);
        continent6.rotation.x = (Math.PI / 180) * 30;

        const atmopshereSphere = new THREE.SphereGeometry(65, 20, 20);
        const atmosphereMaterial = new THREE.MeshPhongMaterial({
          shininess: 100,
          shading: THREE.SmoothShading,
          color: 0xffffff,
          transparent: true,
          opacity: 0.05
        });

        const atmosphere = new THREE.Mesh(atmopshereSphere, atmosphereMaterial);

        northPole.receiveShadow = true;
        northPole.castShadow = true;
        southPole.receiveShadow = true;
        southPole.castShadow = true;
        continent1.receiveShadow = true;
        continent1.castShadow = true;
        continent2.receiveShadow = true;
        continent2.castShadow = true;
        continent3.receiveShadow = true;
        continent3.castShadow = true;
        continent4.receiveShadow = true;
        continent4.castShadow = true;
        continent5.receiveShadow = true;
        continent5.castShadow = true;
        continent6.receiveShadow = true;
        continent6.castShadow = true;

        this.mesh.add(
          earthSphere,
          northPole,
          southPole,
          continent1,
          continent2,
          continent3,
          continent4,
          continent5,
          continent6,
          atmosphere
        );
      }
    }

    class Astroid {
      constructor() {
        this.mesh = new THREE.Object3D();
        let size = Math.random() / 2;
        const geometry = new THREE.DodecahedronGeometry(size, 1);
        geometry.vertices.forEach(function(v) {
          v.x += 0 - Math.random() * (size / 4);
          v.y += 0 - Math.random() * (size / 4);
          v.z += 0 - Math.random() * (size / 4);
        });
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
        cube.scale.set(
          1 + Math.random() * 0.4,
          1 + Math.random() * 0.8,
          1 + Math.random() * 0.4
        );
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

    class AstroidField {
      constructor() {
        this.mesh = new THREE.Object3D();
        this.nAstroids = 100;
        let stepAngle = (Math.PI * 2) / this.nAstroids;
        for (let i = 0; i < this.nAstroids; i++) {
          const c = new Astroid();
          const a = stepAngle * i;
          const h = 15 + Math.random() * 2;
          c.mesh.position.y = Math.sin(a) * h;
          c.mesh.position.x = Math.cos(a) * h;
          c.mesh.rotation.z = a + Math.PI / 2;
          c.mesh.position.z = -4 - Math.random() * 4;
          const s = 1 + Math.random() * 2;
          c.mesh.scale.set(s, s, s);
          this.mesh.add(c.mesh);
        }
      }
    }

    const createMeshes = () => {
      const solarSystem = new THREE.Object3D();
      const earth = new Earth();
      earth.mesh.scale.set(0.1, 0.1, 0.1);

      const astroids = new AstroidField();
      astroids.mesh.position.z = 7;

      solarSystem.add(astroids.mesh);
      solarSystem.add(earth.mesh);

      const group = new THREE.Group();
      group.add(solarSystem);

      scene.add(group);

      return {
        solarSystem: solarSystem
      };
    };

    const update = () => {
      meshes.solarSystem.rotation.z += 0.0005;
    };

    const render = () => {
      onWindowResize();
      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const init = () => {
      scene = new THREE.Scene();
      scene.position.x = 7;

      stars();
      createCamera();
      createLights();
      meshes = createMeshes();
      createRenderer();

      const animate = () => {
        requestAnimationFrame(animate);
        update();
        render();
      };
      animate();

      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.rotateSpeed = 0.1;
    };
    init();
  }

  render() {
    const xWidth = window.innerWidth;
    const yHeight = window.innerHeight;
    return (
      <>
        <section className={styles.homeGrid}>
          <div
            style={{ width: xWidth, height: yHeight }}
            className={styles.container}
            ref={mount => {
              this.mount = mount;
            }}
          />
          <div className={styles.homeinfogrid}>
            <h1 className={styles.logo}>Immo Astroid</h1>
            <div className={styles.card}>
              <h2>Astroïdes</h2>
              <li>
                <ul>Astroide1</ul>
              </li>
              <button>hey</button>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ThreeContainer;
