import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import ProcessChainTable from "./ProcessChainTable";
import ProcessChainCreator from "./ProcessChainCreator";
import useProcessChains from "../../hooks/processChains/useProcessChains";

export default function ProcessChains(props) {
  const {
    useChainCreator,
    useChainTable,
    getSelectedEntityId,
    getStartAnimation,
  } = props;
  const processChains = useProcessChains();
  const [processChainCounter, setProcessChainCounter] = useState(1);
  const [selectedProcessNodeId, setSelectedProcessNodeId] = useState(null);

  const createProcess = () => {
    let chain = {
      id: processChainCounter,
      name: "Test",
    };
    useChainTable.addProcess(1, chain);
    processChains.createProcessChain(chain.id);
    setProcessChainCounter(processChainCounter + 1);
  };

  const saveProcess = () => {
    console.log("Saving process");
  };

  const addEntity = (e) => {
    const selectedEntityId = getSelectedEntityId();
    const selectedProcessId = useChainTable.getSelected();
    const getAnimation = getStartAnimation(1);
    let parentId = selectedProcessId;
    const parentIds = [];
    /* TODO
    while(parentId !== 'Test') {
      parentId = document.getElementById(parentId).parentNode.id;
      let idSplit = document.getElementById(selectedProcessId).id.split('-');
      parentId.push()
    }
    console.log(document.getElementById(selectedProcessNodeId));
    */
    processChains.addEntity(
      selectedProcessId,
      selectedEntityId,
      getAnimation,
      parentIds
    );
    console.log("Adding entity");
  };

  return (
    <>
      <h5>Process Chains</h5>
      <Button onClick={createProcess}>Create process</Button>
      <ProcessChainTable
        addTable={useChainTable.addTable}
        id={1}
        setSelected={useChainTable.setSelected}
        setupChainCreator={useChainCreator.setupCreator}
      />
      <h5>Process Chain Creator</h5>
      <Button onClick={saveProcess} style={{ marginBottom: "10px" }}>
        Save process
      </Button>
      <Button
        onClick={addEntity}
        style={{ marginBottom: "10px", marginLeft: "10px" }}
      >
        Add entity
      </Button>

      <ProcessChainCreator
        addCreator={useChainCreator.addCreator}
        id={1}
        getProcess={processChains.getProcess}
        setSelectedProcessId={setSelectedProcessNodeId}
      />
    </>
  );
}
