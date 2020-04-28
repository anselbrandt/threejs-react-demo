import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function useLoader() {
  const [model, setModel] = useState();
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("./plane.glb", function (gltf) {
      //setModel(gltf.scene.children[0]);
      setModel(gltf.scene);
    });
  }, []);
  return { model };
}
