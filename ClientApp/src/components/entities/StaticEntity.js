import { Sprite } from "@inlet/react-pixi";
import React from "react";

export default function StaticEntity(props) {
  const { image, x, y, scale } = props;
  return <Sprite image={image} x={x} y={y} scale={scale} />;
}
