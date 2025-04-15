import CustomModal from "../CustomModal/CustomModal";
import moment from "moment";
import * as Yup from "yup";
import { Formik, Field, Form, FieldArray } from "formik";
import {
  useGetSingleBeneficiaryQuery,
  useUpdateBeneficiaryMutation,
} from "../../features/staff/staffApiSlice";
import i18n from "../../i18n/i18n";
import { IBeneficiary } from "../../types";
import { useTranslation } from "react-i18next";
import RoundButton from "../../pages/dashboard/components/RoundButton";
import "./styles.scss";
import { useMemo, useRef, useState } from "react";

const UpdateBeneficiarySchema = Yup.object().shape({
  curp: Yup.string().required(i18n.t("required")),
  name: Yup.string().required(i18n.t("required")),
  lastName: Yup.string().required(i18n.t("required")),
  dateOfBirth: Yup.date().required(i18n.t("required")),
  sex: Yup.boolean().required(i18n.t("required")),
  postalCode: Yup.number().required(i18n.t("required")),
  city: Yup.string().required(i18n.t("required")),
  state: Yup.string().required(i18n.t("required")),
  yearOfDiagnosis: Yup.date().required(i18n.t("required")),
  geneticDiagnosis: Yup.boolean().required(i18n.t("required")),
  typeOfDiagnosis: Yup.string()
    .oneOf(["FISH", "MLPA", "METHYLATION"])
    .required(i18n.t("required")),
  requiresGrowthHormone: Yup.boolean().required(i18n.t("required")),
  levelOfEducation: Yup.string()
    .oneOf([
      "MATERNAL",
      "KINDERGARTEN",
      "ELEMENTARY_SCHOOL", //ELEMENTARY_SCHOOL
      "MIDDLE_SCHOOL", //MIDDLE_SCHOOL
      "HIGH_SCHOOL", //HIGH_SCHOOL
      "COLLEGE",
    ])
    .required(i18n.t("required")),
  specialEducation: Yup.boolean().required(i18n.t("required")),
  studying: Yup.boolean().required(i18n.t("required")),
  socialSecurityRegime: Yup.string()
    .oneOf([
      "NONE",
      "IMSS",
      "ISSSTE",
      "INSABI",
      "SEDENA",
      "PEMEX",
      "MAJOR_MEDIC_EXPENSES",
    ])
    .required(i18n.t("required")),
  ailments: Yup.array()
    .of(Yup.string().required(i18n.t("required")))
    .required(i18n.t("required")),
  otherOtherAilments: Yup.string(),
  reasonsForJoining: Yup.array()
    .of(Yup.string().required(i18n.t("required")))
    .required(i18n.t("required")),
  otherReasonsForJoining: Yup.string(),
});

type EditBeneficiaryModalProps = {
  show: boolean;
  toggleShow: () => void;
  beneficiaryId: string;
  refetch: () => void;
};

/**
 * A modal component for editing a beneficiary.
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Determines whether the modal is visible or not.
 * @param {function} props.toggleShow - Function to toggle the visibility of the modal.
 * @param {string} props.beneficiaryId - The ID of the beneficiary to edit.
 * @returns The EditBeneficiaryModal component.
 */
