import React, { useRef, useState } from "react";
import styles from "./App.module.css";
import useGetViewport from "./useGetViewport";
import ThreeCanvas from "./ThreeCanvas";
import ModelControls from "./ModelControls";

function App() {
  const canvasRef = useRef();
  const { width } = useGetViewport();
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSliderRotation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setRotation((prevState) => ({
      ...prevState,
      [name]: Math.PI * (+value / 250 - 2),
    }));
  };

  return (
    <div className={styles.app}>
      <ThreeCanvas
        canvasRef={canvasRef}
        width={width / 2}
        height={width / 2}
        rotation={rotation}
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
