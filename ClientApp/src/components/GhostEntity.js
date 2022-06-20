import { Sprite, useTick } from "@inlet/react-pixi";
import React, { useEffect, useReducer } from "react";
const reducer = (_, { data }) => data;

export default function GhostEntity(props) {
  console.log("This runs");
  useEffect(() => {
    console.log("Updated");
  });
  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      x={props.XY.x}
      y={props.XY.y}
      scale={props.scale}
    />
  );
}
