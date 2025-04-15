import { useState } from "react";
import FormWrapper from "../FormWrapper";
import { Form } from "react-bootstrap";
import ProgressBar from "../ProgressBar";

type EducationInfo = {
  levelOfEducation: string; //ENUM
  specialEducation: boolean | null;
  studying: boolean | null;
};

type EducationFormProps = EducationInfo & {
  updateFields: (fields: Partial<EducationInfo>) => void;
};

const educationLevel: string[][] = [
  ["MATERNAL", "Maternal"],
  ["KINDERGARTEN", "Kinder"],
  ["ELEMENTARY_SCHOOL", "Primaria"],
  ["MIDDLE_SCHOOL", "Secundaria"],
  ["HIGH_SCHOOL", "Preparatoria"],
  ["COLLEGE", "Universidad"],
];

/**
 * Renders a form component for providing education information.
 * @param {EducationFormProps} props - The props object containing the education information and update function.
 * @returns The rendered form component.
 */
export default function EducationInfo({
  levelOfEducation,
  specialEducation,
  studying,
  updateFields,
}: EducationFormProps) {
  const [showError, setShowError] = useState({
    levelOfEducation: false,
    specialEducation: false,
    studying: false,
  });

  //TODO: levelOfEducation and specialEducation fields should be optional o include an option for NONE

  setTimeout(() => {
    setShowError((showError) => {
      return { ...showError, levelOfEducation: true };
    });
    setTimeout(() => {
      setShowError((showError) => {
        return { ...showError, studying: true };
      });
      setTimeout(() => {
        setShowError((showError) => {
          return { ...showError, specialEducation: true };
        });
      }, 3000);
    }, 3000);
  }, 3000);

  return (
    <FormWrapper>
      <div className="form-step">
        <ProgressBar step={3} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="input-pair">
            <div className="form-input">
              <Form.Group>
                <Form.Label className="check-label">
                  Último grado de escolaridad del beneficiario:
                  <span className="required-input">*</span>
                </Form.Label>
                {educationLevel.map((level) => {
                  return (
                    <div key={level[0]}>
                      <Form.Check
                        required
                        className="input-check"
                        inline
                        id={level[0]}
                        type="radio"
                        name="socialSecurityRegime"
                        value={level[0]}
                        checked={levelOfEducation === level[0]}
                        onChange={(e) =>
                          updateFields({
                            levelOfEducation: e.target.value,
                          })
                        }
                      />
                      <Form.Label>{level[1]}</Form.Label>
                    </div>
                  );
                })}
                <span
                  className="check-span"
                  hidden={
                    levelOfEducation !== "" || !showError.levelOfEducation
                  }
                >
                  "Seleccione una opción"
                </span>
              </Form.Group>
            </div>

            <div className="form-input">
              <Form.Group>
                <Form.Label className="check-label">
                  ¿El beneficiario estudia actualmente?
                  <span className="required-input">*</span>
                </Form.Label>

                <div>
                  <Form.Check
                    required
                    inline
                    className="input-check"
                    type="radio"
                    id="true"
                    name="isStudying"
                    value="true"
                    checked={
                      studying ? true : studying === false ? false : undefined
                    }
                    onChange={(e) =>
                      updateFields({
                        studying: e.target.value === "true" ? true : false,
                      })
                    }
                  />
                  <Form.Label>Si</Form.Label>
                </div>

                <div>
                  <Form.Check
                    inline
                    className="input-check"
                    type="radio"
                    id="false"
                    name="isStudying"
                    value="false"
                    checked={
                      studying ? false : studying === false ? true : undefined
                    }
                    onChange={(e) =>
                      updateFields({
                        studying: e.target.value === "false" ? false : true,
                      })
                    }
                  />
                  <Form.Label>No</Form.Label>
                </div>

                <span
                  className="check-span"
                  hidden={studying !== null || !showError.studying}
                >
                  "Seleccione una opción"
                </span>
              </Form.Group>

              <Form.Group>
                <Form.Label className="check-label">
                  Tipo de educación que recibe/recibió:
                  <span className="required-input">*</span>
                </Form.Label>

                <div>
                  <Form.Check
                    inline
                    className="input-check"
                    type="radio"
                    id="regular"
                    key="regular"
                    name="studiesType"
                    value="regular"
                    checked={
                      specialEducation
                        ? true
                        : specialEducation === false
                        ? false
                        : undefined
                    }
                    onChange={(e) =>
                      updateFields({
                        specialEducation:
                          e.target.value === "regular" ? true : false,
                      })
                    }
                  />
                  <Form.Label htmlFor="regular">Educación Regular</Form.Label>
                </div>

                <div>
                  <Form.Check
                    inline
                    className="input-check"
                    type="radio"
                    id="special"
                    key="special"
                    name="studiesType"
                    value="especial"
                    checked={
                      specialEducation
                        ? false
                        : specialEducation === false
                        ? true
                        : undefined
                    }
                    onChange={(e) =>
                      updateFields({
                        specialEducation:
                          e.target.value === "especial" ? false : true,
                      })
                    }
                  />
                  <Form.Label htmlFor="special">Educación Especial</Form.Label>
                </div>
                <span
                  className="check-span"
                  hidden={
                    specialEducation !== null || !showError.specialEducation
                  }
                >
                  "Seleccione una opción"
                </span>
              </Form.Group>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
