import { useState } from "react";

const useEntityTable = () => {
  const [tables, setTables] = useState(new Map());
  let selected = null;

  const addTable = (tableId, addEntityFunc) => {
    tables.set(tableId, {
      addEntity: addEntityFunc,
      animationButton: null,
    });
  };

  const addEntity = (tableId, entity) => {
    let tableAddEntity = tables.get(tableId).addEntity;
    tableAddEntity(entity);
  };

  const addAnimationStartButton = (tableId, animationStartFunc) => {
    tables.get(tableId).animationButton = animationStartFunc;
  };

  const startAnimation = (tableId, entityId) => {
    tables.get(tableId).animationButton(entityId);
  };
  const setSelected = (selectedId) => {
    selected = selectedId;
  };
  const getSelected = () => {
    return selected;
  };

  return {
    addTable: addTable,
    addEntity: addEntity,
    addAnimationStartButton: addAnimationStartButton,
    startAnimation: startAnimation,
    setSelected: setSelected,
    getSelected: getSelected,
  };
};

export default useEntityTable;
