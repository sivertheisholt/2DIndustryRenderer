import React from "react";
import Machine from "./Machine";
import RenderEntity from "../Entities/RenderEntitity";

import { useState, useEffect, useRef } from "react";

export default function EntitiesRender(props) {
  const [entities, setEntities] = useState(new Map());
  const childMachine = useRef(null);

  let startPathCreation = false;
  let newPathX = [];
  let newPathY = [];

  const setPath = (entity) => {
    entity.path = {
      x: newPathX,
      y: newPathY,
    };
    let tempMap = new Map(entities);
    tempMap.set(entity.id, entity);
    setEntities(tempMap);
  };

  const onClickStartPath = (e, id) => {
    if (startPathCreation) {
      setPath(entities.get(id));
      startPathCreation = false;
    } else {
      startPathCreation = true;
    }
  };

  const dragPath = (e) => {
    if (startPathCreation) {
      console.log(e.pageX);
      newPathX.push(e.pageX);
      newPathY.push(e.pageY);
    }
  };

  const newEntity = (id, name, x, y, scale) => {
    console.log("Test");
    const entity = new RenderEntity(id, name, x, y, scale, {});
    entities.set(id, entity);
    let temp = new Map(entities);
    setEntities(temp);
  };

  useEffect(() => {
    props.onClickViewRef.current = onClickStartPath;
    props.onMouseMoveRef.current = dragPath;
    props.createEntityRef.current = newEntity;
  });

  return (
    <>
      {[...entities.keys()].map((entity) => {
        let entityValue = entities.get(entity);
        return (
          <Machine
            key={entityValue.id}
            machineAnimation={childMachine}
            scale={entityValue.scale}
            x={entityValue.x}
            y={entityValue.y}
            path={entityValue.path}
          />
        );
      })}
    </>
  );
}
