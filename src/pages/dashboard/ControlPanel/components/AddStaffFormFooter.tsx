import { useTranslation } from "react-i18next";
import RoundButton from "../../components/RoundButton";
import "../styles.scss";

type FormFooterProps = {
  onCancel: () => void;
  onSubmit: () => void;
  loading: boolean;
};

/**
 * Renders the footer section of a form, including cancel and submit buttons.
 * @param {FormFooterProps} props - The props object containing onCancel, onSubmit, and loading.
 * @returns The rendered JSX element.
 */
const FormFooter = ({ onCancel, onSubmit, loading }: FormFooterProps) => {
  const { t } = useTranslation();
  return (
    <section className="form-footer-cta">
      <RoundButton label={t("cancel")} onClick={onCancel} variant="flat" />
      <RoundButton
        label={t("insert user")}
        onClick={onSubmit}
        rightIcon="right-arrow"
        variant="filled"
        loading={loading}
        type="submit"
      />
    </section>
  );
};

export default FormFooter;
