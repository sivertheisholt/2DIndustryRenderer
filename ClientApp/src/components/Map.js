import React from "react";
import { Stage, AppConsumer, Sprite } from "@inlet/react-pixi";
import ViewPortComponent from "./ViewPortComponent";
import myImage from "../images/Capture.png";

const handleScroll = (event) => {
  console.log("Hello");
};

export default function Map(props) {
  return (
    <Stage width={713} height={817} options={{ backgroundColor: 0xeef1f5 }}>
      <AppConsumer>
        {(app) => (
          <ViewPortComponent app={app}>
            <Sprite image={myImage}></Sprite>
          </ViewPortComponent>
        )}
      </AppConsumer>
    </Stage>
  );
}

/*
Sprite image={myImage} x={0} y={0}>
      <Container position={[250, 250]}>
        <Bunny x={250} scale={5} />
      </Container>
    </Sprite>
    */
