import { Sprite, useTick } from "@inlet/react-pixi";
import { React, useReducer } from "react";
import { useState, useEffect } from "react";
const reducer = (_, { data }) => data;

export default function Machine(props) {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);

  const [motion, update] = useReducer(reducer);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    props.machineAnimation.current = () => {
      setStartAnimation(true);
    };
  });

  useTick((delta) => {
    if (startAnimation) {
      update({
        type: "update",
        data: {
          x: props.path.x[xPos],
          y: props.path.y[yPos],
        },
      });
      setXPos(xPos + 1);
      setYPos(yPos + 1);
    }
  });

  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
      x={props.x}
      y={props.y}
      scale={props.scale}
      {...motion}
    />
  );
}
