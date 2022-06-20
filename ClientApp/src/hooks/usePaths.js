import { useState } from "react";

const usePaths = () => {
  const [paths, setPaths] = useState(new Map());
  let newPathX = [];
  let newPathY = [];
  let startPathCreation = false;

  const setPath = (key) => {
    let path = {
      x: newPathX,
      y: newPathY,
    };
    paths.set(key, path);
  };

  const getPath = (key) => {
    return paths.get(key);
  };

  const pathCreation = (key) => {
    if (startPathCreation) {
      startPathCreation = false;
      setPath(key);
    } else {
      startPathCreation = true;
    }
    return startPathCreation;
  };

  const dragPath = (e) => {
    if (startPathCreation) {
      newPathX.push(e.pageX);
      newPathY.push(e.pageY);
    }
  };

  return {
    pathCreation: pathCreation,
    dragPath: dragPath,
    getPath: getPath,
  };
};

export default usePaths;
