import React, { useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { RoughnessMipmapper } from "three/examples/jsm/utils/RoughnessMipmapper";

export default function ThreeCanvas(props) {
  const { canvasRef, width, height } = props;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    camera.position.set(-1.8, 0.6, 2.7);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const render = () => renderer.render(scene, camera);
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const controls = new OrbitControls(camera, renderer.domElement);

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath("./equirectangular/")
      .load("quarry_01_1k.hdr", function (texture) {
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.background = envMap;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
        render();
        const roughnessMipmapper = new RoughnessMipmapper(renderer);
        const loader = new GLTFLoader().setPath("./DamagedHelmet/glTF/");
        loader.load("plane.gltf", function (gltf) {
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              roughnessMipmapper.generateMipmaps(child.material);
            }
          });
          scene.add(gltf.scene);
          roughnessMipmapper.dispose();
          render();
        });
      });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
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
  }, [canvasRef, width, height]);

  return <div ref={canvasRef}></div>;
}
