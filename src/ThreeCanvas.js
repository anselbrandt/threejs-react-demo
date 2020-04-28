import React, { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeCanvas(props) {
  const {
    canvasRef,
    width,
    height,
    cameraPosition,
    rotation,
    model,
    handleOrbit,
    colors,
  } = props;

  useEffect(() => {
    const ref = canvasRef;

    const camera = new THREE.PerspectiveCamera(30, width / height, 1, 5000);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(
      colors.background.h,
      colors.background.s,
      colors.background.l
    );
    scene.fog = new THREE.Fog(scene.background, 1, 5000);

    // Lights

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(
      colors.hemilight.h,
      colors.hemilight.s,
      colors.hemilight.l
    );
    hemiLight.groundColor.setHSL(
      colors.ground.h,
      colors.ground.s,
      colors.ground.l
    );
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    // const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    // scene.add(hemiLightHelper);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(
      colors.dirlight.h,
      colors.dirlight.s,
      colors.dirlight.l
    );
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    const d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;
    scene.add(dirLight);

    // const dirLightHeper = new THREE.DirectionalLightHelper(dirLight, 10);
    // scene.add(dirLightHeper);

    // Ground

    const groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
    const groundMat = new THREE.MeshLambertMaterial({ color: 0xffffff });
    groundMat.color.setHSL(colors.ground.h, colors.ground.s, colors.ground.l);
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -33;
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Skydome

    const vertexShader = `varying vec3 vWorldPosition;
    void main() {
      vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
      vWorldPosition = worldPosition.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`;
    const fragmentShader = `uniform vec3 topColor;
    uniform vec3 bottomColor;
    uniform float offset;
    uniform float exponent;
    varying vec3 vWorldPosition;
    void main() {
      float h = normalize( vWorldPosition + offset ).y;
      gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
    }`;
    const uniforms = {
      topColor: { value: new THREE.Color(colors.sky) },
      bottomColor: { value: new THREE.Color(0xffffff) },
      offset: { value: 33 },
      exponent: { value: 0.6 },
    };
    uniforms["topColor"].value.copy(hemiLight.color);
    scene.fog.color.copy(uniforms["bottomColor"].value);
    const skyGeo = new THREE.SphereBufferGeometry(4000, 32, 15);
    const skyMat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: THREE.BackSide,
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // Model

    if (model) {
      const s = 15;
      model.scale.set(s, s, s);
      model.position.y = 15;
      model.castShadow = true;
      model.receiveShadow = true;
      scene.add(model);
      model.rotation.x = rotation.pitch;
      model.rotation.y = rotation.yaw;
      model.rotation.z = rotation.roll;
    }

    // Axes

    // const axesHelper = new THREE.AxesHelper(25);
    // scene.add(axesHelper);

    // Renderer

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;

    // Controls

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", () => {
      const position = camera.position;
      console.log(position);
      handleOrbit(position);
      renderer.render(scene, camera);
    }); // use if there is no animation loop
    controls.minDistance = 2;
    controls.maxDistance = 500;
    controls.update();

    // Render

    ref.current.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    return () => {
      ref.current.removeChild(renderer.domElement);
      controls.removeEventListener();
    };
  }, [canvasRef, width, height, rotation, colors]);

  return <div ref={canvasRef}></div>;
}
