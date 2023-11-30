import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { checkPointOnLine } from "./equation.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const animate = function () {
  requestAnimationFrame(animate);
  axesHelper.rotation.x += 0.002;
  axesHelper.rotation.y += 0.002;
  controls.update();
  renderer.render(scene, camera);
};

camera.position.z = 10;
scene.add(axesHelper);

animate();

let label = document.querySelector("#resposta");

document.querySelector("button").addEventListener("click", function (event) {
  event.preventDefault();

  scene.children.slice(1).forEach((child) => {
    scene.remove(child);
  });

  let P0 = new THREE.Vector3(
    ...document
      .querySelector('input[placeholder="Ponto inicial (x,y,z)"]')
      .value.split(",")
      .map(Number)
  );
  let V = new THREE.Vector3(
    ...document
      .querySelector('input[placeholder="Vetor diretor (x,y,z)"]')
      .value.split(",")
      .map(Number)
  );
  let P = new THREE.Vector3(
    ...document
      .querySelector('input[placeholder="Ponto (x,y,z)"]')
      .value.split(",")
      .map(Number)
  );

  let isPointOnLine = checkPointOnLine(P0.toArray(), V.toArray(), P.toArray());
  label.innerHTML = isPointOnLine
    ? "O ponto está na reta"
    : "O ponto não está na reta";
  label.classList.toggle("text-green-600", isPointOnLine);
  label.classList.toggle("text-red-600", !isPointOnLine);

  let lineGeometry = new THREE.BufferGeometry().setFromPoints([
    P0.clone().add(V.clone().multiplyScalar(-100)),
    P0.clone().add(V.clone().multiplyScalar(100)),
  ]);

  let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
  let line = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(line);

  // Create P0 point (green)
  let pointGeometryP0 = new THREE.BufferGeometry().setFromPoints([P0]);
  let pointMaterialP0 = new THREE.PointsMaterial({
    color: 0x00ff00,
    size: 0.1,
  });
  let pointP0 = new THREE.Points(pointGeometryP0, pointMaterialP0);
  scene.add(pointP0);

  // Create P point (red)
  let pointGeometryP = new THREE.BufferGeometry().setFromPoints([P]);
  let pointMaterialP = new THREE.PointsMaterial({ color: 0xff0000, size: 0.1 });
  let point = new THREE.Points(pointGeometryP, pointMaterialP);
  scene.add(point);

  // Add event listener to the button
  document.querySelector("button").addEventListener("click", function () {
    // Get the values from the input fields and convert them to vectors
    let P0 = new THREE.Vector3(
      ...document
        .querySelector('input[placeholder="Ponto inicial (x,y,z)"]')
        .value.split(",")
        .map(Number)
    );
    let V = new THREE.Vector3(
      ...document
        .querySelector('input[placeholder="Vetor diretor (x,y,z)"]')
        .value.split(",")
        .map(Number)
    );
    let P = new THREE.Vector3(
      ...document
        .querySelector('input[placeholder="Ponto (x,y,z)"]')
        .value.split(",")
        .map(Number)
    );

    // Check if the point is on the line

    // Create a line
    let lineGeometry = new THREE.BufferGeometry().setFromPoints([
      P0.clone().add(V.clone().multiplyScalar(-100)),
      P0.clone().add(V.clone().multiplyScalar(100)),
    ]);

    let lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    let line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Create P0 point green
    let pointGeometryP0 = new THREE.BufferGeometry().setFromPoints([P0]);
    let pointMaterialP0 = new THREE.PointsMaterial({
      color: 0x00ff00,
      size: 0.1,
    });
    let pointP0 = new THREE.Points(pointGeometryP0, pointMaterialP0);
    scene.add(pointP0);

    // Create a point
    let pointGeometryP = new THREE.BufferGeometry().setFromPoints([P]);
    let pointMaterialP = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 0.1,
    });
    let point = new THREE.Points(pointGeometryP, pointMaterialP);
    scene.add(point);
  });
});
