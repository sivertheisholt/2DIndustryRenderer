import React from "react";
import { useState } from "react";

export default function EntityTable(props) {
  const [entities, setEntities] = useState([]);
  const addTable = props.addTable;
  let [selectedRowId, setSelectedRowId] = useState(null);

  const addEntity = (entity) => {
    let tempArray = [...entities];
    tempArray.push(entity);
    setEntities(tempArray);
  };

  const selectRow = (entityId, e) => {
    let style = "border: solid 2px green";
    if (selectedRowId === null) {
      selectedRowId = `tableRow-${entityId}`;
      let row = document.getElementById(selectedRowId);
      row.selected = true;
      row.style = style;
    } else {
      let prevRow = document.getElementById(selectedRowId);
      prevRow.style = "";
      prevRow.selected = false;

      let newRowId = `tableRow-${entityId}`;
      let newRow = document.getElementById(newRowId);
      if (!newRow.selected) {
        newRow.style = style;
        newRow.selected = true;
      } else {
        newRow.style = "";
        newRow.selected = false;
      }
    }

    selectedRowId = `tableRow-${entityId}`;

    props.setSelected(entityId);
  };

  addTable(props.id, addEntity);
  return (
    <>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Animation</th>
          </tr>
        </thead>
        <tbody>
          {[...entities].map((entity) => {
            return (
              <tr
                onClick={(e) => {
                  selectRow(entity.id, e);
                }}
                id={`tableRow-${entity.id}`}
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
