import { Sprite, useTick } from "@inlet/react-pixi";
import { React, useReducer } from "react";
import { useState, useEffect } from "react";
const reducer = (_, { data }) => data;

export default function MovableEntity(props) {
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [motion, update] = useReducer(reducer);
  const [animation, setAnimation] = useState(false);

  const startAnimation = () => {
    setAnimation(true);
  };

  useTick((delta) => {
    if (animation) {
      update({
        type: "update",
        data: {
          x: props.path.x[xPos],
          y: props.path.y[yPos],
        },
      });
      if (xPos - 1 >= props.path.x.length) {
        setAnimation(false);
        setXPos(0);
        setYPos(0);
      } else {
        setXPos(xPos + 1);
        setYPos(yPos + 1);
      }
    }
  });

  useEffect(() => {
    props.addAnimation(startAnimation, props.id);
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
