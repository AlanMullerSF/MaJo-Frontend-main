import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RoundButton from "../components/RoundButton";
import "./styles.scss";
import { useTranslation } from "react-i18next";
import i18n from "../../../i18n/i18n";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useLoginMutation } from "../../../features/auth/authApiSlice";
import { useState } from "react";
import {
  selectCurrentToken,
  setCredentials,
} from "../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import groupPng from "../../../assets/Group.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LogInSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t("invalid email"))
    .required(i18n.t("required")),
  password: Yup.string()
    .min(8, i18n.t("invalid password"))
    .required(i18n.t("required")),
});

/**
 * A functional component that represents a login form.
 * @returns {React.FC} - The Login component.
 */
const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const [errMsg, setErrMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const token = useAppSelector(selectCurrentToken);

  if (token) {
    navigate("/");
  }

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const userData: { token: string; user: string } = await login(
        values,
      ).unwrap();
      dispatch(setCredentials({ ...userData }));
      setErrMsg("");
      navigate("/");
    } catch (err) {
      //@ts-expect-error data is expected
      if (!err.data.message) {
        setErrMsg(t("no server response"));
        //@ts-expect-error status is expected
      } else if (err.status === 403) {
        setErrMsg(t("unauthorized"));
        //@ts-expect-error status is expected
      } else if (err.status === 404) {
        setErrMsg(t("user not found"));
        //@ts-expect-error status is expected
      } else if (err.status === 401) {
        setErrMsg(t("invalid credentials"));
      } else {
        //@ts-expect-error status is expected
        setErrMsg(t(err.data.message));
      }
    }
  };

  return (
    <section className="login-screen">
      <Card
        color="$magenta"
        id="card"
        style={{
          border: "none",
          display: "flex",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Card.Body style={{ padding: "7%" }}>
          <div className="img-container">
            <div>
              <img
                src={groupPng}
                height="97"
                width="152"
                alt="fundacion-logo"
              />
            </div>
            <h1 className="header">{t("login")}</h1>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={LogInSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="form-container">
                <div className="input-container">
                  <label htmlFor="email" className="label">
                    {t("email")}
                  </label>
                  <Field className="input" name="email" type="email" />
                  {errors.email && touched.email && (
                    <span className="error">{errors.email}</span>
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

                <div className="login-btn">
                  <RoundButton
                    expand
                    label={t("login")}
                    variant="filled"
                    type="submit"
                    loading={isLoading}
                  />
                </div>
                {errMsg.length ? (
                  <span className="error">{errMsg}</span>
                ) : (
                  <></>
                )}
              </Form>
            )}
          </Formik>
          <p className="forgot-password-text">{t("forgot password")}</p>
        </Card.Body>
      </Card>
    </section>
  );
};

export default Login;
