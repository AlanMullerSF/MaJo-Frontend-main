import { useTranslation } from "react-i18next";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import { SendEmailForm } from "./SendEmailForm";
import { useCallback, useRef } from "react";
import RoundButton from "../../components/RoundButton";
import { useSendEmailMutation } from "../../../../features/staff/staffApiSlice";
import { useAppSelector } from "../../../../app/store";
import { selectCurrentSearchTerm } from "../../../../features/search/searchSlice";
import {
  FiltersStore,
  selectFiltersToSend,
  selectUsersToSendEmail,
} from "../../../../features/filters/filtersSlice";
import {
  IPersonalInfo,
  IGeneral,
  ISchooling,
  IDiagnosesAndAilments,
  IComplementaryInfo,
  IParentsTutors,
  IStaff,
} from "../../../../types";

type SendEmailModal = {
  showModal: boolean;
  toggleModal: () => void;
  useGetAll: (options: {
    search: string;
    filterOptions: FiltersStore["filters"];
  }) =>
    | IPersonalInfo[]
    | IGeneral[]
    | ISchooling[]
    | IDiagnosesAndAilments[]
    | IComplementaryInfo[]
    | IParentsTutors[]
    | IStaff[]
    | undefined;
};

/**
 * A modal component for sending emails.
 * @param {object} showModal - A boolean value indicating whether the modal should be shown or not.
 * @param {function} setShowModal - A function to toggle the visibility of the modal.
 * @returns The SendEmailModal component.
 */
export const SendEmailModal = ({
  showModal,
  toggleModal,
  useGetAll,
}: SendEmailModal) => {
  const emailFormRef = useRef();
  const searchTerm = useAppSelector(selectCurrentSearchTerm);
  const selectedUsers = useAppSelector(selectUsersToSendEmail);
  const filters = useAppSelector(selectFiltersToSend);
  const [sendEmail, { isLoading }] = useSendEmailMutation();
  const allReportData = useGetAll({
    search: searchTerm,
    filterOptions: filters,
  });
  const { t } = useTranslation();

  if (!selectedUsers.length) {
    toggleModal();
  }

  const closeModal = useCallback(() => {
    toggleModal();
  }, [toggleModal]);

  const onSubmit = useCallback(() => {
    // @ts-expect-error isValid is valid
    if (emailFormRef.current?.isValid) {
      // @ts-expect-error submitForm is valid
      emailFormRef.current?.submitForm(emailFormRef.current?.values);
    }
  }, []);

  const handleSubmit = async (data: {
    message: string;
    to: string;
    subject: string;
  }) => {
    await sendEmail({
      recipients: data.to,
      body: data.message,
      subject: data.subject,
    });
    closeModal();
  };

  const emailRecipients = selectedUsers.length
    ? allReportData
        ?.filter((el) =>
          // @ts-expect-error this is valid
          selectedUsers.includes(el.tutorEmail ?? el.email ?? el.curp),
        )
        .map((el) => {
          // @ts-expect-error this is valid
          if (el.tutorEmail) {
            // @ts-expect-error this is valid
            return el.tutorEmail;
            // @ts-expect-error this is valid
          } else if (el.email) {
            // @ts-expect-error this is valid
            return el.email;
          }
          // @ts-expect-error this is valid
          return el.curp;
        })
        .join(", ")
    : [];

  return (
    <CustomModal
      show={showModal}
      onHide={closeModal}
      title={t("email")}
      bottomComponent={
        <FormFooter
          onCancel={closeModal}
          onSubmit={onSubmit}
          loading={isLoading}
        />
      }
    >
      <SendEmailForm
        recipients={emailRecipients}
        handleSubmit={handleSubmit}
        ref={emailFormRef}
      />
    </CustomModal>
  );
};

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
        label={t("send")}
        onClick={onSubmit}
        variant="filled"
        loading={loading}
        type="submit"
      />
    </section>
  );
};
