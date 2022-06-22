import { Sprite } from "@inlet/react-pixi";
import React from "react";

export default function GhostEntity(props) {
  const { image, x, y, scale } = props;
  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      x={x}
      y={y}
      scale={scale}
    />
  );
}
