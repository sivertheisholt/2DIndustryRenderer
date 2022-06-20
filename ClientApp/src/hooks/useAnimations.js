import { useState } from "react";

const useAnimations = () => {
  const [animations, setAnimations] = useState(new Map());

  //KEY == ENTITY KEY
  const startAnimation = (key) => {
    let animation = animations.get(key);
    animation();
  };

  //KEY == ENTITY KEY
  const addAnimation = (fStartAnimation, key) => {
    animations.set(key, fStartAnimation);
  };

  return { startAnimation: startAnimation, addAnimation: addAnimation };
};

export default useAnimations;
