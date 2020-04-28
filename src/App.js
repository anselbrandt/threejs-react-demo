import React, { useRef, useState } from "react";
import styles from "./App.module.css";
import useGetViewport from "./useGetViewport";
import useLoader from "./useLoader";
import ThreeCanvas from "./ThreeCanvas";
import ModelControls from "./ModelControls";
import CameraControls from "./CameraControls";

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
  const [sliderPosition, setSliderPosition] = useState({
    zoom: 500,
    x: 500,
    y: 500,
  });

  const handleRotation = (event) => {
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

  const handlePosition = (event) => {
    const { name, value } = event.target;
    setSliderPosition((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOrbit = (position) => {
    setCameraPosition(position);
  };

  return (
    <div className={styles.app}>
      <ThreeCanvas
        canvasRef={canvasRef}
        width={width / 2}
        height={width / 2}
        cameraPosition={cameraPosition}
        handleOrbit={handleOrbit}
        rotation={rotation}
        model={model}
      />
      {/* <CameraControls
        sliderPosition={sliderPosition}
        handlePosition={handlePosition}
      /> */}
      <ModelControls
        rotation={rotation}
        sliderRotation={sliderRotation}
        handleRotation={handleRotation}
      />
    </div>
  );
}

export default App;
