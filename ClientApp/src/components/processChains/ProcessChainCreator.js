import React, { useState } from "react";
import ChainEntityCard from "./ChainEntityCard";

export default function ProcessChainCreator(props) {
  const { addCreator, id, getProcess, setSelectedProcessId } = props;
  const [chain, setChain] = useState([]);

  const setupCreator = (processId) => {
    const process = getProcess(processId);
    setChain(process.children);
  };

  const onSelectCard = (e) => {
    setSelectedProcessId(e.target.id);
  };

  addCreator(id, setupCreator);

  return (
    <div
      className="container"
      style={{ width: "100%", border: "dashed 5px red" }}
      id="Test"
    >
      <ChainEntityCard
        text="Process Root"
        onSelectCard={onSelectCard}
        cardId={`chain-node-${0}`}
      />
      {chain.map((chain) => {
        return (
          <ChainEntityCard
            text="Hello"
            id={`chain-node-${chain.id}`}
            key={`chain-node-${chain.id}`}
            onSelectCard={onSelectCard}
          />
        );
      })}
    </div>
  );
}
