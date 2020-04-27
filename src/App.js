import React, { useRef, useState } from "react";
import styles from "./App.module.css";
import useGetViewport from "./useGetViewport";
import useLoader from "./useLoader";
import ThreeCanvas from "./ThreeCanvas";
import ModelControls from "./ModelControls";

function App() {
  const canvasRef = useRef();
  const { width } = useGetViewport();
  const { model } = useLoader();
  const [cameraPosition, setCameraPosition] = useState({ x: -4, y: 2, z: 2 });
  const [rotation, setRotation] = useState({
    pitch: 0,
    yaw: 0,
    roll: 0,
  });
  const [sliderRotation, setSliderRotation] = useState({
    pitch: 500,
    yaw: 500,
    roll: 500,
  });

  const handleOrbit = () => {};

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSliderRotation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setRotation((prevState) => ({
      ...prevState,
      [name]: Math.PI * (+value / 500 - 1),
    }));
  };

  return (
    <div className={styles.app}>
      <ThreeCanvas
        canvasRef={canvasRef}
        width={width / 2}
        height={width / 2}
        cameraPosition={cameraPosition}
        rotation={rotation}
        model={model}
        handleOrbit={handleOrbit}
      />
      <ModelControls
        rotation={rotation}
        sliderRotation={sliderRotation}
        handleChange={handleChange}
      />
    </div>
  );
}

export default App;
