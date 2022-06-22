import { useState } from "react";

const useInteractiveMap = () => {
  const [interactiveMap] = useState(new Map());

  const addIntMap = (id, onClickMap, onDragMap) => {
    interactiveMap.set(id, {
      onClickMap: onClickMap,
      onDragMap: onDragMap,
      startAnimation: null,
    });
  };
  const addStartAnimation = (mapId, startAnimationFunc) => {
    interactiveMap.get(mapId).startAnimation = startAnimationFunc;
  };
  const getStartAnimation = (mapId) => {
    return interactiveMap.get(mapId).startAnimation;
  };
  const onClick = (id) => {
    let intMap = interactiveMap.get(id);
    intMap.onClickMap();
  };
  const onDrag = (id) => {
    let intMap = interactiveMap.get(id);
    intMap.onDragMap();
  };
  return { onClick, onDrag, addIntMap, addStartAnimation, getStartAnimation };
};

export default useInteractiveMap;
