import { useState } from "react";
import FormWrapper from "../FormWrapper";
import { Form } from "react-bootstrap";
import ProgressBar from "../ProgressBar";

type TutorInfo = {
  tutorEmail: string;
  tutorName: string;
  tutorLastName: string;
  tutorDateOfBirth: string;
  tutorOccupation: string;
  tutorPhone1: string;
  tutorPhone2: string;
  tutorMaritalStatus: string; //ENUM
};

type TutorFormProps = TutorInfo & {
  updateFields: (fields: Partial<TutorInfo>) => void;
};

type FocusData = {
  tutorEmail: boolean;
  tutorName: boolean;
  tutorLastName: boolean;
  tutorDateOfBirth: boolean;
  tutorOccupation: boolean;
  tutorPhone1: boolean;
  tutorPhone2: boolean;
  tutorMaritalStatus: boolean;
};

/**
 * Renders the tutor information form component.
 * @param {string} tutorEmail - The email of the tutor.
 * @param {string} tutorName - The first name of the tutor.
 * @param {string} tutorLastName - The last name of the tutor.
 * @param {string} tutorDateOfBirth - The date of birth of the tutor.
 * @param {string} tutorOccupation - The occupation of the tutor.
 * @param {string} tutorPhone1 - The primary phone number of the tutor.
 * @param {string} tutorPhone2 - The secondary phone number of the tutor.
 * @param {string} tutorMaritalStatus - The marital status of the tutor.
 * @param {function} updateFields - A function that updates the form fields.
 */
export default function TutorInfo({
  tutorEmail,
  tutorName,
  tutorLastName,
  tutorDateOfBirth,
  tutorOccupation,
  tutorPhone1,
  tutorPhone2,
  tutorMaritalStatus,
  updateFields,
}: TutorFormProps) {
  const [focus, setFocus] = useState({
    tutorName: false,
    tutorLastName: false,
    tutorDateOfBirth: false,
    tutorEmail: false,
    tutorOccupation: false,
    tutorPhone1: false,
    tutorPhone2: false,
    tutorMaritalStatus: false,
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
        <ProgressBar step={1} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="input-pair">
            <div className="form-input">
              <Form.Label className="input-label" htmlFor="name">
                Nombre&#40;s&#41;
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                id="tutorName"
                name="tutorName"
                required
                type="text"
                value={tutorName}
                placeholder="Ej. Juan"
                onChange={(e) =>
                  updateFields({
                    tutorName: e.target.value,
                  })
                }
                minLength={1}
                onFocus={() =>
                  handleFocus({
                    tutorName: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.tutorName}>
                "Llene este campo"
              </span>
            </div>

            <div className="form-input">
              <Form.Label className="input-label" htmlFor="last_name">
                Apellidos
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                id="tutorLastName"
                name="tutorLastName"
                required
                type="text"
                placeholder="Ej. Pérez"
                value={tutorLastName}
                onChange={(e) =>
                  updateFields({
                    tutorLastName: e.target.value,
                  })
                }
                minLength={1}
                onFocus={() =>
                  handleFocus({
                    tutorLastName: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.tutorLastName}>
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
                value={tutorDateOfBirth}
                onChange={(e) =>
                  updateFields({
                    tutorDateOfBirth: e.target.value,
                  })
                }
                max={new Date().toISOString().split("T")[0]}
                onFocus={() =>
                  handleFocus({
                    tutorDateOfBirth: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.tutorDateOfBirth}>
                "Introduzca la fecha de nacimiento"
              </span>
            </div>

            <div className="form-input">
              <Form.Label className="input-label" htmlFor="phone1">
                Teléfono celular
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                required
                type="tel"
                placeholder="123-456-7890"
                minLength={10}
                maxLength={10}
                id="phone1"
                value={tutorPhone1}
                onChange={(e) => {
                  const isNum = /^[0-9\b]+$/;
                  if (e.target.value === "" || isNum.test(e.target.value)) {
                    updateFields({
                      tutorPhone1: e.target.value,
                    });
                  }
                }}
                onFocus={() =>
                  handleFocus({
                    tutorPhone1: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.tutorPhone1}>
                "Introduzca un número de teléfono a diez digitos"
              </span>
            </div>
          </div>

          <div className="input-pair">
            <div className="form-input">
              <Form.Label className="input-label" htmlFor="phone2">
                Teléfono de casa &#40;Opcional&#41;
              </Form.Label>
              <Form.Control
                className="input-control"
                type="tel"
                placeholder="123-456-7890"
                minLength={10}
                maxLength={10}
                id="phone2"
                value={tutorPhone2}
                onChange={(e) => {
                  const isNum = /^[0-9\b]+$/;
                  if (e.target.value === "" || isNum.test(e.target.value)) {
                    updateFields({
                      tutorPhone2: e.target.value,
                    });
                  }
                }}
              />
              <span className="error-span">
                "Introduzca un número de teléfono a diez digitos"
              </span>
            </div>

            <div className="form-input">
              <Form.Label className="input-label" htmlFor="email">
                Correo Electrónico
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                required
                type="email"
                id="email"
                value={tutorEmail}
                onChange={(e) =>
                  updateFields({
                    tutorEmail: e.target.value,
                  })
                }
                onFocus={() =>
                  handleFocus({
                    tutorEmail: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.tutorEmail}>
                "Introduzca un correo electrónico válido"
              </span>
            </div>
          </div>

          <div className="input-pair">
            <div className="form-input">
              <Form.Label className="input-label" htmlFor="occupation">
                Ocupación
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Control
                className="input-control"
                required
                type="text"
                id="occupation"
                value={tutorOccupation}
                onChange={(e) =>
                  updateFields({
                    tutorOccupation: e.target.value,
                  })
                }
                onFocus={() =>
                  handleFocus({
                    tutorOccupation: true,
                  })
                }
              />
              <span className="error-span" hidden={!focus.tutorOccupation}>
                "Llene este campo"
              </span>
            </div>

            <div className="form-input">
              <Form.Label className="input-label" htmlFor="maritalStatus">
                Estado Civil
                <span className="required-input">*</span>
              </Form.Label>
              <Form.Select
                className="input-control"
                id="maritalStatus"
                defaultValue={tutorMaritalStatus}
                required
                onChange={(e) =>
                  updateFields({
                    tutorMaritalStatus: e.target.value,
                  })
                }
                onFocus={() =>
                  handleFocus({
                    tutorMaritalStatus: true,
                  })
                }
              >
                <option value="" hidden disabled>
                  Estado Civil
                </option>
                <option value="MARRIED">Casado/a</option>
                <option value="SINGLE">Soltero/a</option>
                <option value="WIDOWED">Viudo/a</option>
                <option value="PARTNERSHIP">Unión Libre</option>
                <option value="DIVORCED">Divorciado/a</option>
              </Form.Select>
              <span className="error-span" hidden={!focus.tutorMaritalStatus}>
                "Seleccione una opción"
              </span>
            </div>
          </div>
        </div>
      </div>
    </FormWrapper>
  );
}
