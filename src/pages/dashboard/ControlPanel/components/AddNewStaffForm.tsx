import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import i18n from "../../../../i18n/i18n";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { IStaff } from "../../../../types";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const CreateStaffSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t("required")),
  lastName: Yup.string().required(i18n.t("required")),
  dateOfBirth: Yup.date().required(i18n.t("required")),
  role: Yup.string().oneOf(["ADMIN", "USER"]).required(i18n.t("required")),
  position: Yup.string().required(i18n.t("required")),
  phone: Yup.string()
    .length(10, i18n.t("invalid phone"))
    .required(i18n.t("required")),
  password: Yup.string()
    .min(8, i18n.t("invalid password"))
    .required(i18n.t("required")),
  email: Yup.string()
    .email(i18n.t("invalid email"))
    .required(i18n.t("required")),
});

type AddNewStaffFormProps = {
  handleSubmit: (values: IStaff) => void;
};

/**
 * A React component that renders a form for adding new staff members.
 * @param {AddNewStaffFormProps} props - The component props.
 * @param {Function} ref - A ref to the component.
 * @returns The rendered form component.
 */
export const AddNewStaffForm = React.forwardRef(
  ({ handleSubmit }: AddNewStaffFormProps, ref) => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    return (
      <Formik
        initialValues={{
          name: "",
          lastName: "",
          dateOfBirth: "",
          role: "",
          position: "",
          phone: "",
          password: "",
          email: "",
        }}
        validationSchema={CreateStaffSchema}
        onSubmit={handleSubmit}
        // @ts-expect-error ref is valid
        innerRef={ref}
      >
        {({ errors, touched }) => (
          <Form className="form-container">
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
              <label htmlFor="role" className="label">
                {t("admin")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field as="select" className="input" name="role">
                <option disabled value="">
                  {t("choose an option")}
                  <span style={{ color: "red" }}>*</span>
                </option>
                <option value="ADMIN">{t("administrator")}</option>
                <option value="USER">{t("user")}</option>
              </Field>
              {errors.role && touched.role && (
                <span className="error">{errors.role}</span>
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
              <label htmlFor="phone" className="label">
                {t("phone")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="phone" />
              {errors.phone && touched.phone && (
                <span className="error">{errors.phone}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="email" className="label">
                {t("email")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="email" type="email" />
              {errors.email && touched.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="password" className="label">
                {t("password")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
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

            <div>
              {Object.entries(errors).map(([key, value]) => (
                <p className="error">
                  *{t(key).toLowerCase()}
                  {` ${value}`.toLowerCase()}
                </p>
              ))}
            </div>

            {/* {errMsg.length ? <span className="error">{errMsg}</span> : null} */}
          </Form>
        )}
      </Formik>
    );
  },
);
