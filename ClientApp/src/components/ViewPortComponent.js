import { Container, PixiComponent, Sprite, useApp } from "@inlet/react-pixi";
import React from "react";
import { Viewport } from "pixi-viewport";
import * as PIXI from "pixi.js";

export default function ViewPortComponent(props) {
  const PixiViewportComponent = PixiComponent("Viewport", {
    create(props) {
      const viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        worldWidth: 1000,
        worldHeight: 1000,

        interaction: props.app.renderer.plugins.interaction, // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      });

      viewport.drag().pinch().wheel().decelerate();
      let sprite = PIXI.Sprite.from("../images/Capture.png");
      viewport.addChild(sprite);
      sprite.tint = 0xff0000;
      sprite.width = sprite.height = 100;
      sprite.position.set(100, 100);

      return viewport;
    },
    applyProps(viewport, _oldProps, _newProps) {},
    didMount() {
      console.log("viewport mounted");
    },
  });
  return (
    <>
      <PixiViewportComponent app={props.app}></PixiViewportComponent>
    </>
  );
}
