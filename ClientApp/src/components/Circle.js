import React, { useCallback } from "react";
import { Graphics } from "@inlet/react-pixi";

export default function Circle(props) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(0xffff0b, 0.5);
      g.drawCircle(props.x, props.y, 1);
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
}
