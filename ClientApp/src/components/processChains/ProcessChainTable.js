import React, { useState } from "react";

export default function ProcessChainTable(props) {
  const { addTable, id, setSelected, setupChainCreator } = props;
  const [entities, setEntities] = useState([]);
  let [selectedRowId] = useState(null);

  const addChain = (chain) => {
    let tempArray = [...entities];
    tempArray.push(chain);
    setEntities(tempArray);
  };

  const selectRow = (entityId, e) => {
    let style = "border: solid 2px green";
    if (selectedRowId === null) {
      selectedRowId = entityId;
      let row = document.getElementById(selectedRowId);
      row.selected = true;
      row.style = style;
    } else {
      let prevRow = document.getElementById(selectedRowId);
      prevRow.style = "";
      prevRow.selected = false;

      let newRowId = entityId;
      let newRow = document.getElementById(newRowId);
      if (!newRow.selected) {
        newRow.style = style;
        newRow.selected = true;
      } else {
        newRow.style = "";
        newRow.selected = false;
      }
    }

    selectedRowId = entityId;

    setSelected(entityId);
    setupChainCreator(1, selectedRowId);
  };

  addTable(id, addChain);
  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Start Chain</th>
          </tr>
        </thead>
        <tbody>
          {[...entities].map((entity) => {
            return (
              <tr
                onClick={(e) => {
                  selectRow(entity.id, e);
                }}
                id={entity.id}
                key={entity.id}
                selected={false}
              >
                <th scope="row">{entity.id}</th>
                <td>{entity.name}</td>
                <td>
                  <button
                    onClick={() => {
                      props.startAnimation(1, entity.id);
                    }}
                  >
                    Start
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
