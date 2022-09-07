import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.IcosahedronGeometry(15, 0);
var hue = 0
const material = new THREE.MeshBasicMaterial( {color: "hsl(" + hue + ", 70%, 90%)", wireframe: true } );
const icosa = new THREE.Mesh( geometry, material );

scene.add(icosa)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial( { color: 0x696969 } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 200 ) )

  star.position.set(x, y, z);
  scene.add(star);
}

Array(400).fill().forEach(addStar);



var inc = 0
var c = 0.1

function animate() {
  requestAnimationFrame( animate );
  if (c < 1) {
    c += 0.01
    inc = c*c*c * 0.001
  }
  
  icosa.rotation.x += inc;
  icosa.rotation.y += inc;
  icosa.rotation.z += inc;
  hue++;
  icosa.material.color.set("hsl(" + hue + ", 70%, 90%)")
  controls.update();
  renderer.render( scene, camera );
}

let detai = 0

document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    detai = Math.floor(Math.random() * 6);
    icosa.geometry = [new THREE.IcosahedronGeometry(15, detai), new THREE.OctahedronGeometry(15, detai), new THREE.TetrahedronGeometry(15, detai)][Math.floor(Math.random() * 3)];
  }
}

animate();