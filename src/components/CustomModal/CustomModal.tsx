import React, { ReactElement } from "react";
import Button from "react-bootstrap/Button";
import Modal, { ModalProps } from "react-bootstrap/Modal";

type CustomModalProps = Omit<
  ModalProps,
  "size" | "aria-labelledby" | "centered"
> & {
  title?: string;
  children?: React.ReactNode;
  subheading?: string;
  body?: string;
  bottomComponent?: ReactElement;
};

function CustomModal(props: CustomModalProps) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="custom-modal"
    >
      <Modal.Header className="border-0" id="modal-close" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="padding-title-modal"
        >
          {props.title ?? ""}
        </Modal.Title>
      </Modal.Header>
      {props.children ? (
        <Modal.Body>{props.children}</Modal.Body>
      ) : (
        <Modal.Body>
          <h4>{props.subheading ?? ""}</h4>
          <p>{props.body}</p>
        </Modal.Body>
      )}
      {props.bottomComponent ? (
        <Modal.Footer className="d-flex justify-content-center align-items-center border-0 mb-5">
          {props.bottomComponent}
        </Modal.Footer>
      ) : (
        <Modal.Footer className="d-flex justify-content-center">
          <Button onClick={props.onHide}>{props.closeButtonLabel}</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}
export default CustomModal;
