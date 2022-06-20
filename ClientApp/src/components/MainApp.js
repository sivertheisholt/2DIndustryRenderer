import React from "react";
import useEntityTable from "../hooks/useEntityTable";
import EntityTable from "./EntityTable";
import InteractiveMap from "./InteractiveMap";

export default function MainApp() {
  let entityTable = useEntityTable();
  return (
    <>
      <InteractiveMap
        addEntityTable={entityTable.addEntity}
        addAnimationStartButton={entityTable.addAnimationStartButton}
        getSelected={entityTable.getSelected}
        id={1}
      />
      <EntityTable
        addTable={entityTable.addTable}
        id={1}
        startAnimation={entityTable.startAnimation}
        setSelected={entityTable.setSelected}
      />
    </>
  );
}
