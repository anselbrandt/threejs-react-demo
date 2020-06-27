import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelFile from "./plane.glb";

export default function useLoader() {
  const [model, setModel] = useState();
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(modelFile, function (gltf) {
      setModel(gltf.scene.children[0]);
    });
  }, []);
  return { model };
}
