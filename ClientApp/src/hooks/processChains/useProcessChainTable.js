import { useState } from "react";

const useProcessChainTable = () => {
  const [chains] = useState(new Map());
  let selected = null;

  const addTable = (chainTableId, addChainFunc) => {
    chains.set(chainTableId, {
      addChainFunc: addChainFunc,
    });
  };
  const addProcess = (chainTableId, chain) => {
    let tableAddChain = chains.get(chainTableId).addChainFunc;
    tableAddChain(chain);
  };
  const setSelected = (selectedId) => {
    selected = selectedId;
  };
  const getSelected = () => {
    return selected;
  };
  return {
    addTable: addTable,
    addProcess: addProcess,
    setSelected: setSelected,
    getSelected: getSelected,
  };
};

export default useProcessChainTable;
