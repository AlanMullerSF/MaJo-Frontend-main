import CustomModal from "../CustomModal/CustomModal";
import moment from "moment";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import i18n from "../../i18n/i18n";
import {
  useGetSingleStaffQuery,
  useUpdateStaffMutation,
} from "../../features/staff/staffApiSlice";
import { useRef, useState } from "react";
import { IStaff } from "../../types";
import { useTranslation } from "react-i18next";
import RoundButton from "../../pages/dashboard/components/RoundButton";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const updateStaffSchema = yup.object().shape({
  name: yup.string().required(i18n.t("required")),
  lastName: yup.string().required(i18n.t("required")),
  dateOfBirth: yup.date().required(i18n.t("required")),
  position: yup.string().required(i18n.t("required")),
  role: yup.string().oneOf(["ADMIN", "USER"]).required(i18n.t("required")),
  email: yup
    .string()
    .email(i18n.t("invalid email"))
    .required(i18n.t("required")),
  phone: yup
    .string()
    .length(10, i18n.t("invalid phone"))
    .required(i18n.t("required")),
  password: yup.string().min(8, i18n.t("invalid password")),
});

type EditStaffModalProps = {
  show: boolean;
  toggleShow: () => void;
  staffId: string;
  refetch: () => void;
};

/**
 * A modal component for editing staff information.
 * @param {Object} props - The props for the EditStaffModal component.
 * @param {boolean} props.show - Determines whether the modal is visible or not.
 * @param {function} props.toggleShow - A function to toggle the visibility of the modal.
 * @param {string} props.staffId - The ID of the staff member to edit.
 * @param {function} props.refetch - A function to refetch the staff member data.
 * @returns {JSX.Element} - The rendered EditStaffModal component.
 */
export const EditStaffModal = ({
  show,
  toggleShow,
  staffId,
  refetch,
}: EditStaffModalProps) => {
  const { t } = useTranslation();
  const { data } = useGetSingleStaffQuery(staffId);
  const [updateStaff] = useUpdateStaffMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<{ submitForm: () => void }>(null);

  if (!data) return;

  const handleSubmit = async (formData: IStaff) => {
    try {
      await updateStaff({ ...formData });
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
          password: "",
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
              <Field className="input" name="lastName" />
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
              <label htmlFor="position" className="label">
                {t("position")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="position" />
              {errors.position && touched.position && (
                <span className="error">{errors.position}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="role" className="label">
                {t("admin")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field as="select" className="input" name="role">
                <option disabled value="">
                  {t("choose an option")}
                </option>
                <option value="ADMIN">{t("administrator")}</option>
                <option value="USER">{t("user")}</option>
              </Field>
              {errors.role && touched.role && (
                <span className="error">{errors.role}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="password" className="label">
                {t("password")}
              </label>
              <Field
                className="input"
                name="password"
                type={showPassword ? "text" : "password"}
                autocomplete="current-password"
              />
              {showPassword ? (
                <FaEye
                  className="eye-icon"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEyeSlash
                  className="eye-icon"
                  onClick={() => setShowPassword(true)}
                />
              )}
              {errors.password && touched.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="phone" className="label">
                {t("phone")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="phone" />
              {errors.phone && touched.phone && (
                <span className="error">{errors.phone}</span>
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
          // TODO disable if there is any other error
          disabled={!!errorMessage.length}
          label={t("update")}
          variant="filled"
          onClick={handleClickSubmit}
        />
      </div>
    </CustomModal>
  );
};
