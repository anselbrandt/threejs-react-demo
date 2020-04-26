import { useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function useLoader() {
  const [model, setModel] = useState();
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("./plane.gltf", function (gltf) {
      setModel(gltf.scene);
    });
  });
  return { model };
}
