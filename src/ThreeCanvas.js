import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeCanvas(props) {
  const { canvasRef, width, height, cameraPosition, rotation, model } = props;

  useEffect(() => {
    const ref = canvasRef;
    const scene = new THREE.Scene();
    scene.add(model);

    if (model) {
      model.rotation.x = rotation.pitch;
      model.rotation.y = rotation.yaw;
      model.rotation.z = rotation.roll;
    }

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const light = new THREE.HemisphereLight(0xffffff, 0x696969, 1);
    scene.add(light);

    const gridHelper = new THREE.GridHelper(6, 5);
    scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", () => renderer.render(scene, camera)); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    ref.current.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    return () => {
      ref.current.removeChild(renderer.domElement);
      controls.removeEventListener();
    };
  }, [canvasRef, width, height, rotation, model]);

  return <div ref={canvasRef}></div>;
}
