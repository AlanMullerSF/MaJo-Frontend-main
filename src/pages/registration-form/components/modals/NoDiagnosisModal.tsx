import CustomModal from "../../../../components/CustomModal/CustomModal";
import "./styles.scss";
import { GoMail } from "react-icons/go";
import { BsWhatsapp } from "react-icons/bs";
import RoundButton from "../../../dashboard/components/RoundButton";

type NoDiagnosisModalProps = {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
};

/**
 * A modal component that displays a message and contact information when no diagnosis is available.
 * @param {NoDiagnosisModalProps} showModal - A boolean indicating whether the modal should be shown or not.
 * @param {function} setShowModal - A function to toggle the visibility of the modal.
 * @returns The NoDiagnosisModal component.
 */
export const NoDiagnosisModal = ({
  showModal,
  setShowModal,
}: NoDiagnosisModalProps) => {
  const closeModal = () => {
    setShowModal(false);
  };

  const title =
    "En caso de requerir un diagnóstico puede ponerse en contacto con nosotros a través de los siguientes medios y con gusto le atenderemos:";

  return (
    <CustomModal
      key="no-diagnosisuser-modal"
      show={showModal}
      onHide={closeModal}
      bottomComponent={<FormFooter closeModal={closeModal} loading={false} />}
    >
      <div className="nd-container">
        <span className="nd-title">{title}</span>
        <span className="nd-contact">
          <GoMail /> praderwillimexico@gmail.com
        </span>
        <span className="nd-contact">
          <BsWhatsapp /> (+52) 771 129 2799
        </span>
      </div>
    </CustomModal>
  );
};

type CloseModalButton = {
  closeModal: () => void;
  loading: boolean;
};

/**
 * Renders the footer section of a form.
 * @param {CloseModalButton} closeModal - Function to close the modal.
 * @param {boolean} loading - Indicates if the form is currently loading.
 * @returns The rendered form footer section.
 */
const FormFooter = ({ closeModal, loading }: CloseModalButton) => {
  return (
    <section className="form-footer-cta">
      <RoundButton
        label="Volver a la página principal"
        onClick={closeModal}
        variant="filled"
        loading={loading}
        type="submit"
      />
    </section>
  );
};
