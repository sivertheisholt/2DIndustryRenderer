import { Sprite } from "@inlet/react-pixi";
import React from "react";
import useDrag from "../hooks/useDrag";

export default function Bunny() {
  const Bunny = ({ x = 250, y = 250, ...props }) => {
    const bind = useDrag({ x, y });
    return (
      <Sprite
        image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
        scale={4}
        {...bind}
        {...props}
      />
    );
  };
  return (
    <>
      <Bunny></Bunny>
    </>
  );
}
