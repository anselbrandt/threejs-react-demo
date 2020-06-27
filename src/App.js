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
  const [cameraPosition, setCameraPosition] = useState({
    x: -250,
    y: 0,
    z: 0,
  });
  const [rotation, setRotation] = useState({
    pitch: 0,
    //yaw: -Math.PI * 0.25,
    yaw: 0,
    roll: 0,
  });
  const [sliderRotation, setSliderRotation] = useState({
    pitch: 500,
    yaw: 500,
    roll: 500,
  });
  const [colors] = useState({
    // background: { h: 0.6, s: 0, l: 1 },
    // hemilight: { h: 0.6, s: 1, l: 0.6 },
    // ground: { h: 0.095, s: 1, l: 0.75 },
    // dirlight: { h: 0.1, s: 1, l: 0.95 },
    // sky: 0x0077ff,
    background: { h: 0.86, s: 0, l: 1 },
    hemilight: { h: 0.86, s: 1, l: 0.6 },
    ground: { h: 0.86, s: 1, l: 0.75 },
    dirlight: { h: 0.86, s: 1, l: 0.95 },
    sky: 0xffffff,
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

  const handleOrbit = (position) => {
    setCameraPosition(position);
  };

  return (
    <div className={styles.app}>
      <ThreeCanvas
        canvasRef={canvasRef}
        width={width * 0.5}
        height={width * 0.5}
        cameraPosition={cameraPosition}
        handleOrbit={handleOrbit}
        rotation={rotation}
        model={model}
        colors={colors}
      />
      <ModelControls
        rotation={rotation}
        sliderRotation={sliderRotation}
        handleRotation={handleRotation}
      />
    </div>
  );
}

export default App;
