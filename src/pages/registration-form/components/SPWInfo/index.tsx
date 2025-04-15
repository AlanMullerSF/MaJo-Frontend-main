import { useState } from "react";
import FormWrapper from "../FormWrapper";
import { Form, FormGroup } from "react-bootstrap";
import ProgressBar from "../ProgressBar";

type SPWInfo = {
  yearOfDiagnosis: number | null; //Year
  geneticDiagnosis: boolean | null;
  typeOfDiagnosis: string; //ENUM
  otherAilments: Set<string> | string[]; //Collection
  otherOtherAilments: string;
  requiresGrowthHormone: boolean | null;
  dateOfBirth: string;
};

type SPWInfoFormProps = SPWInfo & {
  updateFields: (fields: Partial<SPWInfo>) => void;
};

const ailments: string[][] = [
  ["OVERWEIGHT", "Sobrepeso"],
  ["OBESITY", "Obesidad"],
  ["TYPE_2_DIABETES", "Diabetes Tipo II"],
  ["BEHAVIOURAL_PROBLEMS", "Problemas de conducta"],
  ["LANGUAGE_PROBLEMS", "Problemas de lenguaje"],
  ["RESPIRATORY_PROBLEMS", "Problemas respiratorios"],
  ["GROWTH_HORMONE_DEFICIENCY", "Deficiencia de hormona de crecimiento"],
  ["SCOLIOSIS", "Escoliosis"],
  ["HYPOTHYROIDISM", "Hipotiroidismo"],
  ["GASTROINTESTINAL_PROBLEMS", "Problemas gastrointestinales"],
  ["SKIN_PROBLEMS", "Problemas de la piel"],
  ["CIRCULATORY_PROBLEMS", "Problemas de circulación"],
  ["DENTAL_PROBLEMS", "Problemas dentales"],
];

const diagnosis: string[][] = [
  ["FISH", "FISH"],
  ["MLPA", "MLPA"],
  ["METHYLATION", "Metilación"],
];

/**
 * Renders a form component for SPWInfo with the provided props.
 * @param {SPWInfoFormProps} props - The props for the SPWInfo form component.
 * @returns The rendered form component.
 */
