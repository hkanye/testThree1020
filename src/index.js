import "./styles.css";

import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  AmbientLight,
  Color,
  MeshBasicMaterial,
  Mesh,
  BoxGeometry
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const container = document.querySelector("#app");

const renderer = new WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
// renderer.setClearColor(0x000000, 0);

const camera = new PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.01,
  200
);
const controls = new OrbitControls(camera, renderer.domElement);
const scene = new Scene();

scene.background = new Color(0x404040);

const light = new AmbientLight(0x404040, 1); // soft white light
scene.add(light);

camera.position.set(0, 0, 50);
controls.target.set(0, 0, 0);

container.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

animate();

const containers = [
  {
    name: "food №1",
    position: {
      length: 0,
      width: 0,
      height: 0
    },
    rotation: {
      length: 300,
      width: 100,
      height: 200
    }
  }
];

// const boxSize = new Vector3().setScalar(0.3);

camera.position.set(0.5, 0.5, 0.5);

containers.forEach((c) => {
  const { position } = c;

  const x = position.length / 1000;
  const y = position.width / 1000;
  const z = position.height / 1000;

  /* с позициями понятно 100, 200, 300 миллиметров, 
  соответственно если принять что единица измерения тригс это один метр
  то эти миллиметры надо поделить на 1000
  */

  /* Так как размера в массиве нету 
  то я принял за наглядный размер 50 миллиметров */
  const geometry = new BoxGeometry(0.05, 0.05, 0.05);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
});

{
  const geometry = new BoxGeometry(0.05, 0.05, 0.05);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new Mesh(geometry, material);
  cube.position.set(11.11, 12.12, 13.13);
  cube.scale.setScalar(0.999);
  cube.rotateX(0.1);
  cube.rotateY(0.1);
  cube.rotateZ(0.1);
  scene.add(cube);
  console.log({ cube });
}

/* 
Что касается поля  rotation, то тут вообще не понятно о чём речь
Поворот это обычно градусы либо радианы
Значения 100, 200, 300 для поворота выглядят странно.
*/
