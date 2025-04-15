import { useState } from "react";
import FormWrapper from "../FormWrapper";
import { Form } from "react-bootstrap";
import ProgressBar from "../ProgressBar";

// eslint-disable-next-line react-refresh/only-export-components
export const states = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Ciudad de México",
  "Coahuila",
  "Colima",
  "Durango",
  "Estado de México",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Michoacán",
  "Morelos",
  "Nayarit",
  "Nuevo León",
  "Oaxaca",
  "Puebla",
  "Querétaro",
  "Quintana Roo",
  "San Luis Potosí",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatán",
  "Zacatecas",
];

type BeneficiaryInfo = {
  curp: string;
  name: string;
  lastName: string;
  dateOfBirth: string;
  sex: boolean | null;
  postalCode: string;
  city: string;
  state: string;
};

type BeneficiaryFormProps = BeneficiaryInfo & {
  updateFields: (fields: Partial<BeneficiaryInfo>) => void;
};

type FocusData = {
  curp: boolean;
  name: boolean;
  lastName: boolean;
  dateOfBirth: boolean;
  sex: boolean;
  postalCode: boolean;
  city: boolean;
  state: boolean;
};

/**
 * Renders the beneficiary information form.
 * @param {string} curp - The CURP of the beneficiary.
 * @param {string} name - The first name of the beneficiary.
 * @param {string} lastName - The last name of the beneficiary.
 * @param {string} dateOfBirth - The date of birth of the beneficiary.
 * @param {string} sex - The gender of the beneficiary.
 * @param {string} postalCode - The postal code of the beneficiary's address.
 * @param {string} city - The city of the beneficiary's address.
 * @param {string} state - The state of the beneficiary's address.
 * @param {function} updateFields - A function to update the form
 */
export default function BeneficiaryInfo({
  curp,
  name,
  lastName,
  dateOfBirth,
  sex,
  postalCode,
  city,
  state,
  updateFields,
}: BeneficiaryFormProps) {
  const [focus, setFocus] = useState({
    curp: false,
    name: false,
    lastName: false,
    dateOfBirth: false,
    sex: false,
    postalCode: false,
    city: false,
    state: false,
  });

  function handleFocus(focus: Partial<FocusData>) {
    setTimeout(() => {
      setFocus((prev) => {
        return { ...prev, ...focus };
      });
    }, 3000);
  }

  return (
    <FormWrapper>
      <div className="form-step">
        <ProgressBar step={2} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="input-pair">
            <div className="form-input">
              <Form.Label className="input-label" htmlFor="name">
                Nombre&#40;s&#41;
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                id="name"
                required
                type="text"
                placeholder="Ej. Juan"
                value={name}
                onChange={(e) =>
                  updateFields({
                    name: e.target.value,
                  })
                }
                minLength={1}
                onFocus={() =>
                  handleFocus({
                    name: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.name}>
                "Llene este campo"
              </span>
            </div>

            <div className="form-input">
              <Form.Label className="input-label" htmlFor="lastName">
                Apellidos
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                id="lastName"
                required
                type="text"
                placeholder="Ej. Pérez"
                value={lastName}
                onChange={(e) =>
                  updateFields({
                    lastName: e.target.value,
                  })
                }
                minLength={1}
                onFocus={() =>
                  handleFocus({
                    lastName: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.lastName}>
                "Llene este campo"
              </span>
            </div>
          </div>

          <div className="input-pair">
            <div className="form-input">
              <Form.Label className="input-label" htmlFor="dateOfBirth">
                Fecha de nacimiento
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                id="dateOfBirth"
                required
                type="date"
                value={dateOfBirth}
                onChange={(e) =>
                  updateFields({
                    dateOfBirth: e.target.value,
                  })
                }
                max={new Date().toISOString().split("T")[0]}
                onFocus={() =>
                  handleFocus({
                    dateOfBirth: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.dateOfBirth}>
                "Introduzca la fecha de nacimiento"
              </span>
            </div>

            <div className="form-input">
              <Form.Label className="input-label" htmlFor="curp">
                CURP
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                id="curp"
                required
                type="text"
                placeholder="PEGJ850315HJCRRN07"
                minLength={18}
                maxLength={18}
                value={curp}
                onChange={(e) => {
                  const isNum = /^[0-9A-Za-z\b]+$/;
                  if (e.target.value === "" || isNum.test(e.target.value)) {
                    updateFields({
                      curp: e.target.value,
                    });
                  }
                }}
                pattern="[A-Za-z]{4}\d{6}[HMhm][A-Za-z]{2}[B-Db-dF-Hf-hJ-Nj-nP-Tp-tV-Zv-z]{,4}\d{,2}$"
                onFocus={() =>
                  handleFocus({
                    curp: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.curp}>
                "Introduzca un CURP válido"
              </span>
            </div>
          </div>

          <div className="input-pair">
            <div className="form-input">
              <Form.Label className="input-label" htmlFor="sex">
                Sexo
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Select
                className="input-control"
                id="sex"
                value={sex === true ? "true" : sex === false ? "false" : ""}
                required
                onChange={(e) =>
                  updateFields({
                    sex: e.target.value === "true" ? true : false,
                  })
                }
                onFocus={() =>
                  handleFocus({
                    sex: true,
                  })
                }
              >
                <option value="" disabled hidden>
                  Sexo
                </option>
                <option value="true">Femenino</option>
                <option value="false">Masculino</option>
              </Form.Select>
              <span className="error-span" hidden={!focus.sex}>
                "Seleccione una opción"
              </span>
            </div>

            <div className="form-input">
              <Form.Label className="input-label" htmlFor="postalCode">
                Código Postal
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                id="postalCode"
                type="tel"
                placeholder="Ej. 97000"
                minLength={5}
                maxLength={5}
                required
                value={postalCode}
                onChange={(e) => {
                  const isNum = /^[0-9\b]+$/;
                  if (e.target.value === "" || isNum.test(e.target.value)) {
                    updateFields({
                      postalCode: e.target.value,
                    });
                  }
                }}
                onFocus={() =>
                  handleFocus({
                    postalCode: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.postalCode}>
                "Introduzca un Código Postal de 5 dígitos"
              </span>
            </div>
          </div>

          <div className="input-pair">
            <div className="form-input">
              <Form.Label className="input-label" htmlFor="city">
                Municipio
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                id="city"
                required
                type="text"
                placeholder="Ej. Pachuca"
                value={city}
                onChange={(e) =>
                  updateFields({
                    city: e.target.value,
                  })
                }
                onFocus={() =>
                  handleFocus({
                    city: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.city}>
                "Introduzca el municipio o ciudad"
              </span>
            </div>

            <div className="form-input">
              <Form.Label className="input-label" htmlFor="state">
                Estado
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Select
                className="input-control"
                id="state"
                value={state}
                required
                onChange={(e) =>
                  updateFields({
                    state: e.target.value,
                  })
                }
                onFocus={() =>
                  handleFocus({
                    state: true,
                  })
                }
              >
                <option value="" hidden disabled>
                  Estado
                </option>
                {states.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </Form.Select>
              <span className="error-span" hidden={!focus.state}>
                "Seleccione una opción"
              </span>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
