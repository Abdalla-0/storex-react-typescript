import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const MeasurementsPopup = () => {
  const [modalToggler, setModalToggler] = useState(false);
  const handleToggle = () => setModalToggler(false);

  return (
    <>
      <Modal show={modalToggler} onHide={handleToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleToggle}>
            Close
          </Button>
          <Button variant="primary" onClick={handleToggle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
