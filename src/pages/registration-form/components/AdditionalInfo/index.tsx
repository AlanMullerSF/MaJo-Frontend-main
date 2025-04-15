import { useState } from "react";
import FormWrapper from "../FormWrapper";
import { Form, FormGroup } from "react-bootstrap";
import ProgressBar from "../ProgressBar";

type AdditionalInfo = {
  socialSecurityRegime: string; //ENUM
  reasonsForJoining: Set<string> | string[]; //Collection
  otherReasonsForJoining: string;
};

type AdditionalInfoFormProps = AdditionalInfo & {
  updateFields: (fields: Partial<AdditionalInfo>) => void;
};

const reasons: string[][] = [
  ["KNOWLEDGE", "Conocer más del SPW"],
  ["COMMUNITY", "Unirme a la comunidad"],
  ["MEDICAL_SUPPORT", "Requiere apoyo médico"],
  ["ECONOMIC_SUPPORT", "Requiere apoyo económico"],
];

const insurance: string[][] = [
  ["NONE", "Ninguno"],
  ["IMSS", "IMSS"],
  ["ISSSTE", "ISSSTE"],
  ["INSABI", "INSABI"],
  ["SEDENA", "SEDENA"],
  ["PEMEX", "PEMEX"],
  ["MAJOR_MEDIC_EXPENSES", "Seguro de gastos médicos mayores"],
];

/**
 * Renders the additional information form component.
 * @param {AdditionalInfoFormProps} props - The props for the component.
 * @returns The rendered form component.
 */
export default function AdditionalInfo({
  socialSecurityRegime,
  reasonsForJoining,
  otherReasonsForJoining,
  updateFields,
}: AdditionalInfoFormProps) {
  const [other, setOther] = useState(otherReasonsForJoining?.length > 0);

  const [showError, setShowError] = useState({
    socialSecurityRegime: false,
    reasonsForJoining: false,
  });

  function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    if (reasonsForJoining instanceof Set) {
      if (e.target.value === "Otros") {
        setOther(!other);
        updateFields({
          otherReasonsForJoining: "",
        });
      } else if (reasonsForJoining.has(e.target.value)) {
        reasonsForJoining.delete(e.target.value);
        updateFields({
          reasonsForJoining: reasonsForJoining,
        });
      } else {
        reasonsForJoining.add(e.target.value);
        updateFields({
          reasonsForJoining: reasonsForJoining,
        });
      }
    }
  }

  setTimeout(() => {
    setShowError((showError) => {
      return { ...showError, socialSecurityRegime: true };
    });
    setTimeout(() => {
      setShowError((showError) => {
        return { ...showError, reasonsForJoining: true };
      });
    }, 3000);
  }, 3000);

  return (
    <FormWrapper>
      <div className="form-step">
        <ProgressBar step={5} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="input-pair">
            <div className="form-input">
              <Form.Group>
                <Form.Label className="check-label">
                  Régimen de seguridad al que pertenece:
                  <span className="required-input">*</span>
                </Form.Label>
                {insurance.map((insurance, i) => {
                  return (
                    <div>
                      <Form.Check
                        required
                        className="input-check"
                        inline
                        key={i}
                        id={i.toString()}
                        type="radio"
                        name="socialSecurityRegime"
                        value={insurance[0]}
                        checked={socialSecurityRegime === insurance[0]}
                        onChange={(e) =>
                          updateFields({
                            socialSecurityRegime: e.target.value,
                          })
                        }
                      />
                      <Form.Label>{insurance[1]}</Form.Label>
                    </div>
                  );
                })}
              </Form.Group>

              <span
                className="check-span"
                hidden={
                  socialSecurityRegime !== "" || !showError.socialSecurityRegime
                }
              >
                "Seleccione una opción"
              </span>
            </div>

            <div>
              <FormGroup>
                <Form.Label className="check-label">
                  Motivo de su acercamiento a la fundación:
                  <span className="required-input">*</span> <br />
                  (Puede seleccionar más de una opción)
                </Form.Label>

                {reasons.map((reason, i) => {
                  if (reasonsForJoining instanceof Set) {
                    return (
                      <div>
                        <Form.Check
                          inline
                          className="input-check"
                          key={i}
                          id={i.toString()}
                          type="checkbox"
                          name="reasonForJoining"
                          value={reason[0]}
                          checked={reasonsForJoining.has(reason[0])}
                          onChange={handleClick}
                        />
                        <Form.Label>{reason[1]}</Form.Label>
                      </div>
                    );
                  }
                })}
                <Form.Check
                  inline
                  className="input-check"
                  type="checkbox"
                  key={reasons.length}
                  id={reasons.length.toString()}
                  name="reasonForJoining"
                  value="Otros"
                  onChange={(e) => handleClick(e)}
                  checked={other}
                />
                <Form.Label>Otros</Form.Label>

                <Form.Control
                  name="otherReason"
                  type="text"
                  hidden={!other}
                  onChange={(e) =>
                    updateFields({
                      otherReasonsForJoining: e.target.value,
                    })
                  }
                  value={otherReasonsForJoining}
                ></Form.Control>
              </FormGroup>

              <span
                className="check-span"
                hidden={
                  (reasonsForJoining instanceof Set &&
                    reasonsForJoining.size !== 0) ||
                  !showError.reasonsForJoining ||
                  otherReasonsForJoining !== ""
                }
              >
                "Seleccione una opción"
              </span>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
