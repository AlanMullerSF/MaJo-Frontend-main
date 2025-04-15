import BodyTitle from "../pages/dashboard/components/BodyTitle";
import StatsCard from "../pages/dashboard/components/StatsCard";
import FilterButton from "../pages/dashboard/components/FilterButton";
import { useCallback, useEffect, useRef, useState } from "react";

import "./styles.scss";

import Filters from "../pages/dashboard/components/Filters";
import StatsTable from "../pages/dashboard/components/Table";

// Bootstrap components
import Spinner from "react-bootstrap/Spinner";

// mocks
// import data from "../../../mocks/personalInfoData.json";
import {
  ICard,
  IComplementaryInfo,
  IDiagnosesAndAilments,
  IGeneral,
  IParentsTutors,
  IPersonalInfo,
  ISchooling,
  IStaff,
} from "../types";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomModal from "../components/CustomModal/CustomModal";
import RoundButton from "../pages/dashboard/components/RoundButton";
import { EditBeneficiaryModal } from "../components/EditFormModal/EditBeneficiaryModal";
import { EditStaffModal } from "../components/EditFormModal/EditStaffModal";
import { EditTutorModal } from "../components/EditFormModal/EditTutorModal";
import { useFilters } from "./filters";
import {
  FiltersStore,
  selectFiltersToSend,
  setUsersToSendEmail,
} from "../features/filters/filtersSlice";
import { useAppDispatch, useAppSelector } from "../app/store";

// TODO it would be better to extract to different components this layout

