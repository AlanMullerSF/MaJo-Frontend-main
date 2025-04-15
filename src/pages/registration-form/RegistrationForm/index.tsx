import { useMultistepForm } from "../../../hooks/useMultistepForm";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

import FormMainPage from "../components/FormMainPage";
import TutorInfo from "../components/TutorInfo";
import BeneficiaryInfo from "../components/BeneficiaryInfo";
import EducationInfo from "../components/EducationInfo";
import SPWInfo from "../components/SPWInfo";
import AdditionalInfo from "../components/AdditionalInfo";
import { ConfirmFormModal } from "../components/modals/ConfirmFormModal";

import "../styles/styles.scss";
import Disclaimer from "../components/Disclaimer";
import { Form } from "react-router-dom";
import { usePostRequestMutation } from "../../../api/apiSlice";

import groupImg from "../../../assets/logotipoFMJ_blanco 1.svg";

type FormData = {
  curp: string;
  name: string;
  lastName: string;
  dateOfBirth: string; //can be parsed to Date
  sex: boolean | null;
  postalCode: string; // can only take 5 digit numbers
  city: string;
  state: string;
  yearOfDiagnosis: number | null; //Year
  geneticDiagnosis: boolean | null;
  typeOfDiagnosis: string; //ENUM
  requiresGrowthHormone: boolean | null;
  levelOfEducation: string; //ENUM
  specialEducation: boolean | null;
  studying: boolean | null;
  socialSecurityRegime: string; //ENUM
  otherAilments: Set<string> | string[];
  otherOtherAilments: string;
  reasonsForJoining: Set<string> | string[];
  otherReasonsForJoining: string;
  tutorEmail: string;
  tutorName: string;
  tutorLastName: string;
  tutorDateOfBirth: string; //MM-DD-YYYY format
  tutorOccupation: string;
  tutorPhone1: string; //can only take numbers, always 10 digits
  tutorPhone2: string; //can only take numbers, always 10 digits
  tutorMaritalStatus: string; //ENUM
  hasDiagnosis?: boolean | null;
};

const INITIAL_DATA: FormData = {
  curp: "",
  name: "",
  lastName: "",
  dateOfBirth: "",
  sex: null,
  postalCode: "",
  city: "",
  state: "",
  yearOfDiagnosis: null,
  geneticDiagnosis: null,
  typeOfDiagnosis: "",
  requiresGrowthHormone: null,
  levelOfEducation: "",
  specialEducation: null,
  studying: null,
  socialSecurityRegime: "",
  otherAilments: new Set<string>(),
  otherOtherAilments: "",
  reasonsForJoining: new Set<string>(),
  otherReasonsForJoining: "",
  tutorEmail: "",
  tutorName: "",
  tutorLastName: "",
  tutorDateOfBirth: "",
  tutorOccupation: "",
  tutorPhone1: "",
  tutorPhone2: "",
  tutorMaritalStatus: "",
  hasDiagnosis: null,
};

const title = [
  [],
  ["Datos del padre/ madre o tutor", "Información general"],
  ["Datos del beneficiario", "Información general"],
  ["Datos del beneficiario", "Educación"],
  ["Datos del beneficiario", "Información sobre el SPW"],
  ["Datos del beneficiario", "Información adicional"],
];

/**
 * Capitalizes the first letter of each word in a given string.
 * @param {string} string - The string to capitalize.
 * @returns The capitalized string.
 */
function capitalize(string: string) {
  const str = string.trim().split(" ");
  const result: string[] = [];
  for (let i = 0; i < str.length; i++) {
    result.push(
      str[i].slice(0, 1).toUpperCase() + str[i].slice(1).toLowerCase(),
    );
  }
  return result.join(" ");
}

/**
 * A functional component that represents a registration form.
 * @returns The JSX code for the registration form.
 */
