import "../styles/styles.scss";

// mocks
// import data from "../../../mocks/personalInfoData.json";
import {
  usePersonalInfoQuery,
  useRemoveBeneficiaryMutation,
} from "../../../features/staff/staffApiSlice";
import { usePersonalInfoReportQuery } from "../../../features/staff/staffReportApiSlice";

import { t } from "i18next";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { usePersonalInfoCardsQuery } from "../../../features/staff/cardsApiSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectCurrentSearchTerm } from "../../../features/search/searchSlice";
import {
  FiltersStore,
  resetSorting,
  selectFiltersToSend,
  selectSorting,
} from "../../../features/filters/filtersSlice";
import { useEffect, useState } from "react";

/**
 * A component that displays personal information based on the current search term and filters.
 * @returns The PersonalInfo component.
 */
const PersonalInfo = () => {
  const searchTerm = useAppSelector(selectCurrentSearchTerm);
  const filters = useAppSelector(selectFiltersToSend);
  const sorting = useAppSelector(selectSorting);
  const dispatch = useAppDispatch();
  const [pageNo, setPageNo] = useState<number | undefined>();
  const [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();
  const { data, isLoading, refetch } = usePersonalInfoQuery({
    searchTerm,
    filters,
    sorting,
    pageNo,
  });
  const { data: cardsData } = usePersonalInfoCardsQuery();

  const [removeBeneficiary] = useRemoveBeneficiaryMutation();

  const useGetAll = ({
    search,
    filterOptions,
  }: {
    search: string;
    filterOptions: FiltersStore["filters"];
  }) => {
    const { data: reportData } = usePersonalInfoReportQuery({
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
    <DashboardLayout
      displayMode="table"
      setDisplayMode={() => null}
      pageTitle={t("personal info")}
      data={data?.content ?? []}
      isLoading={isLoading}
      onClickDownloadButton={useGetAll}
      handleRemoveIndividual={handleRemove}
      cardsData={cardsData}
      initialDisplayMode="table"
      showDownloadButton
      customRefetch={refetch}
    />
  );
};

export default PersonalInfo;
