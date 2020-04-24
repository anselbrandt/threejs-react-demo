import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default function ThreeCanvas(props) {
  const { canvasRef, width, height } = props;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(-4, 2, 2);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const render = () => renderer.render(scene, camera);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const controls = new OrbitControls(camera, renderer.domElement);

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load("./quarry_01_1k.hdr", function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        // set scene.background to color
        scene.background = envMap;
        // replace scene.environment with lighting
        scene.environment = envMap;
        texture.dispose();
        render();
        const loader = new GLTFLoader();
        loader.load("./plane.gltf", function (gltf) {
          scene.add(gltf.scene);
          render();
        });
      });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    renderer.outputEncoding = THREE.sRGBEncoding;

    canvasRef.current.appendChild(renderer.domElement);
    render();
    controls.addEventListener("change", render); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    return () => {
      canvasRef.current.removeChild(renderer.domElement);
    };
  }, [canvasRef, width, height]);

  return <div ref={canvasRef}></div>;
}
