import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
const EditHandler = ({
  modalState,
  saveEditHandler,
  setModalState,
  editedValue,
  setEditedValue,
}) => {
     
  return (
    <Modal
      show={modalState}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="bg-dark ">
        <Modal.Header className="border-0">
          <Modal.Title id="contained-modal-title-vcenter ">
            Edit Todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            className="bg-dark text-light"
            placeholder="any"
            onChange={(e)=> setEditedValue({...editedValue , title : e.target.value})}
            value={editedValue.title}
          ></Form.Control>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button onClick={()=>setModalState(false)} >Close</Button>
          <Button onClick={()=>saveEditHandler(editedValue)} >Save Changes</Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default EditHandler;
