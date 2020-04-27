import React from "react";

export default function CameraControls(props) {
  return (
    <div>
      <div>
        zoom
        <input
          name="zoom"
          type="range"
          min={0}
          max={1000}
          value={props.sliderPosition.zoom}
          onChange={props.handlePosition}
        />
        {props.sliderPosition.zoom}
      </div>
      {props.sliderPosition.zoom}
      <div>
        x
        <input
          name="x"
          type="range"
          min={0}
          max={1000}
          value={props.sliderPosition.x}
          onChange={props.handlePosition}
        />
        {props.sliderPosition.x}
      </div>
      {props.sliderPosition.x}
      <div>
        y
        <input
          name="y"
          type="range"
          min={0}
          max={1000}
          value={props.sliderPosition.y}
          onChange={props.handlePosition}
        />
        {props.sliderPosition.y}
      </div>
      {props.sliderPosition.y}
    </div>
  );
}
