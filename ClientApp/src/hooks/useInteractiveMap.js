import { useState } from "react";

const useInteractiveMap = () => {
  const [interactiveMap, setInteractiveMap] = useState(new Map());

  const addIntMap = (id, onClickMap, onDragMap) => {
    interactiveMap.set(id, { onClickMap: onClickMap, onDragMap: onDragMap });
  };
  const onClick = (id) => {
    let intMap = interactiveMap.get(id);
    intMap.onClickMap();
  };
  const onDrag = (id) => {
    let intMap = interactiveMap.get(id);
    intMap.onDragMap();
  };
  return { onClick: onClick, onDrag: onDrag, addIntMap: addIntMap };
};

export default useInteractiveMap;
