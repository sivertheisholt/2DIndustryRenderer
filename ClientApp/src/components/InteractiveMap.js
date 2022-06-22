import React from "react";
import { useRef, useState } from "react";
import { Sprite, Stage } from "@inlet/react-pixi";
import myImage from "../images/Map.jpg";
import ViewPortComponent from "./ViewPortComponent";
import EntitiesRender from "./EntitiesRender";
import useEntitiesRender from "../hooks/useEntitiesRender.js";
import CreateEntityModal from "./CreateEntityModal";
import Button from "react-bootstrap/esm/Button";
import GhostEntity from "./entities/GhostEntity";
import Circle from "./Circle";

import testImage from "../images/factory.png";

export default function InteractiveMap(props) {
  const {
    addEntityTable,
    getSelected,
    addInteractiveMap,
    addAnimationStartButton,
    mapAddAnimationToEntity,
    id,
  } = props;

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
  const [ghostEntityInfo, setGhostEntityInfo] = useState({
    x: 0,
    y: 0,
    scale: 1,
    image: "",
  });
  const [drawPathPoints, setDrawPathPoints] = useState([{ x: null, y: null }]);

  const viewportRef = useRef();

  const entitiesRenders = useEntitiesRender();

  const onMouseDragView = (e) => {
    let cords = viewportRef.current.toWorld(e.pageX, e.pageY);
    switch (mapStates.onDragStatus) {
      case "NewEntity":
        setGhostEntityInfo({
          x: cords.x,
          y: cords.y,
          scale: 1 / viewportRef.current.scale.x,
          image: testImage,
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
      scale: 1 / viewportRef.current.scale.x,
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

  addInteractiveMap(id, onMouseClickView, onMouseDragView);

  return (
    <>
      <Stage
        width={800}
        height={1000}
        options={{ backgroundColor: 0xeef1f5 }}
        onMouseMove={onMouseDragView}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <ViewPortComponent
          ref={viewportRef}
          plugins={["drag", "pinch", "wheel", "decelerate"]}
          screenWidth={800}
          screenHeight={1000}
          worldWidth={4800}
          worldHeight={2914}
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
            addAnimationStartButton={addAnimationStartButton}
            addAnimationStart={mapAddAnimationToEntity}
            id={1}
            getSelected={getSelected}
          />
          {showPlaceEntity ? (
            <GhostEntity
              image={ghostEntityInfo.image}
              show={showPlaceEntity}
              x={ghostEntityInfo.x}
              y={ghostEntityInfo.y}
              scale={ghostEntityInfo.scale}
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
