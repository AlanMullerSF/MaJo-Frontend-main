import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import i18n from "../../../../i18n/i18n";
import { useTranslation } from "react-i18next";
import React from "react";
import { IMail } from "../../../../types";

const SendEmailSchema = Yup.object().shape({
  to: Yup.string().required(i18n.t("required")),
  subject: Yup.string().required(i18n.t("required")),
  message: Yup.string().required(i18n.t("required")),
});

type SendEmailFormProps = {
  handleSubmit: (values: IMail) => void;
  recipients: string | never[] | undefined;
};

/**
 * A form component for sending emails.
 * @param {SendEmailFormProps} props - The props for the SendEmailForm component.
 * @param {React.Ref} ref - The ref for the SendEmailForm component.
 * @returns The SendEmailForm component.
 */
export const SendEmailForm = React.forwardRef(
  ({ handleSubmit, recipients }: SendEmailFormProps, ref) => {
    const { t } = useTranslation();
    const validateRecipients = typeof recipients === "string" ? recipients : "";
    return (
      <Formik
        initialValues={{
          to: validateRecipients,
          subject: "",
          message: "",
        }}
        validationSchema={SendEmailSchema}
        onSubmit={handleSubmit}
        // @ts-expect-error ref is valid
        innerRef={ref}
      >
        {({ errors, touched }) => (
          <Form className="form-container">
            <div className="input-container">
              <label htmlFor="to" className="label">
                {t("to")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="to" disabled />
              {errors.to && touched.to && (
                <span className="error">{errors.to}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="subject" className="label">
                {t("subject")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field className="input" name="subject" />
              {errors.subject && touched.subject && (
                <span className="error">{errors.subject}</span>
              )}
            </div>

            <div className="input-container">
              <label htmlFor="message" className="label">
                {t("message")}
                <span style={{ color: "red" }}>*</span>
              </label>
              <Field
                as="textarea"
                className="input large"
                name="message"
                multiline
              />
              {errors.message && touched.message && (
                <span className="error">{errors.message}</span>
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
