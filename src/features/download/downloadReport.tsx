import { CSVLink } from "react-csv";
import { t } from "i18next";
import { formatTableValue } from "../../pages/dashboard/components/Table/utils";
import {
  IPersonalInfo,
  IGeneral,
  ISchooling,
  IDiagnosesAndAilments,
  IComplementaryInfo,
  IParentsTutors,
  IStaff,
} from "../../types";
import TableButton from "../../pages/dashboard/components/TableButton";
import { useAppSelector } from "../../app/store";
import { selectCurrentSearchTerm } from "../search/searchSlice";
import { FiltersStore, selectFiltersToSend } from "../filters/filtersSlice";

type DownloadReportProps = {
  selectedUsers: string[] | [];
  reportTitle: string;
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
 * Component for downloading a report based on the current search term and filters.
 * @param {DownloadReportProps} useGetAll - Props for the DownloadReport component.
 * @returns JSX elements for rendering the download report button.
 */
function DownloadReport({
  useGetAll,
  selectedUsers,
  reportTitle,
}: DownloadReportProps) {
  const searchTerm = useAppSelector(selectCurrentSearchTerm);
  const filters = useAppSelector(selectFiltersToSend);
  const allReportData = useGetAll({
    search: searchTerm,
    filterOptions: filters,
  });

  const dataToFormat = selectedUsers.length
    ? allReportData?.filter((el) =>
        // @ts-expect-error this is valid
        selectedUsers.includes(el.tutorEmail ?? el.email ?? el.curp),
      )
    : allReportData;

  const titles = [];

  for (const key in allReportData?.[0]) {
    titles.push(t(key));
  }

  const reportData: unknown[][] = [];
  if (dataToFormat?.length) {
    for (const element of dataToFormat) {
      const row: unknown[] = [];
      Object.entries(element).map(([key, value]) => {
        row.push(formatTableValue(key, value));
      });
      reportData.push(row);
    }
  }

  const filename =
    reportTitle.replace(" ", "-") +
    "." +
    new Date().toISOString().slice(0, 10).split(":").join(".") +
    "." +
    new Date().toTimeString().slice(0, 8).split(":").join(".") +
    ".csv";

  return (
    <CSVLink
      data={reportData}
      headers={titles}
      filename={filename}
      target="_blank"
      style={{ textDecoration: "none" }}
    >
      <TableButton
        variant={"flat"}
        icon="download"
        color="#DE1388"
        label="Descargar Reporte"
      />
    </CSVLink>
  );
}

export default DownloadReport;
