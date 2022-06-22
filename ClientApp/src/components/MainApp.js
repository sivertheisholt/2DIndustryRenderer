import React from "react";
import useEntityTable from "../hooks/useEntityTable";
import useProcessChainCreator from "../hooks/processChains/useProcessChainCreator";
import EntityTable from "./EntityTable";
import InteractiveMap from "./InteractiveMap";

import useProcessChainTable from "../hooks/processChains/useProcessChainTable";
import ProcessChains from "./processChains/ProcessChains";
import useInteractiveMap from "../hooks/useInteractiveMap";

export default function MainApp() {
  let interactiveMap = useInteractiveMap();
  let entityTable = useEntityTable();
  let chainCreator = useProcessChainCreator();
  let chainTable = useProcessChainTable();
  return (
    <>
      <InteractiveMap
        addEntityTable={entityTable.addEntity}
        addAnimationStartButton={entityTable.addAnimationStartButton}
        mapAddEntity={interactiveMap.addEntity}
        addInteractiveMap={interactiveMap.addIntMap}
        mapAddAnimationToEntity={interactiveMap.addStartAnimation}
        getSelected={entityTable.getSelected}
        id={1}
      />
      <h5>Entities</h5>
      <EntityTable
        addTable={entityTable.addTable}
        id={1}
        startAnimation={entityTable.startAnimation}
        setSelected={entityTable.setSelected}
      />
      <ProcessChains
        useChainCreator={chainCreator}
        useChainTable={chainTable}
        getSelectedEntityId={entityTable.getSelected}
        getStartAnimation={interactiveMap.getStartAnimation}
      />
    </>
  );
}
