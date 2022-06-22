import React from "react";
import MovableEntity from "./entities/MovableEntity";
import RenderEntity from "../Entities/RenderEntitity";
import useAnimations from "../hooks/useAnimations";

import { useState, useEffect } from "react";
import usePaths from "../hooks/usePaths";
import StaticEntity from "./entities/StaticEntity";

export default function EntitiesRender(props) {
  const { addAnimationStart, addAnimationStartButton, addEntitiesRender } =
    props;
  const [entities, setEntities] = useState(new Map());

  const animations = useAnimations();
  const paths = usePaths();

  const newEntity = (entityOptions) => {
    const entity = new RenderEntity(
      entityOptions.id,
      entityOptions.name,
      entityOptions.x,
      entityOptions.y,
      entityOptions.scale,
      {},
      entityOptions.type
    );
    entities.set(entityOptions.id, entity);
    let temp = new Map(entities);
    setEntities(temp);
  };

  const updatePath = (id) => {
    paths.pathCreation(id);
    let tempMap = new Map(entities);
    tempMap.get(id).path = paths.getPath(id);
    setEntities(tempMap);
  };

  useEffect(() => {
    addAnimationStart(1, animations.startAnimation);
    addAnimationStartButton(1, animations.startAnimation);
  });

  addEntitiesRender(props.id, updatePath, paths.dragPath, newEntity);

  return (
    <>
      {[...entities.keys()].map((entity) => {
        let entityValue = entities.get(entity);
        if (entityValue.type === "MovableEntity") {
          return (
            <MovableEntity
              key={entityValue.id}
              id={entityValue.id}
              addAnimation={animations.addAnimation}
              scale={entityValue.scale}
              x={entityValue.x}
              y={entityValue.y}
              path={entityValue.path}
            />
          );
        } else {
          return (
            <StaticEntity
              image={entityValue.image}
              x={entityValue.x}
              y={entityValue.y}
              scale={entityValue.scale}
              key={entityValue.id}
            />
          );
        }
      })}
    </>
  );
}
