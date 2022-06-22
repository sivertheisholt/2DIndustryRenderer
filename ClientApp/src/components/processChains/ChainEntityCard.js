import React from "react";

export default function ChainEntityCard(props) {
  const { text, onSelectCard, cardId } = props;
  return (
    <div
      onClick={onSelectCard}
      className="card"
      id={cardId}
      style={{
        width: "100%",
        border: "dashed 2px green",
        marginTop: "10px",
        marginBottom: "10px",
        textAlign: "center",
      }}
    >
      <div className="card-body" style={{ pointerEvents: "none" }}>
        <p className="card-text" style={{ pointerEvents: "none" }}>
          Process Root
        </p>
      </div>
    </div>
  );
}