type DashboardLayoutType = {
  pageTitle: string;
  data:
    | IPersonalInfo[]
    | IGeneral[]
    | ISchooling[]
    | IDiagnosesAndAilments[]
    | IComplementaryInfo[]
    | IParentsTutors[]
    | IStaff[];
  displayMode: "graph" | "table";
  setDisplayMode: (val: "graph" | "table") => void;
  isLoading: boolean;
  handleRemoveIndividual?: (id: string) => void;
  cardsData?: ICard[];
  onClickAddUser?: () => void;
  onClickSendEmail?: () => void;
  GraphsComponent?: React.ReactNode;
  initialDisplayMode?: "graph" | "table";
  showDownloadButton?: boolean;
  customRefetch: () => void;
  handleEditStaff?: () => void;
  onClickDownloadButton: (options: {
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
 * A layout component for the dashboard page.
 * @param {string} pageTitle - The title of the dashboard page.
 * @param {object} data - The data to display on the dashboard.
 * @param {boolean} isLoading - Indicates whether the data is currently being loaded.
 * @param {function} handleRemoveIndividual - A function to handle the removal of an individual.
 * @param {object} cardsData - The data for the cards displayed on the dashboard.
 * @param {function} onClickAddUser - A function to handle the click event for adding a user.
 * @param {function} onClickSendEmail - A function to handle the click event for sending an email.
 * @param {React.Component} GraphsComponent - A component that renders the GraphsView
 * @param {boolean} initialDisplayMode - Prop to render wether the view must start with a graph or table
 * @param {boolean} showDownloadButton - Prop to show or not show the download button
 * @param {function} customRefetch - A function that refetchs data after a event is finished
 * @param {function} onClickDownloadButton - A function that handles the press on the download Button
 */
const DashboardLayout = ({
  pageTitle,
  data,
  isLoading,
  handleRemoveIndividual,
  cardsData,
  onClickAddUser,
  onClickSendEmail,
  GraphsComponent,
  showDownloadButton = false,
  displayMode = "graph",
  setDisplayMode,
  customRefetch,
  onClickDownloadButton,
}: DashboardLayoutType) => {
  const { t } = useTranslation();
  const filtersToSend = useAppSelector(selectFiltersToSend);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBeneficiaryModal, setShowBeneficiaryModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showTutorModal, setShowTutorModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [userToEdit, setUserToEdit] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [allUsersTicked, setAllUsersTicked] = useState(false);
  const ref = useRef(null);
  const { pathname } = useLocation();
  const filters = useFilters();

  const handleToggle = useCallback(
    () => setShow((prevState) => !prevState),
    [],
  );

  const toggleShowEditBeneficiaryModal = useCallback(() => {
    if (showBeneficiaryModal) {
      setUserToEdit("");
    }
    setShowBeneficiaryModal((prevState) => !prevState);
  }, [showBeneficiaryModal]);

  const toggleShowEditStaffModal = useCallback(() => {
    if (showStaffModal) {
      setUserToEdit("");
    }
    setShowStaffModal((prevState) => !prevState);
  }, [showStaffModal]);

  const toggleShowTutorModal = useCallback(() => {
    if (showTutorModal) {
      setUserToEdit("");
    }
    setShowTutorModal((prevState) => !prevState);
  }, [showTutorModal]);

  const handleDelete = useCallback((id: string) => {
    setSelectedUser(id);
    setShowDeleteModal(true);
  }, []);

  const handleRemove = useCallback(
    (id: string) => {
      handleRemoveIndividual?.(id);
      setShowDeleteModal(false);
    },
    [handleRemoveIndividual],
  );

  const handleCancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setSelectedUser("");
  }, []);

  const handleEditIndividual = useCallback(
    (userId: string) => {
      if (pathname.includes("control")) {
        toggleShowEditStaffModal();
      } else if (pathname.includes("tutores")) {
        toggleShowTutorModal();
      } else {
        toggleShowEditBeneficiaryModal();
      }
      setUserToEdit(userId);
    },
    [
      pathname,
      toggleShowEditBeneficiaryModal,
      toggleShowEditStaffModal,
      toggleShowTutorModal,
    ],
  );

  const handleSelectIndividual = async (
    id: string,
    setCheckAllRows: (data: boolean) => void,
  ) => {
    if (!data?.length) {
      return;
    }
    if (selectedUsers.includes(id)) {
      setSelectedUsers((prevState) => prevState.filter((user) => user !== id));
      setCheckAllRows(false);
      setAllUsersTicked(false);
      return;
    }
    setSelectedUsers((prevState) => [...prevState, id]);
    if (selectedUsers.length + 1 === data.length) {
      setAllUsersTicked(true);
      setCheckAllRows(true);
    }
  };

  const toggleAllRows = useCallback(
    (setCheckAllRows: (_data: boolean) => void) => {
      if (allUsersTicked) {
        setSelectedUsers([]);
        setCheckAllRows(false);
        setAllUsersTicked(false);
        return;
      }
      if (!data?.length) {
        return;
      }
      // @ts-expect-error when there is no curp we can expect the email to come
      setSelectedUsers(data.map((el) => el.tutorEmail ?? el.curp ?? el.email));
      setAllUsersTicked(true);
      setCheckAllRows(true);
    },
    [allUsersTicked, data],
  );

  useEffect(() => {
    setSelectedUsers([]);
  }, [filtersToSend]);

  useEffect(() => {
    if (pathname.includes("control") || pathname.includes("tutores")) {
      dispatch(setUsersToSendEmail(selectedUsers));
    } else {
      return;
    }
  }, [dispatch, pathname, selectedUsers]);

  return (
    <>
      <section className="control-panel">
        <BodyTitle
          title={pageTitle}
          onClickGraph={() => setDisplayMode("graph")}
          onClickDownload={onClickDownloadButton}
          onClickTable={() => setDisplayMode("table")}
          showDisplayMode={
            !pathname.includes("control") &&
            !pathname.includes("personal") &&
            !pathname.includes("tutores")
          }
          showAdminButtons={pathname.includes("control")}
          onClickAddUser={onClickAddUser}
          onClickSendEmail={onClickSendEmail}
          displayMode={displayMode}
          showDownloadButton={showDownloadButton}
          selectedUsers={selectedUsers}
        />
        {cardsData?.length && (
          <li className="cards-container">
            {cardsData.map((card) => (
              <StatsCard key={card.title} {...card} />
            ))}
          </li>
        )}
        {displayMode === "table" && !pathname.includes("control") ? (
          <div className="filter-button-container">
            <FilterButton onClick={handleToggle} />
          </div>
        ) : null}

        {displayMode === "table" ? (
          <div style={{ position: "relative" }}>
            {isLoading ? (
              <div className="table-backdrop">
                <div className="loader">
                  <Spinner animation="border" role="status" />
                </div>
              </div>
            ) : data?.length ? (
              <>
                <StatsTable
                  data={data}
                  onSelect={handleSelectIndividual}
                  onEdit={handleEditIndividual}
                  onRemove={handleDelete}
                  selectedElements={selectedUsers}
                  toggleAllRows={toggleAllRows}
                  ref={ref}
                />
                {isLoading && (
                  <Spinner animation="border" variant="secondary" />
                )}
              </>
            ) : (
              <p>{t("no data")}</p>
            )}
          </div>
        ) : (
          GraphsComponent
        )}
      </section>

      <Filters show={show} handleToggle={handleToggle} options={filters} />

      <CustomModal
        show={showDeleteModal}
        subheading={t("are you sure you want to delete?")}
        body={t("once deleted they can not be recovered")}
        onHide={() => setShowDeleteModal(false)}
        bottomComponent={
          <DeleteModalFooter
            userId={selectedUser}
            removeIndividual={handleRemove}
            handleCancel={handleCancelDelete}
          />
        }
      />
      {!pathname.includes("control") &&
      !pathname.includes("tutores") &&
      userToEdit.length ? (
        <EditBeneficiaryModal
          show={showBeneficiaryModal}
          toggleShow={toggleShowEditBeneficiaryModal}
          beneficiaryId={userToEdit}
          refetch={customRefetch}
        />
      ) : (
        <></>
      )}
      {pathname.includes("control") &&
      !pathname.includes("tutores") &&
      userToEdit.length ? (
        <EditStaffModal
          refetch={customRefetch}
          staffId={userToEdit}
          show={showStaffModal}
          toggleShow={toggleShowEditStaffModal}
        />
      ) : (
        <></>
      )}
      {pathname.includes("tutores") && userToEdit.length ? (
        <EditTutorModal
          refetch={customRefetch}
          tutorId={userToEdit}
          show={showTutorModal}
          toggleShow={toggleShowTutorModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};

type DeleteModalFooterProps = {
  removeIndividual: (id: string) => void;
  handleCancel: () => void;
  userId: string;
};

const DeleteModalFooter = ({
  userId,
  removeIndividual,
  handleCancel,
}: DeleteModalFooterProps) => {
  const { t } = useTranslation();
  return (
    <div className="confirm-delete-buttons">
      <RoundButton onClick={handleCancel} label={t("no")} variant="outlined" />
      <RoundButton
        onClick={() => removeIndividual(userId)}
        label={t("yes")}
        variant="filled"
      />
    </div>
  );
};

export default DashboardLayout;