export default function SPWInfo({
  yearOfDiagnosis,
  geneticDiagnosis,
  typeOfDiagnosis,
  otherAilments,
  otherOtherAilments,
  requiresGrowthHormone,
  dateOfBirth,
  updateFields,
}: SPWInfoFormProps) {
  const [other, setOther] = useState(otherOtherAilments?.length > 0);

  const [showError, setShowError] = useState({
    yearOfDiagnosis: false,
    geneticDiagnosis: false,
    typeOfDiagnosis: false,
    requiresGrowthHormone: false,
  });
  const yearOfBirth: number = +dateOfBirth.slice(0, 4);

  const year = new Date().getFullYear();

  const yearOptions: number = year - yearOfBirth + 1;

  const years = Array.from(
    new Array(yearOptions),
    (_val, index) => year - index,
  );

  function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    if (otherAilments instanceof Set) {
      if (e.target.value === "Otros") {
        setOther(!other);
        updateFields({
          otherOtherAilments: "",
        });
      } else if (otherAilments.has(e.target.value)) {
        otherAilments.delete(e.target.value);
        updateFields({
          otherAilments: otherAilments,
        });
      } else if (e.target.value === "clinico") {
        updateFields({
          geneticDiagnosis: false,
          typeOfDiagnosis: "NONE",
        });
      } else {
        otherAilments.add(e.target.value);
        updateFields({
          otherAilments: otherAilments,
        });
      }
    }
  }

  setTimeout(() => {
    setShowError((showError) => {
      return { ...showError, yearOfDiagnosis: true };
    });
    setTimeout(() => {
      setShowError((showError) => {
        return { ...showError, geneticDiagnosis: true, typeOfDiagnosis: true };
      });
      setTimeout(() => {
        setShowError((showError) => {
          return { ...showError, requiresGrowthHormone: true };
        });
      }, 3000);
    }, 3000);
  }, 3000);

  return (
    <FormWrapper>
      <div className="form-step">
        <ProgressBar step={4} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="input-pair">
            <div className="form-input">
              <Form.Label htmlFor="yearOfDiagnosis" className="input-label">
                Año de diagnóstico
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Select
                id="yearOfDiagnosis"
                value={yearOfDiagnosis?.toString()}
                required
                onChange={(e) =>
                  updateFields({
                    yearOfDiagnosis: +e.target.value,
                  })
                }
              >
                <option value="" disabled selected hidden key={0}>
                  Año
                </option>
                {years.map((year, i) => {
                  return (
                    <option value={year} key={i + 1}>
                      {year}
                    </option>
                  );
                })}
              </Form.Select>
              <span
                className="check-span"
                hidden={yearOfDiagnosis !== null || !showError.yearOfDiagnosis}
              >
                "Seleccione una opción"
              </span>
              <FormGroup>
                <Form.Label className="check-label">
                  Forma de diagnóstico:
                  <span className="required-input">*</span>
                </Form.Label>
                <div>
                  <Form.Check
                    inline
                    className="input-check"
                    required
                    type="radio"
                    id="clinico"
                    name="diagnosis"
                    value="clinico"
                    checked={
                      geneticDiagnosis
                        ? false
                        : geneticDiagnosis === false
                        ? true
                        : undefined
                    }
                    onChange={handleClick}
                  />
                  <Form.Label>Clínico</Form.Label>
                </div>
                <div>
                  <Form.Check
                    inline
                    className="input-check"
                    type="radio"
                    id="genetico"
                    name="diagnosis"
                    value="genetico"
                    checked={
                      geneticDiagnosis
                        ? true
                        : geneticDiagnosis === false
                        ? false
                        : undefined
                    }
                    onChange={(e) =>
                      updateFields({
                        geneticDiagnosis:
                          e.target.value === "genetico" ? true : false,
                      })
                    }
                  />
                  <Form.Label>Genético</Form.Label>
                </div>
                <span
                  className="check-span"
                  hidden={
                    geneticDiagnosis !== null || !showError.geneticDiagnosis
                  }
                >
                  "Seleccione una opción"
                </span>
              </FormGroup>

              <fieldset
                disabled={geneticDiagnosis === true ? false : true}
                hidden={!geneticDiagnosis}
              >
                <Form.Label className="check-label">
                  Diagnóstico de laboratorio de confirmación de SPW:
                  <span className="required-input">*</span>
                </Form.Label>

                {diagnosis.map((diagnosis, i) => {
                  return (
                    <div>
                      <Form.Check
                        required
                        className="input-check"
                        inline
                        key={i}
                        id={i.toString()}
                        type="radio"
                        name="typeOfDiagnosis"
                        value={diagnosis[0]}
                        checked={typeOfDiagnosis === diagnosis[0]}
                        onChange={(e) =>
                          updateFields({
                            typeOfDiagnosis: e.target.value,
                          })
                        }
                      />
                      <Form.Label>{diagnosis[1]}</Form.Label>
                    </div>
                  );
                })}

                <span
                  className="check-span"
                  hidden={
                    (typeOfDiagnosis !== "" && typeOfDiagnosis !== "NONE") ||
                    !showError.typeOfDiagnosis
                  }
                >
                  "Seleccione una opción"
                </span>
              </fieldset>

              <FormGroup>
                <Form.Label className="check-label">
                  ¿Requiere hormona de crecimiento?:
                  <span className="required-input">*</span>
                </Form.Label>
                <div>
                  <Form.Check
                    inline
                    className="input-check"
                    required
                    type="radio"
                    id="true"
                    name="growthHormone"
                    value="true"
                    checked={
                      requiresGrowthHormone
                        ? true
                        : requiresGrowthHormone === false
                        ? false
                        : undefined
                    }
                    onChange={(e) =>
                      updateFields({
                        requiresGrowthHormone:
                          e.target.value === "true" ? true : false,
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
                    name="growthHormone"
                    value="false"
                    checked={
                      requiresGrowthHormone
                        ? false
                        : requiresGrowthHormone === false
                        ? true
                        : undefined
                    }
                    onChange={(e) =>
                      updateFields({
                        requiresGrowthHormone:
                          e.target.value === "false" ? false : true,
                      })
                    }
                  />
                  <Form.Label>No</Form.Label>
                </div>
                <span
                  className="check-span"
                  hidden={
                    requiresGrowthHormone !== null ||
                    !showError.requiresGrowthHormone
                  }
                >
                  "Seleccione una opción"
                </span>
              </FormGroup>
            </div>

            <div className="form-input">
              <FormGroup>
                <label className="check-label">
                  Otros padecimientos <br />
                  (Opcionales)
                </label>

                {ailments.map((ailment, i) => {
                  if (otherAilments instanceof Set) {
                    return (
                      <div>
                        <Form.Check
                          inline
                          type="checkbox"
                          className="input-check"
                          key={i}
                          id={i.toString()}
                          name="ailment"
                          value={ailment[0]}
                          checked={otherAilments.has(ailment[0])}
                          onChange={handleClick}
                        />
                        <Form.Label>{ailment[1]}</Form.Label>
                      </div>
                    );
                  }
                })}
                <Form.Check
                  inline
                  className="input-check"
                  type="checkbox"
                  id={ailments.length.toString()}
                  name="ailment"
                  value="Otros"
                  onChange={(e) => handleClick(e)}
                  checked={other}
                />
                <Form.Label>Otros</Form.Label>

                <Form.Control
                  name="otherAilment"
                  type="text"
                  hidden={!other}
                  onChange={(e) =>
                    updateFields({
                      otherOtherAilments: e.target.value,
                    })
                  }
                  value={otherOtherAilments}
                ></Form.Control>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
