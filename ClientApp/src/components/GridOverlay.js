import React from "react";
import { useState } from "react";

export default function GridOverlay(props) {
  const { widthPx, heightPx } = props;
  const [grid, setGrid] = useState(new Map());

  for (let x = 0; x < widthPx / 8; x++) {
    let xId = `${x}-x`;
    if (!grid.has(xId)) {
      grid.set(xId, []);
    }
    for (let y = 0; y < heightPx / 8; y++) {
      let yId = `${y}-y`;
      grid.get(xId).push(yId);
    }
  }

  const createGrids = [...grid.keys()].map((xId) => {
    return (
      <div
        key={xId}
        style={{
          border: "solid",
          width: "8px",
          height: "8px",
          display: "inline-block",
        }}
      >
        {[...grid.get(xId)].map((yId) => {
          return (
            <div
              key={`${xId}-${yId}`}
              style={{ border: "solid 0.2px", width: "8px", height: "8px" }}
            ></div>
          );
        })}
      </div>
    );
  });
  return <>{createGrids}</>;
}