export const EditBeneficiaryModal = ({
  show,
  toggleShow,
  beneficiaryId,
  refetch,
}: EditBeneficiaryModalProps) => {
  const { t } = useTranslation();
  const formRef = useRef<{ submitForm: () => void }>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { data } = useGetSingleBeneficiaryQuery(beneficiaryId);
  const [updateBeneficiary] = useUpdateBeneficiaryMutation();

  const ailmentsOptions = useMemo(
    () => [
      { label: t("OVERWEIGHT"), value: "OVERWEIGHT" },
      { label: t("OBESITY"), value: "OBESITY" },
      { label: t("TYPE_2_DIABETES"), value: "TYPE_2_DIABETES" },
      { label: t("LANGUAGE_PROBLEMS"), value: "LANGUAGE_PROBLEMS" },
      { label: t("RESPIRATORY_PROBLEMS"), value: "RESPIRATORY_PROBLEMS" },
      {
        label: t("GROWTH_HORMONE_DEFICIENCY"),
        value: "GROWTH_HORMONE_DEFICIENCY",
      },
      { label: t("SCOLIOSIS"), value: "SCOLIOSIS" },
      { label: t("HYPOTHYROIDISM"), value: "HYPOTHYROIDISM" },
      {
        label: t("GASTROINTESTINAL_PROBLEMS"),
        value: "GASTROINTESTINAL_PROBLEMS",
      },
      { label: t("SKIN_PROBLEMS"), value: "SKIN_PROBLEMS" },
      { label: t("CIRCULATORY_PROBLEMS"), value: "CIRCULATORY_PROBLEMS" },
      { label: t("DENTAL_PROBLEMS"), value: "DENTAL_PROBLEMS" },
      { label: t("BEHAVIOURAL_PROBLEMS"), value: "BEHAVIOURAL_PROBLEMS" },
    ],
    [t],
  );

  const reasonsForJoiningOptions = useMemo(
    () => [
      { label: t("KNOWLEDGE"), value: "KNOWLEDGE" },
      { label: t("COMMUNITY"), value: "COMMUNITY" },
      { label: t("MEDICAL_SUPPORT"), value: "MEDICAL_SUPPORT" },
      { label: t("ECONOMIC_SUPPORT"), value: "ECONOMIC_SUPPORT" },
      { label: t("OTHER"), value: "OTHER" },
    ],
    [t],
  );

  if (!data) return;

  const handleSubmit = async (formData: IBeneficiary) => {
    try {
      await updateBeneficiary({
        ...formData,
        // @ts-expect-error typecast data
        sex: formData.sex === 1,
        // @ts-expect-error typecast data
        geneticDiagnosis: formData.geneticDiagnosis === 1,
        // @ts-expect-error typecast data
        requiresGrowthHormone: formData.requiresGrowthHormone === 1,
        // @ts-expect-error typecast data
        specialEducation: formData.specialEducation === 1,
        // @ts-expect-error typecast data
        studying: formData.studying === 1,
      });
      refetch();
    } catch (error) {
      // @ts-expect-error set error to message
      setErrorMessage(error.message);
    } finally {
      toggleShow();
    }
  };

  const handleClickSubmit = () => {
    if (!formRef.current) return;
    formRef.current.submitForm();
  };

  return (
    <CustomModal
      show={show}
      onHide={() => toggleShow()}
      bottomComponent={<></>}
    >
      <Formik
        initialValues={{
          ...(data as IBeneficiary),
          dateOfBirth: moment(data.dateOfBirth).format("YYYY-MM-DD"),
        }}
        validationSchema={UpdateBeneficiarySchema}
        onSubmit={handleSubmit}
        // @ts-expect-error this ref is compatible
        innerRef={formRef}
      >
        {({ errors, touched }) => (
          <Form
            className="form-update-container"
            style={{ maxHeight: "700px", overflow: "scroll" }}
          >
            <div className="input-container">
              <label htmlFor="curp" className="label">
                {t("curp")}
              </label>
              <Field className="input" name="curp" />
              {errors.curp && touched.curp && (
                <span className="error">{errors.curp}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="name" className="label">
                {t("name")}
              </label>
              <Field className="input" name="name" />
              {errors.name && touched.name && (
                <span className="error">{errors.name}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="lastName" className="label">
                {t("lastName")}
              </label>
              <Field className="input" name="lastName" />
              {errors.lastName && touched.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="dateOfBirth" className="label">
                {t("dateOfBirth")}
              </label>
              <Field className="input" name="dateOfBirth" type="date" />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <span className="error">{errors.dateOfBirth}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="sex" className="label">
                {t("sex")}
              </label>
              <Field as="select" className="input" name="sex">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value={0}>{t("male")}</option>
                <option value={1}>{t("female")}</option>
              </Field>
              {errors.sex && touched.sex && (
                <span className="error">{errors.sex}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="postalCode" className="label">
                {t("postalCode")}
              </label>
              <Field className="input" name="postalCode" />
              {errors.postalCode && touched.postalCode && (
                <span className="error">{errors.postalCode}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="city" className="label">
                {t("city")}
              </label>
              <Field className="input" name="city" />
              {errors.city && touched.city && (
                <span className="error">{errors.city}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="state" className="label">
                {t("state")}
              </label>
              <Field className="input" name="state" />
              {errors.state && touched.state && (
                <span className="error">{errors.state}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="yearOfDiagnosis" className="label">
                {t("yearOfDiagnosis")}
              </label>
              <Field
                className="input"
                name="yearOfDiagnosis"
                type="number"
                min="1900"
                max="2099"
                step="1"
              />
              {errors.yearOfDiagnosis && touched.yearOfDiagnosis && (
                <span className="error">{errors.yearOfDiagnosis}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="geneticDiagnosis" className="label">
                {t("geneticDiagnosis")}
              </label>
              <Field as="select" className="input" name="geneticDiagnosis">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value={0}>{t("genetic")}</option>
                <option value={1}>{t("clinic")}</option>
              </Field>
              {errors.geneticDiagnosis && touched.geneticDiagnosis && (
                <span className="error">{errors.geneticDiagnosis}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="typeOfDiagnosis" className="label">
                {t("typeOfDiagnosis")}
              </label>
              <Field as="select" className="input" name="typeOfDiagnosis">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value="FISH">{t("FISH")}</option>
                <option value="MLPA">{t("MLPA")}</option>
                <option value="METHYLATION">{t("METHYLATION")}</option>
              </Field>
              {errors.typeOfDiagnosis && touched.typeOfDiagnosis && (
                <span className="error">{errors.typeOfDiagnosis}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="requiresGrowthHormone" className="label">
                {t("requiresGrowthHormone")}
              </label>
              <Field as="select" className="input" name="requiresGrowthHormone">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value={0}>{t("no")}</option>
                <option value={1}>{t("yes")}</option>
              </Field>
              {errors.requiresGrowthHormone &&
                touched.requiresGrowthHormone && (
                  <span className="error">{errors.requiresGrowthHormone}</span>
                )}
            </div>

            <div className="input-container">
              <label htmlFor="levelOfEducation" className="label">
                {t("levelOfEducation")}
              </label>
              <Field as="select" className="input" name="levelOfEducation">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value="MATERNAL">{t("MATERNAL")}</option>
                <option value="KINDERGARTEN">{t("KINDER")}</option>
                <option value="ELEMENTARY_SCHOOL">
                  {t("ELEMENTARY_SCHOOL")}
                </option>
                <option value="MIDDLE_SCHOOL">{t("MIDDLE_SCHOOL")}</option>

                <option value="HIGH_SCHOOL">{t("HIGH_SCHOOL")}</option>
                <option value="COLLEGE">{t("COLLEGE")}</option>
              </Field>
              {errors.levelOfEducation && touched.levelOfEducation && (
                <span className="error">{errors.levelOfEducation}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="specialEducation" className="label">
                {t("specialEducation")}
              </label>
              <Field as="select" className="input" name="specialEducation">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value={0}>{t("no")}</option>
                <option value={1}>{t("yes")}</option>
              </Field>
              {errors.specialEducation && touched.specialEducation && (
                <span className="error">{errors.specialEducation}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="studying" className="label">
                {t("studying")}
              </label>
              <Field as="select" className="input" name="studying">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value={0}>{t("no")}</option>
                <option value={1}>{t("yes")}</option>
              </Field>
              {errors.studying && touched.studying && (
                <span className="error">{errors.studying}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="socialSecurityRegime" className="label">
                {t("socialSecurityRegime")}
              </label>
              <Field as="select" className="input" name="socialSecurityRegime">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value="NONE">{t("NONE")}</option>
                <option value="IMSS">{t("IMSS")}</option>
                <option value="ISSSTE">{t("ISSSTE")}</option>
                <option value="INSABI">{t("INSABI")}</option>

                <option value="SEDENA">{t("SEDENA")}</option>
                <option value="PEMEX">{t("PEMEX")}</option>
                <option value="MAJOR_MEDIC_EXPENSES">
                  {t("MAJOR_MEDIC_EXPENSES")}
                </option>
              </Field>
              {errors.socialSecurityRegime && touched.socialSecurityRegime && (
                <span className="error">{errors.socialSecurityRegime}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="ailments" className="label">
                {t("ailments")}
              </label>
              <FieldArray
                name="ailments"
                render={() => (
                  <div>
                    {ailmentsOptions.map((ailment) => (
                      <div key={ailment.value} className="input-checkbox">
                        <Field
                          id={ailment.value}
                          type="checkbox"
                          name="ailments"
                          value={ailment.value}
                        />
                        <label htmlFor={ailment.value}>{ailment.label}</label>
                      </div>
                    ))}
                  </div>
                )}
              />
              {errors.ailments && touched.ailments && (
                <span className="error">{errors.ailments}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="otherOtherAilments" className="label">
                {t("otherOtherAilments")}
              </label>
              <Field className="input" name="otherOtherAilments" />
              {errors.otherOtherAilments && touched.otherOtherAilments && (
                <span className="error">{errors.otherOtherAilments}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="reasonsForJoining" className="label">
                {t("reasonsForJoining")}
              </label>
              <FieldArray
                name="reasonsForJoining"
                render={() => (
                  <div>
                    {reasonsForJoiningOptions.map((reasons) => (
                      <div key={reasons.value} className="input-checkbox">
                        <Field
                          id={reasons.value}
                          type="checkbox"
                          name="reasonsForJoining"
                          value={reasons.value}
                        />
                        <label htmlFor={reasons.value}>{reasons.label}</label>
                      </div>
                    ))}
                  </div>
                )}
              />
              {errors.reasonsForJoining && touched.reasonsForJoining && (
                <span className="error">{errors.reasonsForJoining}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="otherReasonsForJoining" className="label">
                {t("otherReasonsForJoining")}
              </label>
              <Field className="input" name="otherReasonsForJoining" />
              {errors.otherReasonsForJoining &&
                touched.otherReasonsForJoining && (
                  <span className="error">{errors.otherReasonsForJoining}</span>
                )}
            </div>

            {errorMessage.length ? (
              <span className="error">{errorMessage}</span>
            ) : null}
          </Form>
        )}
      </Formik>
      <div className="bottom-component">
        <RoundButton
          label={t("cancel")}
          onClick={toggleShow}
          variant="outlined"
        />
        <RoundButton
          label={t("update")}
          variant="filled"
          onClick={handleClickSubmit}
        />
      </div>
    </CustomModal>
  );
};
