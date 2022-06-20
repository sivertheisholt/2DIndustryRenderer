import { useState } from "react";

const usePaths = () => {
  const [paths] = useState(new Map());
  const [newPathXY, setNewPathXY] = useState({ x: [], y: [] });

  const setPath = (key) => {
    let path = {
      x: newPathXY.x,
      y: newPathXY.y,
    };
    paths.set(key, path);
    setNewPathXY({ x: [], y: [] });
  };

  const getPath = (key) => {
    return paths.get(key);
  };

  const dragPath = (XY) => {
    newPathXY.x.push(XY.x);
    newPathXY.y.push(XY.y);
  };

  return {
    pathCreation: setPath,
    dragPath: dragPath,
    getPath: getPath,
  };
};

export default usePaths;
