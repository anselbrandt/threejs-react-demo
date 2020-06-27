import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function useLoader() {
  const [model, setModel] = useState();
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(process.env.PUBLIC_URL + "/plane.glb", function (gltf) {
      setModel(gltf.scene.children[0]);
    });
  }, []);
  return { model };
}
