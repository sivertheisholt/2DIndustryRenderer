import React from "react";
import { useState, useEffect } from "react";
import {} from "react/cjs/react.production.min";

export default function EntityTable(props) {
  const [entitites, setEntities] = useState([
    { name: "Entity1", id: 1 },
    { name: "Entity2", id: 2 },
    { name: "Entity3", id: 3 },
  ]);
  const addToList = (entity) => {
    entity.push(addToList);
  };
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody>
          {[...entitites].map((entity) => {
            return (
              <tr key={entity.id}>
                <th scope="row">{entity.id}</th>
                <td>{entity.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
