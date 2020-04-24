import React, { useRef } from "react";
import styles from "./App.module.css";
import useGetViewport from "./useGetViewport";
import ThreeCanvas from "./ThreeCanvas";

function App() {
  const { width } = useGetViewport();
  const canvasRef = useRef();
  return (
    <div className={styles.app}>
      <ThreeCanvas canvasRef={canvasRef} width={width / 2} height={width / 2} />
    </div>
  );
}

export default App;
