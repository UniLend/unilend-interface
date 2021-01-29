import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";
import { useStore } from "../../../../store/store";
import "../../../../theme.scss";
import "./CurrencySelectModel.scss";
interface Props {
  show: boolean;
  handleClose: () => void;
}

const CurrencySelectModel: FC<Props> = ({ show, handleClose }) => {
  const state: any = useStore()[0];
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CurrencySelectModel;