export default function RegistrationForm() {
  const [data, setData] = useState(INITIAL_DATA);
  const [post, { isLoading: _ }] = usePostRequestMutation();
  const [_errMsg, setErrMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const updateFields = useCallback((fields: Partial<FormData>) => {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const newBeneficiary: FormData = {
        curp: data.curp.toUpperCase(),
        name: capitalize(data.name),
        lastName: capitalize(data.lastName),
        dateOfBirth: data.dateOfBirth,
        sex: data.sex,
        postalCode: data.postalCode,
        city: capitalize(data.city),
        state: data.state,
        yearOfDiagnosis: data.yearOfDiagnosis,
        geneticDiagnosis: data.geneticDiagnosis,
        typeOfDiagnosis: data.typeOfDiagnosis,
        requiresGrowthHormone: data.requiresGrowthHormone,
        levelOfEducation: data.levelOfEducation,
        specialEducation: data.specialEducation,
        studying: data.studying,
        socialSecurityRegime: data.socialSecurityRegime,
        otherAilments: Array.from(data.otherAilments),
        otherOtherAilments: capitalize(data.otherOtherAilments),
        reasonsForJoining: Array.from(data.reasonsForJoining),
        otherReasonsForJoining: capitalize(data.otherReasonsForJoining),
        tutorEmail: data.tutorEmail.trim().toLowerCase(),
        tutorName: capitalize(data.tutorName),
        tutorLastName: capitalize(data.tutorLastName),
        tutorDateOfBirth: data.tutorDateOfBirth,
        tutorOccupation: capitalize(data.tutorOccupation),
        tutorPhone1: data.tutorPhone1,
        tutorPhone2: data.tutorPhone2,
        tutorMaritalStatus: data.tutorMaritalStatus,
      };
      await post(newBeneficiary);
    } catch (err) {
      //@ts-expect-error response is expected
      if (!err?.response) {
        setErrMsg("no server response");
        //@ts-expect-error response is expected
      } else if (err.response?.status === 403) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg("registration failed");
      }
    }
  };

  const {
    steps: _steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
  } = useMultistepForm([
    <FormMainPage {...data} updateFields={updateFields} />,
    <TutorInfo {...data} updateFields={updateFields} />,
    <BeneficiaryInfo {...data} updateFields={updateFields} />,
    <EducationInfo {...data} updateFields={updateFields} />,
    <SPWInfo {...data} updateFields={updateFields} />,
    <AdditionalInfo {...data} updateFields={updateFields} />,
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStepIndex]);

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      next();
    },
    [next],
  );

  const handleModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const disabled = useCallback(
    (index: number): boolean => {
      switch (index) {
        case 0:
          return data.hasDiagnosis ? false : true;
        case 1:
          return !(
            data.tutorName !== "" &&
            data.tutorLastName !== "" &&
            data.tutorDateOfBirth !== "" &&
            data.tutorPhone1 !== "" &&
            data.tutorEmail !== "" &&
            data.tutorMaritalStatus !== "" &&
            data.tutorOccupation !== ""
          );
        case 2:
          return !(
            data.curp !== "" &&
            data.name !== "" &&
            data.lastName !== "" &&
            data.dateOfBirth !== "" &&
            data.sex !== null &&
            data.postalCode !== "" &&
            data.city !== "" &&
            data.state !== ""
          );
        case 3:
          return !(
            data.levelOfEducation !== "" &&
            data.studying !== null &&
            data.specialEducation !== null
          );
        case 4:
          if (data.geneticDiagnosis) {
            return !(
              data.yearOfDiagnosis !== null &&
              data.typeOfDiagnosis !== "" &&
              data.typeOfDiagnosis !== "NONE" &&
              data.requiresGrowthHormone !== null
            );
          } else {
            return !(
              data.yearOfDiagnosis !== null &&
              data.geneticDiagnosis !== null &&
              data.requiresGrowthHormone !== null
            );
          }
        case 5:
          return !(
            data.socialSecurityRegime !== "" &&
            ((data.reasonsForJoining instanceof Set &&
              data.reasonsForJoining.size > 0) ||
              data.otherReasonsForJoining !== "")
          );
        default:
          return false;
      }
    },
    [data],
  );

  return (
    <div className="form-body">
      <div className={currentStepIndex > 0 ? "sidebar" : "banner"}>
        <h2 className="form-h2">{title[currentStepIndex][0]}</h2>

        <h2 className="form-h3">{title[currentStepIndex][1]}</h2>

        <div
          className={
            currentStepIndex > 0 ? "mj-logo-container-sb" : "mj-logo-container"
          }
        >
          <img
            src={groupImg}
            alt="Fundación María José Prader Willi"
            className={currentStepIndex > 0 ? "mj-logo-sb" : "mj-logo"}
          />
        </div>
      </div>
      <div className="form-main-container">
        <Form onSubmit={onSubmit} style={{ width: "100%" }}>
          <Container className="form-subcontainer">
            <div className="steps-container">{step}</div>

            <div className="buttons-container">
              {!isFirstStep ? (
                <Button onClick={back} style={{ justifyContent: "center" }}>
                  ← Atrás
                </Button>
              ) : null}
              {isFirstStep ? (
                <div className="disclaimer-container">
                  <Button
                    type="submit"
                    className="form-button"
                    disabled={disabled(currentStepIndex)}
                  >
                    Siguiente →
                  </Button>
                  <br />
                  <Disclaimer />
                </div>
              ) : isLastStep ? (
                <div>
                  <Button
                    type="submit"
                    className="form-button"
                    disabled={disabled(currentStepIndex)}
                    onClick={handleModal}
                  >
                    Enviar Formulario
                  </Button>

                  <ConfirmFormModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleSubmit={handleSubmit}
                  />
                </div>
              ) : (
                <Button
                  type="submit"
                  className="form-button"
                  disabled={disabled(currentStepIndex)}
                >
                  Guardar y Continuar →
                </Button>
              )}
            </div>
          </Container>
        </Form>
      </div>
    </div>
  );
}
