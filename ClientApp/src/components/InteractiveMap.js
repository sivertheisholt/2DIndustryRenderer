import React from "react";
import { useRef, useState } from "react";
import { Sprite, Stage } from "@inlet/react-pixi";
import myImage from "../images/Capture.png";
import ViewPortComponent from "./ViewPortComponent";
import EntitiesRender from "./EntitiesRender";
import useEntitiesRender from "../hooks/useEntitiesRender.js";
import CreateEntityModal from "./CreateEntityModal";
import Button from "react-bootstrap/esm/Button";
import GhostEntity from "./GhostEntity";
import Circle from "./Circle";

export default function InteractiveMap(props) {
  const addEntityTable = props.addEntityTable;
  const getSelected = props.getSelected;

  const [show, setShow] = useState(false);
  const [mapStates] = useState({
    onClickStatus: "",
    onDragStatus: "",
    isMouseDown: false,
    newEntityInfo: {},
    ghostEntityX: 0,
    ghostEntityY: 0,
    entitiesCount: 0,
  });
  const [showPlaceEntity, setShowPlaceEntity] = useState(false);
  const [ghostEntityXY, setGhostEntityXY] = useState({ x: 0, y: 0 });
  const [drawPathPoints, setDrawPathPoints] = useState([{ x: null, y: null }]);

  const viewportRef = useRef();

  const entitiesRenders = useEntitiesRender();

  const onMouseDragView = (e) => {
    let cords = viewportRef.current.toWorld(e.pageX, e.pageY);
    switch (mapStates.onDragStatus) {
      case "NewEntity":
        setGhostEntityXY({
          x: cords.x,
          y: cords.y,
        });
        break;
      case "CreatePath":
        if (mapStates.isMouseDown) {
          entitiesRenders.dragPath(1, cords, getSelected());
          setDrawPathPoints([...drawPathPoints, cords]);
        }
        break;
      default:
    }
  };

  const onMouseClickView = (e) => {
    switch (mapStates.onClickStatus) {
      case "NewEntity":
        createEntity(e);
        setShowPlaceEntity(false);
        break;
      case "CreatePath":
        break;
      default:
    }
  };
  const onMouseDown = (e) => {
    mapStates.isMouseDown = true;
  };

  const onMouseUp = (e) => {
    mapStates.isMouseDown = false;
  };

  const createEntity = (e) => {
    addEntityTable(1, {
      id: mapStates.entitiesCount,
      name: mapStates.newEntityInfo.name,
    });

    entitiesRenders.createEntity(1, {
      id: mapStates.entitiesCount,
      name: mapStates.newEntityInfo.name,
      x: e.world.x,
      y: e.world.y,
      scale: mapStates.newEntityInfo.scale,
      type: mapStates.newEntityInfo.type,
    });
    mapStates.entitiesCount++;
  };

  const onCreatePath = () => {
    mapStates.onDragStatus = "CreatePath";
    viewportRef.current.drag({ mouseButtons: "middle" });
  };
  const confirmPath = () => {
    mapStates.onDragStatus = "";
    mapStates.onClickStatus = "";
    entitiesRenders.updatePath(1, getSelected());
    viewportRef.current.drag({ mouseButtons: "left" });
  };
  const showCreateEntityModal = () => {
    setShow(true);
  };

  const setNewEntityInfo = (entityInfo) => {
    mapStates.newEntityInfo = entityInfo;
    mapStates.onClickStatus = "NewEntity";
    mapStates.onDragStatus = "NewEntity";
    setShowPlaceEntity(true);
  };

  return (
    <>
      <Stage
        width={713}
        height={817}
        options={{ backgroundColor: 0xeef1f5 }}
        onMouseMove={onMouseDragView}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <ViewPortComponent
          ref={viewportRef}
          plugins={["drag", "pinch", "wheel", "decelerate"]}
          screenWidth={713}
          screenHeight={817}
          worldWidth={713}
          worldHeight={817}
          onClickView={onMouseClickView}
          onMouseMove={onMouseDragView}
        >
          <Sprite image={myImage} x={0} y={0}></Sprite>

          {mapStates.onDragStatus === "CreatePath" ? (
            drawPathPoints.map((point, index) => {
              return <Circle x={point.x} y={point.y} key={`${index}`} />;
            })
          ) : (
            <></>
          )}

          <EntitiesRender
            addEntitiesRender={entitiesRenders.addRender}
            addAnimationStartButton={props.addAnimationStartButton}
            id={1}
            getSelected={getSelected}
          />
          {showPlaceEntity ? (
            <GhostEntity
              image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png"
              show={showPlaceEntity}
              XY={ghostEntityXY}
            />
          ) : (
            <></>
          )}
        </ViewPortComponent>
      </Stage>
      <Button onClick={showCreateEntityModal} style={{ marginRight: "5px" }}>
        Create entity
      </Button>
      <Button onClick={onCreatePath} style={{ marginRight: "5px" }}>
        Create Path
      </Button>
      <Button onClick={confirmPath}>Confirm Path</Button>
      {show ? (
        <CreateEntityModal
          setNewEntityInfo={setNewEntityInfo}
          showState={{ showModal: show, setShowModal: setShow }}
        />
      ) : (
        <></>
      )}
    </>
  );
}
