import { useState } from "react";

const useProcessChainCreator = () => {
  const [chains] = useState(new Map());
  const addCreator = (chainCreatorId, setupCreator) => {
    chains.set(chainCreatorId, {
      setupCreator: setupCreator,
    });
  };

  const setupCreator = (chainCreatorId, processId) => {
    let creator = chains.get(chainCreatorId);
    creator.setupCreator(processId);
  };

  return {
    addCreator: addCreator,
    setupCreator: setupCreator,
  };
};

export default useProcessChainCreator;
