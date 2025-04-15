import "../styles/styles.scss";

import {
  useRemoveBeneficiaryMutation,
  useTutorsQuery,
} from "../../../features/staff/staffApiSlice";
import { useTutorsReportQuery } from "../../../features/staff/staffReportApiSlice";

import { t } from "i18next";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectCurrentSearchTerm } from "../../../features/search/searchSlice";
import {
  FiltersStore,
  resetSorting,
  selectFiltersToSend,
  selectSorting,
} from "../../../features/filters/filtersSlice";
import { useEffect, useState } from "react";
import { SendEmailModal } from "./components/EmailModal2";

/**
 * Renders the ParentsTutors component, which displays a list of tutors or parents.
 * @returns The rendered component.
 */
const ParentsTutors = () => {
  const searchTerm = useAppSelector(selectCurrentSearchTerm);
  const filters = useAppSelector(selectFiltersToSend);
  const sorting = useAppSelector(selectSorting);
  const dispatch = useAppDispatch();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pageNo, setPageNo] = useState<number | undefined>();
  const [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();
  const { data, isLoading, refetch } = useTutorsQuery({
    searchTerm,
    filters,
    sorting,
    pageNo,
  });

  const [removeBeneficiary] = useRemoveBeneficiaryMutation();

  const toggleEmailModal = () => {
    setShowEmailModal(false);
  };

  const useGetAll = ({
    search,
    filterOptions,
  }: {
    search: string;
    filterOptions: FiltersStore["filters"];
  }) => {
    const { data: reportData } = useTutorsReportQuery({
      searchTerm: search,
      filters: filterOptions,
      pageSize: data?.totalElements,
    });
    return reportData?.content;
  };

  const handleRemove = async (id: string) => {
    try {
      await removeBeneficiary(id);
    } catch (err) {
      console.error(err);
    } finally {
      refetch();
    }
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
        pageTitle={t("parents tutors")}
        data={data?.content ?? []}
        isLoading={isLoading}
        onClickSendEmail={() => setShowEmailModal(true)}
        onClickDownloadButton={useGetAll}
        handleRemoveIndividual={handleRemove}
        initialDisplayMode="table"
        showDownloadButton
        customRefetch={refetch}
      />
      <SendEmailModal
        key="parents"
        showModal={showEmailModal}
        toggleModal={toggleEmailModal}
        useGetAll={useGetAll}
      />
    </>
  );
};

export default ParentsTutors;
