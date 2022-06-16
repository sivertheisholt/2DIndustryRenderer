import React from "react";
import { useRef } from "react";
import { Sprite, Stage } from "@inlet/react-pixi";
import myImage from "../images/Capture.png";
import ViewPortComponent from "./ViewPortComponent";
import EntitiesRender from "./EntitiesRender";

export default function OverviewMap(props) {
  const viewportRef = useRef();
  const onClickViewportRef = useRef(null);
  const onMouseDragRef = useRef(null);
  const createEntityButtonRef = useRef(null);

  const onMouseDragView = (e) => {
    onMouseDragRef.current(e);
  };

  const onMouseClickView = (e) => {
    onClickViewportRef.current(e);
  };

  const onCreateEntity = () => {
    createEntityButtonRef.current(1, "test", 100, 100, 2);
  };

  return (
    <>
      <Stage
        width={713}
        height={817}
        options={{ backgroundColor: 0xeef1f5 }}
        onMouseMove={onMouseDragView}
      >
        <ViewPortComponent
          ref={viewportRef}
          plugins={["drag", "pinch", "wheel", "decelerate"]}
          screenWidth={713}
          screenHeight={817}
          worldWidth={1000}
          worldHeight={1000}
          onClickView={onMouseClickView}
        >
          <Sprite image={myImage} x={0} y={0}></Sprite>
          <EntitiesRender
            onClickViewRef={onClickViewportRef}
            onMouseMoveRef={onMouseDragRef}
            createEntityRef={createEntityButtonRef}
          />
        </ViewPortComponent>
      </Stage>
      <button onClick={onCreateEntity}>PRESS ME</button>
    </>
  );
}
