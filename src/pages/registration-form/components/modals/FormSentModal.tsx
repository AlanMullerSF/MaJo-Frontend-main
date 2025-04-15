import CustomModal from "../../../../components/CustomModal/CustomModal";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import RoundButton from "../../../dashboard/components/RoundButton";

type FormSentModalProps = {
  showModal: boolean;
};

/**
 * A modal component that is displayed when a form is successfully submitted.
 * @param {FormSentModalProps} showModal - A boolean indicating whether the modal should be shown or not.
 * @returns The JSX code for the FormSentModal component.
 */
export const FormSentModal = ({ showModal }: FormSentModalProps) => {
  const title = "¡Su formulario ha sido enviado!";

  const navigate = useNavigate();

  function endForm() {
    navigate(0);
  }

  return (
    <CustomModal
      key="no-diagnosisuser-modal"
      show={showModal}
      bottomComponent={<CloseButton endForm={endForm} loading={false} />}
    >
      <div className="nd-container">
        <span className="nd-title">{title}</span>
        <span className="nd-body">
          Agradecemos su tiempo y compromiso. En la Fundación María José, cada
          día es una oportunidad para avanzar juntos. Su participación es
          inspiradora y esperamos con entusiasmo trabajar juntos para un futuro
          mejor.
          <br />
          <br />
          ¡Bienvenido/a a nuestra comunidad!
        </span>
      </div>
    </CustomModal>
  );
};

type CloseButtonProps = {
  endForm: () => void;
  loading: boolean;
};

/**
 * TODO Create a single comoponent for Footer CTA
 * Renders a close button component.
 * @param {CloseButtonProps} endForm - Function to be called when the button is clicked.
 * @param {CloseButtonProps} loading - Boolean indicating if the button is in a loading state.
 * @returns The rendered close button component.
 */
const CloseButton = ({ endForm, loading }: CloseButtonProps) => {
  return (
    <section className="form-footer-cta">
      <RoundButton
        label="Volver a la página principal"
        onClick={endForm}
        variant="filled"
        loading={loading}
        type="submit"
      />
    </section>
  );
};
