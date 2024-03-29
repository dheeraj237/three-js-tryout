import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import pageBackgroud from './assets/img/deep-space.jpg';

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(75, window.innerHeight / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'), antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);


// adding donut
// const geomatry = new THREE.TorusBufferGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347});
// const torus = new THREE.Mesh(geomatry, material);
// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);


const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
  const geomatry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geomatry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load(pageBackgroud);
scene.background = spaceTexture;


const animate = () => {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  scene.rotation.x += 0.001;
  scene.rotation.y += 0.001;
  scene.rotation.z += 0.001;

  // controls.update();
  renderer.render(scene, camera);
}
animate();