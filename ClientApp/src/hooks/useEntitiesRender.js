import { useState } from "react";

const useEntitiesRender = () => {
  const [renders, setRenders] = useState(new Map());
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

  const dragPath = (renderId, e, entityId) => {
    let render = renders.get(renderId);
    render.dragPath(e, entityId);
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
