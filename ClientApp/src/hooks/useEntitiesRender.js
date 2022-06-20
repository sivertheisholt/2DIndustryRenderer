import { useState } from "react";

const useEntitiesRender = () => {
  const [renders] = useState(new Map());
  const addRender = (renderId, updatePath, dragPath, createEntity) => {
    renders.set(renderId, {
      updatePath: updatePath,
      dragPath: dragPath,
      createEntity: createEntity,
    });
  };

  const updatePath = (renderId, entityId) => {
    let render = renders.get(renderId);
    render.updatePath(entityId);
  };

  const dragPath = (renderId, XY) => {
    let render = renders.get(renderId);
    render.dragPath(XY);
  };

  const createEntity = (renderId, entityOptions) => {
    let render = renders.get(renderId);
    render.createEntity(entityOptions);
  };
  return {
    addRender: addRender,
    dragPath: dragPath,
    updatePath: updatePath,
    createEntity: createEntity,
  };
};

export default useEntitiesRender;
