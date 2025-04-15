import CustomModal from "../CustomModal/CustomModal";
import moment from "moment";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import i18n from "../../i18n/i18n";
import {
  useGetSingleTutorQuery,
  useUpdateTutorMutation,
} from "../../features/staff/staffApiSlice";
import { useRef, useState } from "react";
import { ITutor } from "../../types";
import { useTranslation } from "react-i18next";
import RoundButton from "../../pages/dashboard/components/RoundButton";

const updateStaffSchema = yup.object().shape({
  name: yup.string().required(i18n.t("required")),
  lastName: yup.string().required(i18n.t("required")),
  dateOfBirth: yup.date().required(i18n.t("required")),
  email: yup
    .string()
    .email(i18n.t("invalid email"))
    .required(i18n.t("required")),
  phone1: yup
    .string()
    .length(10, i18n.t("invalid phone"))
    .required(i18n.t("required")),
  phone2: yup.string().length(10, i18n.t("invalid phone")),
  occupation: yup.string().required(i18n.t("required")),
  maritalStatus: yup
    .string()
    .oneOf(["MARRIED", "SINGLE", "WIDOWED", "DIVORCED", "PARTNERSHIP"])
    .required(i18n.t("required")),
});

type EditTutorModalProps = {
  show: boolean;
  toggleShow: () => void;
  tutorId: string;
  refetch: () => void;
};

/**
 * A modal component for editing tutor information.
 * @param {Object} props - The component props.
 * @param {boolean} props.show - Determines whether the modal is visible or not.
 * @param {function} props.toggleShow - Function to toggle the visibility of the modal.
 * @param {string} props.staffId - The ID of the tutor to edit.
 * @param {function} props.refetch - Function to refetch tutor data after an update.
 * @returns The EditTutorModal component.
 */
export const EditTutorModal = ({
  show,
  toggleShow,
  tutorId,
  refetch,
}: EditTutorModalProps) => {
  const { t } = useTranslation();
  const { data } = useGetSingleTutorQuery(tutorId);
  const [updateStaff] = useUpdateTutorMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<{ submitForm: () => void }>(null);

  if (!data) return;

  const handleSubmit = async (formData: ITutor) => {
    try {
      await updateStaff(formData);
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

  const validDate = new Date(
    // @ts-expect-error this is valid
    data.dateOfBirth[0],
    // @ts-expect-error this is valid
    data.dateOfBirth[1] - 1,
    data.dateOfBirth[2],
  );
  // Now you can use Moment.js to format the validDate
  const formattedDate = moment(validDate).format("YYYY-MM-DD");

  return (
    <CustomModal
      show={show}
      onHide={() => toggleShow()}
      bottomComponent={<></>}
    >
      <Formik
        initialValues={{
          ...data,
          dateOfBirth: formattedDate,
        }}
        validationSchema={updateStaffSchema}
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
              <label htmlFor="name" className="label">
                {t("name")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="name" />
              {errors.name && touched.name && (
                <span className="error">{errors.name}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="lastName" className="label">
                {t("lastName")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="lastName" disabled />
              {errors.lastName && touched.lastName && (
                <span className="error">{errors.lastName}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="email" className="label">
                {t("email")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="email" type="email" disabled />
              {errors.email && touched.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="dateOfBirth" className="label">
                {t("dateOfBirth")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="dateOfBirth" type="date" />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <span className="error">{errors.dateOfBirth}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="occupation" className="label">
                {t("occupation")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="occupation" />
              {errors.occupation && touched.occupation && (
                <span className="error">{errors.occupation}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="role" className="label">
                {t("tutorMaritalStatus")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field as="select" className="input" name="role">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value="MARRIED">{t("MARRIED")}</option>
                <option value="SINGLE">{t("SINGLE")}</option>
                <option value="WIDOWED">{t("WIDOWED")}</option>
                <option value="DIVORCED">{t("DIVORCED")}</option>
                <option value="PARTNERSHIP">{t("PARTNERSHIP")}</option>
              </Field>
              {errors.maritalStatus && touched.maritalStatus && (
                <span className="error">{errors.maritalStatus}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="phone1" className="label">
                {t("phone")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="phone1" />
              {errors.phone1 && touched.phone1 && (
                <span className="error">{errors.phone1}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="phone2" className="label">
                {t("tutorPhone2")}
              </label>
              <Field className="input" name="phone2" />
              {errors.phone2 && touched.phone2 && (
                <span className="error">{errors.phone2}</span>
              )}
            </div>

            <div>
              {Object.entries(errors).map(([key, value]) => (
                <p className="error">
                  *{t(key).toLowerCase()}
                  {` ${value}`.toLowerCase()}
                </p>
              ))}
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
