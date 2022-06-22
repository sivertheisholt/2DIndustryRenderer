import { useState } from "react";

class ProcessChain {
  constructor(id) {
    this.id = id;
    this.children = [];
    this.finished = false;
  }
}
class EntityChild {
  constructor(id, entities, startFunction, parentId) {
    this.id = id;
    this.entities = entities;
    this.startFunction = startFunction;
    this.parentId = parentId;
  }
}

const useProcessChains = () => {
  const [processChains] = useState(new Map());

  const createProcessChain = (id) => {
    const processChain = new ProcessChain(id);
    processChains.set(id, processChain);
  };

  const addEntity = (processId, entitityId, startFunc, parentsId) => {
    let node = processChains.get(processId);
    parentsId.reverse();
    for (let child of parentsId) {
      node = node.get(child);
    }
    const entity = new EntityChild(entitityId, startFunc);
    node.set(entitityId, entity);
  };

  const getProcess = (processId) => {
    return processChains.get(processId);
  };

  const addEntityToEntity = (processId, entityId, newEntityId) => {};

  const addEntityToProcess = (processId, entityId) => {
    processChains.get(processId).entities.set(entityId);
  };

  const getParent = (processId, entityId) => {
    const process = processChains.get(processId);
  };

  return { addEntity, getProcess, createProcessChain };
};
export default useProcessChains;
