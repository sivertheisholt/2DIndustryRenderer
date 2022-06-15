import React from "react";
import {
  Stage,
  AppConsumer,
  Sprite,
  PixiComponent,
  useApp,
} from "@inlet/react-pixi";
import ViewPortComponent from "./ViewPortComponent";
import myImage from "../images/Capture.png";
import { forwardRef, useRef } from "react";
import { Viewport } from "pixi-viewport";

const PixiViewportComponent = PixiComponent("Viewport", {
  create(props) {
    const { app, ...viewportProps } = props;

    const viewport = new Viewport({
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,
      ...viewportProps,
    });

    // activate plugins
    (props.plugins || []).forEach((plugin) => {
      viewport[plugin]();
    });

    return viewport;
  },
  applyProps(viewport, _oldProps, _newProps) {
    const {
      plugins: oldPlugins,
      children: oldChildren,
      ...oldProps
    } = _oldProps;
    const {
      plugins: newPlugins,
      children: newChildren,
      ...newProps
    } = _newProps;

    Object.keys(newProps).forEach((p) => {
      if (oldProps[p] !== newProps[p]) {
        viewport[p] = newProps[p];
      }
    });
  },
  didMount() {
    console.log("viewport mounted");
  },
});

const PixiViewport = forwardRef((props, ref) => (
  <PixiViewportComponent ref={ref} app={useApp()} {...props} />
));

export default function Map(props) {
  const viewportRef = useRef();
  return (
    <Stage width={713} height={817} options={{ backgroundColor: 0xeef1f5 }}>
      <PixiViewport
        ref={viewportRef}
        plugins={["drag", "pinch", "wheel", "decelerate"]}
        screenWidth={713}
        screenHeight={817}
        worldWidth={2000}
        worldHeight={2000}
      >
        <Sprite image={myImage} x={0} y={0}></Sprite>
      </PixiViewport>
    </Stage>
  );
}
