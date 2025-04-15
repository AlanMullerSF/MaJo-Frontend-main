import { useState } from "react";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import RoundButton from "../../../dashboard/components/RoundButton";
import "./styles.scss";
import { FormSentModal } from "./FormSentModal";

type ConfirmFormModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  handleSubmit: () => void;
};

/**
 * A modal component that displays a confirmation form.
 * @param {object} props - The component props.
 * @param {boolean} props.showModal - Determines whether the modal is shown or hidden.
 * @param {function} props.setShowModal - A function to toggle the visibility of the modal.
 * @param {function} props.handleSubmit - A function to handle form submission.
 * @returns The ConfirmFormModal component.
 */
export const ConfirmFormModal = ({
  showModal,
  setShowModal,
  handleSubmit,
}: ConfirmFormModalProps) => {
  const [showSentModal, setShowSentModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const title = "¿Está seguro que desea enviar el formulario?";

  const sendForm = () => {
    handleSubmit();
    setShowSentModal(true);
  };

  return (
    <CustomModal
      key="no-diagnosisuser-modal"
      show={showModal}
      onHide={closeModal}
      bottomComponent={
        <CloseButton
          onCancel={closeModal}
          onSubmit={sendForm}
          loading={false}
        />
      }
    >
      <div className="nd-container">
        <span className="nd-title">{title}</span>
        <span className="nd-body">
          Una vez enviado el formulario, queremos recordarle que no será posible
          realizar cambios en la información que ha compartido.
        </span>
      </div>

      <FormSentModal showModal={showSentModal} />
    </CustomModal>
  );
};

type CloseButtonProps = {
  onCancel: () => void;
  onSubmit: () => void;
  loading: boolean;
};

/**
 * TODO Create a single component to render footer cta
 * Renders a close button component with two options: "No, deseo seguir editando" and "Si, enviar formulario".
 * @param {CloseButtonProps} onCancel - The function to call when the "No, deseo seguir editando" button is clicked.
 * @param {CloseButtonProps} onSubmit - The function to call when the "Si, enviar formulario" button is clicked.
 * @param {boolean} loading - Indicates whether the button is in a loading state.
 * @returns The rendered close button component.
 */
const CloseButton = ({ onCancel, onSubmit, loading }: CloseButtonProps) => {
  return (
    <section className="form-footer-cta">
      <RoundButton
        label="No, deseo seguir editando"
        onClick={onCancel}
        variant="outlined"
      />
      <RoundButton
        label="Si, enviar formulario"
        onClick={onSubmit}
        variant="filled"
        loading={loading}
        type="submit"
      />
    </section>
  );
};
