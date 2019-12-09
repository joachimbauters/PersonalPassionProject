import React, { Component } from "react";
import * as THREE from "three";
import styles from "./Home.module.css";
import Huren from "../components/Huren";
import Account from "../components/Account";
import Notifications from "../components/Notifications";
import RecentGekocht from "../components/RecentGekocht";
import AsteroidContext from "../context/asteroid-context";
const OrbitControls = require("three-orbit-controls")(THREE);

class ThreeContainer extends Component {
  static contextType = AsteroidContext;
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }
  // eslint-enable-next-line

  async componentDidMount() {
    let camera,
      renderer,
      scene,
      controls,
      meshes,
      particles,
      astroids,
      sputnik,
      sputnik2;

    const { astroidesArray } = this.props;

    this.context.setAsteroiden(astroidesArray);

    const astroidesArray2 = [];
    for (let [, value] of Object.entries(astroidesArray)) {
      value.forEach(astroid => {
        astroidesArray2.push(astroid);
      });
    }

    const normalize = (val, minVal, maxVal, newMin, newMax) => {
      return newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
    };

    const createCamera = () => {
      // Create a Camera
      const fov = 30;
      const aspect = window.innerWidth / 2 / window.innerHeight;
      const near = 0.1;
      const far = 7000;

      camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.y = 80;
      camera.up.set(0, 0, 1);
      camera.lookAt(0, 0, 0);
    };

    const createRenderer = () => {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
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
        sunLight,
        mainLight,
        ambientLight,
        hemisphereLight,
        shadowLight,
        shadowLight2
      );
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
      const particleSystem = new THREE.Points(particles, particleMaterial);
      particleSystem.position.y = -200;
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

    class AstroidField {
      constructor() {
        this.mesh = new THREE.Object3D();
        this.count = 1;
        this.distance = 0;
        this.size = 0;
        let stepAngle = (Math.PI * 2) / astroidesArray2.length;
        astroidesArray2.forEach(asteroid => {
          this.count++;
          const average =
            (asteroid.estimated_diameter.kilometers.estimated_diameter_max +
              asteroid.estimated_diameter.kilometers.estimated_diameter_min) /
            2;

          this.size = average;

          const c = new Astroid(this.size);
          const a = stepAngle + this.count;
          asteroid.close_approach_data.forEach(asteroid => {
            this.distance = normalize(
              asteroid.miss_distance.lunar,
              0,
              200,
              10,
              30
            );
          });
          const h = this.distance + this.size;
          c.mesh.position.y = Math.sin(a) * h;
          c.mesh.position.x = Math.cos(a) * h;
          c.mesh.rotation.z = a + Math.PI / 2;
          c.mesh.position.z = -40 - this.distance * 5;
          const s = 1 + this.size;
          c.mesh.scale.set(s, s, s);

          const canvas1 = document.createElement("canvas");
          const context1 = canvas1.getContext("2d");
          context1.font = "300 50px Verdana";
          context1.fillStyle = "rgba(255,255,255,1)";
          context1.fillText(asteroid.name, 0, 50);

          const texture1 = new THREE.Texture(canvas1);
          texture1.needsUpdate = true;

          const material1 = new THREE.MeshBasicMaterial({
            map: texture1,
            side: THREE.DoubleSide
          });
          material1.transparent = true;

          var mesh1 = new THREE.Mesh(
            new THREE.PlaneGeometry(40, 10),
            material1
          );
          mesh1.rotation.x = -Math.PI / 2;
          mesh1.position.y = 1 + this.size + Math.sin(a) * h;
          mesh1.position.x = Math.cos(a) * h;
          mesh1.rotation.z = a + Math.PI / 2;
          mesh1.position.z = -40 - this.distance * 5 + 1 + this.size;
          mesh1.scale.set(0.1, 0.1, 0.1);

          this.mesh.add(c.mesh, mesh1);
        });
      }
    }

    class Sputnik {
      constructor() {
        this.mesh = new THREE.Object3D();
        this.pivot = new THREE.Object3D();

        const mainModuleGeom = new THREE.CylinderGeometry(17, 13, 50, 7, 1);
        const mainModuleMat = new THREE.MeshPhongMaterial({
          shininess: 100,
          color: 0xb2b8af,
          shading: THREE.FlatShading
        });

        const mainModule = new THREE.Mesh(mainModuleGeom, mainModuleMat);

        const wingsGeom = new THREE.BoxGeometry(300, 20, 1, 11, 1, 1);

        for (let i = 0; i < wingsGeom.vertices.length; i++) {
          if (i % 2 === 0) {
            wingsGeom.vertices[i].z += 5;
          } else {
            wingsGeom.vertices[i].z -= 5;
          }
        }

        const wingsMat = new THREE.MeshPhongMaterial({
          shininess: 100,
          color: 0xd3c545,
          shading: THREE.FlatShading
        });

        const wings = new THREE.Mesh(wingsGeom, wingsMat);
        wings.position.set(0, 0, 0);

        const antenaGeom = new THREE.CylinderGeometry(40, 10, 20, 10);

        const antenaMat = new THREE.MeshPhongMaterial({
          shininess: 100,
          color: 0xaed3be,
          shading: THREE.FlatShading
        });

        const antena = new THREE.Mesh(antenaGeom, antenaMat);
        antena.position.y = 35;

        this.mesh.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 3));
        this.mesh.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI / 3));

        this.mesh.scale.set(0.1, 0.1, 0.1);
        this.mesh.add(mainModule, wings, antena);

        this.pivot.add(this.mesh);
      }
    }

    class Moon {
      constructor() {
        this.mesh = new THREE.Object3D();
        const geom = new THREE.OctahedronGeometry(55, 2);
        const mat = new THREE.MeshStandardMaterial({
          color: 0x676767,
          flatShading: true,
          roughness: 0.8,
          metalness: 0.2
        });
        const moonSphere = new THREE.Mesh(geom, mat);

        moonSphere.receiveShadow = true;
        moonSphere.castShadow = true;

        this.mesh.add(moonSphere);
      }
    }

    class Sun {
      constructor() {
        this.mesh = new THREE.Object3D();
        const geom = new THREE.OctahedronGeometry(55, 2);
        const mat = new THREE.MeshPhongMaterial({
          color: "yellow",
          emissive: "#F8CE3B"
        });
        const sunSphere = new THREE.Mesh(geom, mat);

        sunSphere.receiveShadow = true;
        sunSphere.castShadow = true;

        this.mesh.add(sunSphere);
      }
    }

    const createSolarSystem = () => {
      const solarSystem = new THREE.Object3D();
      const earth = new Earth();
      earth.mesh.scale.set(0.15, 0.15, 0.15);

      sputnik = new Sputnik();
      sputnik.mesh.position.set(-10, 0, 5);
      sputnik.mesh.scale.set(0.01, 0.01, 0.01);

      sputnik2 = new Sputnik();
      sputnik2.mesh.position.set(10, 0, -5);
      sputnik2.mesh.scale.set(0.01, 0.01, 0.01);

      astroids = new AstroidField();
      astroids.mesh.position.z = 160;

      const moon = new Moon();
      const moonOrbit = new THREE.Object3D();
      moon.mesh.scale.set(0.04, 0.04, 0.04);
      moonOrbit.position.y = -40;
      moonOrbit.position.x = 20;
      moonOrbit.add(moon.mesh);

      const sun = new Sun();
      sun.mesh.scale.set(1, 1, 1);
      sun.mesh.position.set(-800, -5000, -200);

      solarSystem.add(sputnik.pivot);
      solarSystem.add(sputnik2.pivot);
      solarSystem.add(astroids.mesh);
      solarSystem.add(earth.mesh);
      solarSystem.add(moonOrbit);

      const group = new THREE.Group();
      group.add(solarSystem);

      scene.add(sun.mesh);
      scene.add(group);

      return {
        moonOrbit: moonOrbit,
        solarSystem: solarSystem
      };
    };

    const update = () => {
      meshes.solarSystem.rotation.z += 0.0002;
      meshes.moonOrbit.rotation.z += 0.002;

      sputnik.pivot.rotation.y -= 0.001;
      sputnik.pivot.rotation.x -= 0.0001;
      sputnik2.pivot.rotation.y -= 0.002;
      sputnik2.pivot.rotation.x -= 0.0002;
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / 2 / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
    };

    const init = () => {
      scene = new THREE.Scene();
      scene.updateMatrixWorld(true);
      // scene.position.x = 15;

      stars();
      createCamera();
      createLights();
      meshes = createSolarSystem();
      createRenderer();

      onWindowResize();

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
    const { astroidesArray } = this.props;
    return (
      <>
        <section className={styles.homeGrid}>
          <div
            className={styles.container}
            ref={mount => {
              this.mount = mount;
            }}
          />
          <div className={styles.homeinfogrid}>
            <h1 className={styles.logo}>Immo Asteroïd</h1>
            <div className={styles.topbar}>
              <Account />
              <Notifications />
            </div>
            <div className={styles.card}>
              <div>
                <Huren astroidesArray={astroidesArray} />
              </div>
            </div>
            <div className={styles.recentGekocht}>
              <RecentGekocht />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default ThreeContainer;
