import React, { useCallback, useState } from "react";
import Table from "react-bootstrap/Table";
import { BiCheckbox, BiSolidCheckboxChecked } from "react-icons/bi";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import "./styles.scss";
import {
  IComplementaryInfo,
  IDiagnosesAndAilments,
  IGeneral,
  IParentsTutors,
  IPersonalInfo,
  ISchooling,
  IStaff,
} from "../../../../types";
import { useTranslation } from "react-i18next";
import { LiaUserEditSolid } from "react-icons/lia";
import { BsTrash } from "react-icons/bs";
import { formatTableValue, showSortButton } from "./utils";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import { selectCurrentUserRole } from "../../../../features/auth/authSlice";
import { useLocation } from "react-router-dom";
import { setSorting } from "../../../../features/filters/filtersSlice";

type StatsTableProps = {
  data:
    | IPersonalInfo[]
    | IGeneral[]
    | ISchooling[]
    | IDiagnosesAndAilments[]
    | IComplementaryInfo[]
    | IParentsTutors[]
    | IStaff[];
  onSelect: (
    id: string,
    setCheckAllRows: (data: boolean) => void,
  ) => Promise<void>;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  selectedElements: string[];
  toggleAllRows: (setCheckAllRows: (data: boolean) => void) => void;
};

type ActionsProps = Omit<
  StatsTableProps,
  "data" | "selectedElements" | "toggleAllRows" | "handleSort"
> & {
  selected: boolean;
};

/**
 * Renders a set of actions for a component.
 * @param {ActionsProps} onSelect - Callback function for when an item is selected.
 * @param {ActionsProps} onEdit - Callback function for when an item is edited.
 * @param {ActionsProps} onRemove - Callback function for when an item is removed.
 * @param {boolean} selected - Flag indicating if the item is selected.
 * @returns JSX element representing the actions component.
 */
const Actions = ({ onSelect, onEdit, onRemove, selected }: ActionsProps) => {
  const user = useAppSelector(selectCurrentUserRole);
  const { pathname } = useLocation();

  return (
    <div className="actions">
      {selected ? (
        <BiSolidCheckboxChecked className="icon checked" onClick={onSelect} />
      ) : (
        <BiCheckbox className="icon" onClick={onSelect} />
      )}
      {user === "ADMIN" ? (
        <>
          <LiaUserEditSolid className="icon" onClick={onEdit} />
          {pathname.includes("tutores") ? (
            <></>
          ) : (
            <BsTrash className="icon" onClick={onRemove} />
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

/**
 * A React component that renders a table to display statistics.
 * @param {StatsTableProps} props - The props for the StatsTable component.
 * @param {Array<Object>} props.data - The data to be displayed in the table.
 * @param {Function} props.onRemove - The function to be called when a row is removed.
 * @param {Function} props.onEdit - The function to be called when a row is edited.
 * @param {Function} props.onSelect - The function to be called when a row is selected.
 * @param {Array<number>} props.selectedElements - The indices of the selected rows.
 * @param {Function} props.toggleAllRows - The function to toggle the selection of all
 */
const StatsTable = React.forwardRef(
  (
    {
      data,
      onRemove,
      onEdit,
      onSelect,
      selectedElements,
      toggleAllRows,
    }: StatsTableProps,
    _ref,
  ) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [checkAllRows, setCheckAllRows] = useState(false);
    const [sortingStatus, setSortingStatus] = useState<"ASC" | "DESC">("DESC");
    const [sortedCategory, setSortedCategory] = useState<
      "Edad" | "Apellidos" | "Nombre" | "Año de diagnóstico" | ""
    >("");

    const handleCheckAllRows = useCallback(() => {
      toggleAllRows(setCheckAllRows);
    }, [toggleAllRows]);

    const handleSorting = useCallback(
      (title: "Edad" | "Apellidos" | "Nombre" | "Año de diagnóstico" | "") => {
        setSortedCategory(title);
        if (sortingStatus === "DESC") {
          dispatch(setSorting({ sortList: title, sortOrder: "ASC" }));
          setSortingStatus("ASC");
        } else {
          dispatch(setSorting({ sortList: title, sortOrder: "DESC" }));
          setSortingStatus("DESC");
        }
      },
      [dispatch, sortingStatus],
    );

    if (!data.length) return <></>;

    const columnsTitles = Object.keys(data[0]);
    return (
      <Table responsive className="scrolling">
        <thead>
          <tr>
            <th className="row-cell header-row" onClick={handleCheckAllRows}>
              {checkAllRows ? (
                <BiSolidCheckboxChecked className="icon checked" />
              ) : (
                <BiCheckbox className="icon" />
              )}
            </th>
            {columnsTitles.map((title) => (
              <th className="row-cell header-row" key={title}>
                <p className="header-text">
                  {t(title)}
                  {showSortButton(t(title)) ? (
                    <span
                      className="sort-container"
                      onClick={() =>
                        handleSorting(
                          title as
                            | "Edad"
                            | "Apellidos"
                            | "Nombre"
                            | "Año de diagnóstico"
                            | "",
                        )
                      }
                    >
                      <FaLongArrowAltUp
                        className={`sort-icon ${
                          sortedCategory === title && sortingStatus === "ASC"
                            ? "sort-icon-active"
                            : ""
                        }`}
                      />
                      <FaLongArrowAltDown
                        className={`sort-icon ${
                          sortedCategory === title && sortingStatus === "DESC"
                            ? "sort-icon-active"
                            : ""
                        }`}
                      />
                    </span>
                  ) : (
                    <></>
                  )}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody id="table-body">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} id="body-row">
              {Object.entries(row).map(([key, value], i) => {
                return (
                  <React.Fragment key={i}>
                    {i === 0 ? (
                      <>
                        <td className="row-cell">
                          {/* // TODO fix typescript for this part */}
                          <Actions
                            onSelect={() =>
                              onSelect(
                                // @ts-expect-error when there is no curp we can expect the email to come
                                row.tutorEmail ?? row.curp ?? row.email,
                                setCheckAllRows,
                              )
                            }
                            onEdit={() =>
                              // @ts-expect-error when there is no curp we can expect the email to come
                              onEdit(row.tutorEmail ?? row.curp ?? row.email)
                            }
                            onRemove={() =>
                              // @ts-expect-error when there is no curp we can expect the email to come
                              onRemove(row.tutorEmail ?? row.curp ?? row.email)
                            }
                            selected={selectedElements.includes(
                              // @ts-expect-error when there is no curp we can expect the email to come
                              row.tutorEmail ?? row.curp ?? row.email,
                            )}
                          />
                        </td>
                        <td className="row-cell">{value as string}</td>
                      </>
                    ) : (
                      <td
                        className={`row-cell ${
                          key === "otherAilments" || key === "reasonsForJoining"
                            ? "expanded-cell"
                            : ""
                        }`}
                      >
                        {formatTableValue(key, value)}
                      </td>
                    )}
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  },
);

export default StatsTable;
