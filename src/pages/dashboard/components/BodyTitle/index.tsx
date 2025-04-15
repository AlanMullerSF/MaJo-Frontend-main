import { useTranslation } from "react-i18next";
import RoundButton from "../RoundButton";
import TableButton from "../TableButton";
import "./styles.scss";
import DownloadReport from "../../../../features/download/downloadReport";
import {
  IComplementaryInfo,
  IDiagnosesAndAilments,
  IGeneral,
  IParentsTutors,
  IPersonalInfo,
  ISchooling,
  IStaff,
} from "../../../../types";
import { FiltersStore } from "../../../../features/filters/filtersSlice";
import { useLocation } from "react-router-dom";

type BodyTitleProps = {
  title: string;
  onClickTable?: () => void;
  onClickGraph?: () => void;
  onClickDownload?: (options: {
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
  showDisplayMode?: boolean;
  showAdminButtons?: boolean;
  onClickAddUser?: () => void;
  onClickSendEmail?: () => void;
  displayMode: "table" | "graph";
  showDownloadButton?: boolean;
  selectedUsers: string[] | [];
};

/**
 * Renders a body title component with various options and event handlers.
 * @param {string} title - The title to display in the body title component.
 * @param {function} onClickDownload - The event handler for the download button click.
 * @param {function} onClickGraph - The event handler for the graph button click.
 * @param {function} onClickTable - The event handler for the table button click.
 * @param {boolean} [showDisplayMode=false] - Whether to show the display mode option.
 * @param {boolean} [showAdminButtons=false] - Whether to show the admin buttons.
 * @param {function} onClickAddUser - The event handler for the add user button click.
 * @param
 */
const BodyTitle = ({
  title,
  onClickDownload,
  onClickGraph,
  onClickTable,
  showDisplayMode = false,
  showAdminButtons = false,
  onClickAddUser,
  onClickSendEmail,
  displayMode,
  showDownloadButton,
  selectedUsers,
}: BodyTitleProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <div className="title-navigation">
      <h1>{title}</h1>
      <div className="navigation-container">
        {showDisplayMode && onClickTable && onClickGraph && (
          <div className="display-mode">
            <TableButton
              variant={displayMode === "table" ? "filled" : "outlined"}
              icon="table"
              color="rgba(222, 19, 136, 0.50)"
              label="Tabla"
              onClick={onClickTable}
            />
            <TableButton
              variant={displayMode === "graph" ? "filled" : "outlined"}
              icon="graphs"
              color="#DE1388"
              label="Gráfica"
              onClick={onClickGraph}
            />
          </div>
        )}
        {(showAdminButtons || pathname.includes("tutores")) && (
          <div className="admin-cta">
            {!pathname.includes("tutores") && (
              <RoundButton
                label={t("add user")}
                variant="filled"
                rightIcon="user"
                onClick={onClickAddUser}
              />
            )}
            <RoundButton
              label={t("send email")}
              variant="outlined"
              rightIcon="email"
              onClick={onClickSendEmail}
              disabled={selectedUsers?.length === 0}
            />
          </div>
        )}
        {!showAdminButtons &&
          (showDisplayMode || showDownloadButton) &&
          onClickDownload && (
            <DownloadReport
              useGetAll={onClickDownload}
              selectedUsers={selectedUsers}
              reportTitle={title}
            />
          )}
      </div>
    </div>
  );
};

export default BodyTitle;
