import React from "react";

export default function ModelControls(props) {
  return (
    <div>
      <div>
        Pitch
        <input
          name="pitch"
          type="range"
          min={0}
          max={1000}
          value={props.sliderRotation.pitch}
          onChange={props.handleRotation}
        />
        {props.sliderRotation.pitch}
      </div>
      {props.rotation.pitch}
      <div>
        Yaw
        <input
          name="yaw"
          type="range"
          min={0}
          max={1000}
          value={props.sliderRotation.yaw}
          onChange={props.handleRotation}
        />
        {props.sliderRotation.yaw}
      </div>
      {props.rotation.yaw}
      <div>
        Roll
        <input
          name="roll"
          type="range"
          min={0}
          max={1000}
          value={props.sliderRotation.roll}
          onChange={props.handleRotation}
        />
        {props.sliderRotation.roll}
      </div>
      {props.rotation.roll}
    </div>
  );
}
