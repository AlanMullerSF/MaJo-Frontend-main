import { useTranslation } from "react-i18next";
import DashboardLayout from "../../../layouts/DashboardLayout";
import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectCurrentUserName } from "../../../features/auth/authSlice";
import {
  useCreateStaffMutation,
  useGetStaffQuery,
  useRemoveStaffMutation,
} from "../../../features/staff/staffApiSlice";
import { useGetStaffReportQuery } from "../../../features/staff/staffReportApiSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { IStaff } from "../../../types";
import { AddUserModal } from "./components/AddStaffModal";
import { SendEmailModal } from "./components/SendEmailModal";
import { selectCurrentSearchTerm } from "../../../features/search/searchSlice";
import {
  FiltersStore,
  resetSorting,
  selectSorting,
} from "../../../features/filters/filtersSlice";

/**
 * A control panel component that displays various features and functionalities.
 * @returns {JSX.Element} - The rendered control panel component.
 */
const ControlPanel = () => {
  const { t } = useTranslation();
  const name = useAppSelector(selectCurrentUserName);
  const searchTerm = useAppSelector(selectCurrentSearchTerm);
  const sorting = useAppSelector(selectSorting);
  const dispatch = useAppDispatch();
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pageNo, setPageNo] = useState<number | undefined>();
  const [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();
  const { data, isLoading, refetch } = useGetStaffQuery({
    searchTerm,
    sorting,
    pageNo,
  });
  const [createStaff, { isLoading: isSubmittingForm }] =
    useCreateStaffMutation();
  const formRef = useRef(null);
  const [removeStaff] = useRemoveStaffMutation();

  const toggleStaffModal = useCallback(() => {
    setShowStaffModal((prevState) => !prevState);
  }, []);

  const toggleEmailModal = useCallback(() => {
    setShowEmailModal(false);
  }, []);

  const useGetAll = ({
    search,
    filterOptions: _,
  }: {
    search: string;
    filterOptions: FiltersStore["filters"];
  }) => {
    const { data: reportData } = useGetStaffReportQuery({
      searchTerm: search,
      pageSize: data?.totalElements,
    });
    return reportData?.content;
  };

  // TODO add correct typescript types for formRef
  const onSubmit = useCallback(() => {
    // @ts-expect-error submitForm is valid
    if (formRef.current?.isValid) {
      // @ts-expect-error submitForm is valid
      formRef.current?.submitForm();
      setShowStaffModal((prevState) => !prevState);
    }
  }, []);

  const handleSubmit = async (data: IStaff) => {
    await createStaff(data);
    refetch();
  };

  const handleRemove = async (id: string) => {
    await removeStaff(id);
    refetch();
  };

  // Used to reset sorting to none
  useEffect(() => {
    dispatch(resetSorting());
  }, [dispatch]);

  // Used to simulate an infinite scroll
  useEffect(() => {
    if (isLoading || timeoutId) return;

    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;

      const allDataLoaded =
        data?.totalElements !== undefined &&
        data?.totalElements === data?.content.length;

      const canRenderMorePages = data !== undefined && data.totalPages !== 1;

      if (
        scrolledToBottom &&
        canRenderMorePages &&
        !isLoading &&
        !allDataLoaded
      ) {
        const timeout = setTimeout(() => {
          setPageNo((prevPageNo) =>
            prevPageNo !== undefined ? prevPageNo * 2 : 10,
          );
        }, 1200);
        setTimeoutId(timeout);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts or dependencies change
      setTimeoutId(undefined); // Reset the timeoutId state
    };
  }, [data, isLoading, pageNo, timeoutId]);

  return (
    <>
      <DashboardLayout
        displayMode="table"
        setDisplayMode={() => null}
        pageTitle={t("welcome", { name })}
        data={data?.content ?? []}
        isLoading={isLoading}
        onClickDownloadButton={useGetAll}
        handleRemoveIndividual={handleRemove}
        onClickAddUser={toggleStaffModal}
        onClickSendEmail={() => setShowEmailModal(true)}
        initialDisplayMode="table"
        customRefetch={refetch}
      />
      <AddUserModal
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        showStaffModal={showStaffModal}
        isSubmittingForm={isSubmittingForm}
        toggleStaffModal={toggleStaffModal}
        ref={formRef}
      />
      <SendEmailModal
        showModal={showEmailModal}
        toggleModal={toggleEmailModal}
        useGetAll={useGetAll}
      />
    </>
  );
};

export default ControlPanel;
