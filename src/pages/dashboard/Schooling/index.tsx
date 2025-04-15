import "../styles/styles.scss";

import {
  useRemoveBeneficiaryMutation,
  useSchoolingQuery,
} from "../../../features/staff/staffApiSlice";
import { useSchoolingReportQuery } from "../../../features/staff/staffReportApiSlice";

import { t } from "i18next";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { useSchoolingCardsQuery } from "../../../features/staff/cardsApiSlice";
import { GraphsView } from "./GraphsView";
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
 * Renders the Schooling component, which displays a list of beneficiaries and provides
 * functionality to remove beneficiaries, sort the list, and display graphs.
 * @returns The rendered Schooling component.
 */
const Schooling = () => {
  const searchTerm = useAppSelector(selectCurrentSearchTerm);
  const filters = useAppSelector(selectFiltersToSend);
  const sorting = useAppSelector(selectSorting);
  const dispatch = useAppDispatch();
  const [displayMode, setDisplayMode] = useState<"graph" | "table">("graph");
  const [pageNo, setPageNo] = useState<number | undefined>();
  const [timeoutId, setTimeoutId] = useState<
    ReturnType<typeof setTimeout> | undefined
  >();
  const { data, isLoading, refetch } = useSchoolingQuery({
    searchTerm,
    filters,
    sorting,
    pageNo,
  });
  const { data: cardsData } = useSchoolingCardsQuery();

  const [removeBeneficiary] = useRemoveBeneficiaryMutation();

  const useGetAll = ({
    search,
    filterOptions,
  }: {
    search: string;
    filterOptions: FiltersStore["filters"];
  }) => {
    const { data: reportData } = useSchoolingReportQuery({
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
    if (displayMode === "graph" || isLoading || timeoutId) return;

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
  }, [isLoading, pageNo, displayMode, timeoutId, data]);

  return (
    <DashboardLayout
      displayMode={displayMode}
      setDisplayMode={setDisplayMode}
      pageTitle={t("schooling")}
      data={data?.content ?? []}
      isLoading={isLoading}
      onClickDownloadButton={useGetAll}
      handleRemoveIndividual={handleRemove}
      cardsData={cardsData}
      customRefetch={refetch}
      GraphsComponent={
        <GraphsView data={data?.content ?? []} isLoading={isLoading} />
      }
    />
  );
};

export default Schooling;
