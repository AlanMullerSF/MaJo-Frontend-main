import { useState } from "react";
import { Form, FormGroup } from "react-bootstrap";
import FormWrapper from "../FormWrapper";
import { NoDiagnosisModal } from "../modals/NoDiagnosisModal";
import "./styles.scss";

type DiagnosisInfo = {
  hasDiagnosis?: boolean | null;
};

type DiagnosisInfoFormProps = DiagnosisInfo & {
  updateFields: (fields: Partial<DiagnosisInfo>) => void;
};

/**
 * Renders the main form component for the diagnosis information page.
 * @param {DiagnosisInfoFormProps} props - The props for the component.
 * @returns The rendered form component.
 */
export default function FormMainPage({
  hasDiagnosis,
  updateFields,
}: DiagnosisInfoFormProps) {
  const [showModal, setShowModal] = useState(false);

  function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "true") {
      updateFields({
        hasDiagnosis: true,
      });
    } else if (e.target.value === "false") {
      updateFields({
        hasDiagnosis: false,
      });
      setShowModal(true);
    }
  }

  return (
    <FormWrapper>
      <div className="form-main-page">
        <div>
          <Form.Label className="form-welcome">
            ¡Bienvenido/a al Formulario de Registro de la Fundación María José
            A.C.!
          </Form.Label>
          <Form.Label style={{ textAlign: "justify" }}>
            La Fundación María José es la única en México que atiende a más de
            250 beneficiarios con el Síndrome de Prader Willi. Nuestra misión es
            mejorar la calidad de vida en situaciones de vulnerabilidad a través
            del apoyo en realizar el diagnóstico, atención especializada y
            multidisciplinaria.
            <br />
            <br />
            Mediante este formulario, usted podrá tener acceso a las actividades
            y beneficios que nuestra fundación ofrece.{" "}
          </Form.Label>
        </div>
        <div>
          <br />
          <FormGroup className="mb-3">
            <Form.Label>
              ¿El beneficiario cuenta con diagnóstico de Síndrome Prader Willi?
            </Form.Label>
            <div className="diagnosis-checks">
              <Form.Check
                required
                inline
                className="input-check"
                type="radio"
                id="true"
                name="diagnosis"
                value="true"
                onChange={handleClick}
                checked={hasDiagnosis === true}
              />
              <Form.Label>Si</Form.Label>
            </div>
            <div className="diagnosis-checks">
              <Form.Check
                inline
                className="input-check"
                type="radio"
                id="false"
                name=""
                value="false"
                onChange={handleClick}
                checked={hasDiagnosis === false}
              />
              <Form.Label>No</Form.Label>
            </div>
          </FormGroup>
        </div>
      </div>
      <NoDiagnosisModal showModal={showModal} setShowModal={setShowModal} />
    </FormWrapper>
  );
}
