import React from "react";
import CustomModal from "../../../../components/CustomModal/CustomModal";
import { AddNewStaffForm } from "./AddNewStaffForm";
import FormFooter from "./AddStaffFormFooter";
import { IStaff } from "../../../../types";

type AddUserModalProps = {
  showStaffModal: boolean;
  toggleStaffModal: () => void;
  onSubmit: () => void;
  isSubmittingForm: boolean;
  handleSubmit: (data: IStaff) => Promise<void>;
};

/**
 * A modal component for adding a user.
 * @param {AddUserModalProps} props - The props for the AddUserModal component.
 * @param {boolean} props.showStaffModal - Indicates whether the modal is visible or not.
 * @param {function} props.toggleStaffModal - Function to toggle the visibility of the modal.
 * @param {function} props.onSubmit - Function to handle the form submission.
 * @param {boolean} props.isSubmittingForm - Indicates whether the form is currently being submitted.
 * @param {function} props.handleSubmit - Function to handle the form submission.
 * @param {React.Ref} ref - Ref object for the AddUserModal component.
 * @returns The AddUserModal component.
 */
export const AddUserModal = React.forwardRef(
  (
    {
      showStaffModal,
      toggleStaffModal,
      onSubmit,
      isSubmittingForm,
      handleSubmit,
    }: AddUserModalProps,
    ref,
  ) => {
    return (
      <CustomModal
        key="add-user-modal"
        show={showStaffModal}
        onHide={toggleStaffModal}
        bottomComponent={
          <FormFooter
            onCancel={toggleStaffModal}
            onSubmit={onSubmit}
            loading={isSubmittingForm}
          />
        }
      >
        <AddNewStaffForm ref={ref} handleSubmit={handleSubmit} />
      </CustomModal>
    );
  },
);
