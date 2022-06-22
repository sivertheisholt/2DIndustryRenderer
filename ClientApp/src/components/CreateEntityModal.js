import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function CreateEntityModal(props) {
  const { showModal, setShowModal } = props.showState;
  const setNewEntityInfo = props.setNewEntityInfo;
  let entity = {
    name: "New Entity",
    type: "",
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.chartType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="name">Entity Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Entity Name"
              id="name"
              onChange={(e) => {
                entity.name = e.target.value;
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="type">Entity type:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue=""
              onChange={(e) => {
                entity.type = e.target.value;
              }}
            >
              <option value="">Select entity type</option>
              <option value="MovableEntity">Movable Entity</option>
              <option value="StaticEntity">Static Entity</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setNewEntityInfo(entity);
              handleClose();
            }}
          >
            Add entity
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
