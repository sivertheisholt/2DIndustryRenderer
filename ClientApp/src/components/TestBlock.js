import React from "react";
import { Sprite, blurFilter, matrixFilter } from "@inlet/react-pixi";
import myImage from "../images/Capture.png";
import * as PIXI from "pixi.js";

export default function TestBlock() {
  return (
    <Sprite
      image={myImage}
      anchor={0.5}
      position={[100, 200]}
      blendMode={PIXI.BLEND_MODES.ADD}
      roundPixels={true}
    />
  );
}
