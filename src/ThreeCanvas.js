import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeCanvas(props) {
  const { canvasRef, width, height } = props;

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(-4, 2, 2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const render = () => renderer.render(scene, camera);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const light = new THREE.HemisphereLight(0xffffff, 0x696969, 1);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load("./plane.gltf", function (gltf) {
      scene.add(gltf.scene);
      render();
    });

    const gridHelper = new THREE.GridHelper(6, 5);
    scene.add(gridHelper);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    canvasRef.current.appendChild(renderer.domElement);
    render();

    return () => {
      canvasRef.current.removeChild(renderer.domElement);
      controls.removeEventListener();
    };
  }, [canvasRef, width, height]);

  return <div ref={canvasRef}></div>;
}
