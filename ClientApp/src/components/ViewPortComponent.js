import { PixiComponent, useApp } from "@inlet/react-pixi";
import React from "react";
import { forwardRef } from "react";
import { Viewport } from "pixi-viewport";

const PixiViewportComponent = PixiComponent("Viewport", {
  create(props) {
    const { app, ...viewportProps } = props;

    const viewport = new Viewport({
      ticker: props.app.ticker,
      interaction: props.app.renderer.plugins.interaction,

      ...viewportProps,
    });
    viewport.clampZoom({ minWidth: 100, maxWidth: 713 });
    viewport.clamp({ direction: "all" });

    viewport.on("clicked", (e) => {
      props.onClickView(e);
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

export default PixiViewport;
