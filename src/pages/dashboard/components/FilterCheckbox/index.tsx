import { useEffect, useState } from "react";
import { BiCheckbox, BiSolidCheckboxChecked } from "react-icons/bi";
import "./styles.scss";
import { formatTableValue } from "../Table/utils";
import { useAppDispatch, useAppSelector } from "../../../../app/store";
import {
  selectFilters,
  setFilters,
} from "../../../../features/filters/filtersSlice";

type FilterCheckboxProps = {
  filter:
    | {
        sex: boolean;
      }
    | {
        state: string;
      }
    | {
        levelOfEducation: string;
      }
    | {
        specialEducation: boolean;
      }
    | {
        studying: boolean;
      }
    | {
        geneticDiagnosis: boolean;
      }
    | {
        typeOfDiagnosis: string;
      }
    | {
        requiresGrowthHormone: boolean;
      }
    | {
        ailments: string;
      }
    | {
        socialSecurityRegime: string;
      };
};

/**
 * A checkbox component for a filter.
 * @param {FilterCheckboxProps} filter - The filter object.
 * @returns None
 */
const FilterCheckbox = ({ filter }: FilterCheckboxProps) => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Update the checked state based on the selected filter in the global state
    switch (Object.keys(filter)[0]) {
      case "sex":
        setChecked(filters.sex === Object.values(filter)[0]);
        break;
      case "state":
        setChecked(filters.state === Object.values(filter)[0]);
        break;
      case "levelOfEducation":
        setChecked(filters.levelOfEducation === Object.values(filter)[0]);
        break;
      case "specialEducation":
        setChecked(filters.specialEducation === Object.values(filter)[0]);
        break;
      case "studying":
        setChecked(filters.studying === Object.values(filter)[0]);
        break;
      case "geneticDiagnosis":
        setChecked(filters.geneticDiagnosis === Object.values(filter)[0]);
        break;
      case "requiresGrowthHormone":
        setChecked(filters.requiresGrowthHormone === Object.values(filter)[0]);
        break;

      case "socialSecurityRegime":
        setChecked(filters.socialSecurityRegime === Object.values(filter)[0]);
        break;

      case "typeOfDiagnosis":
        setChecked(filters.typeOfDiagnosis === Object.values(filter)[0]);
        break;

      case "ailments":
        setChecked(
          filters.ailments?.includes(Object.values(filter)[0]) ?? false,
        );
        break;
      default:
        setChecked(false);
    }
  }, [filters, filter]);

  const handleToggle = () => {
    switch (Object.keys(filter)[0]) {
      case "sex":
        if (checked) {
          dispatch(setFilters({ ...filters, sex: undefined }));
          setChecked(false);
          break;
        }

        dispatch(setFilters({ ...filters, sex: Object.values(filter)[0] }));
        setChecked(true);

        break;
      case "state":
        if (checked) {
          dispatch(setFilters({ ...filters, state: "" }));
          setChecked(false);
        }

        dispatch(setFilters({ ...filters, state: Object.values(filter)[0] }));
        setChecked(true);

        break;
      case "levelOfEducation":
        if (checked) {
          dispatch(setFilters({ ...filters, levelOfEducation: "" }));
          setChecked(false);
        }

        dispatch(
          setFilters({
            ...filters,
            levelOfEducation: Object.values(filter)[0],
          }),
        );
        setChecked(true);

        break;

      case "specialEducation":
        if (checked) {
          dispatch(setFilters({ ...filters, specialEducation: undefined }));
          setChecked(false);
          break;
        }

        dispatch(
          setFilters({
            ...filters,
            specialEducation: Object.values(filter)[0],
          }),
        );
        setChecked(true);

        break;
      case "studying":
        if (checked) {
          dispatch(setFilters({ ...filters, studying: undefined }));
          setChecked(false);
          break;
        }

        dispatch(
          setFilters({ ...filters, studying: Object.values(filter)[0] }),
        );
        setChecked(true);

        break;

      case "geneticDiagnosis":
        if (checked) {
          dispatch(setFilters({ ...filters, geneticDiagnosis: undefined }));
          setChecked(false);
          break;
        }

        dispatch(
          setFilters({
            ...filters,
            geneticDiagnosis: Object.values(filter)[0],
          }),
        );
        setChecked(true);

        break;

      case "typeOfDiagnosis":
        if (checked) {
          dispatch(setFilters({ ...filters, typeOfDiagnosis: undefined }));
          setChecked(false);
          break;
        }

        dispatch(
          setFilters({
            ...filters,
            typeOfDiagnosis: Object.values(filter)[0],
          }),
        );
        setChecked(true);

        break;

      case "requiresGrowthHormone":
        if (checked) {
          dispatch(
            setFilters({ ...filters, requiresGrowthHormone: undefined }),
          );
          setChecked(false);
          break;
        }

        dispatch(
          setFilters({
            ...filters,
            requiresGrowthHormone: Object.values(filter)[0],
          }),
        );
        setChecked(true);

        break;

      case "socialSecurityRegime":
        if (checked) {
          dispatch(setFilters({ ...filters, socialSecurityRegime: undefined }));
          setChecked(false);
          break;
        }

        dispatch(
          setFilters({
            ...filters,
            socialSecurityRegime: Object.values(filter)[0],
          }),
        );
        setChecked(true);

        break;

      case "ailments":
        if (checked) {
          const ailmentsValues = `${filters.ailments}`
            .split(", ")
            .filter((el) => el !== Object.values(filter)[0])
            .join(", ");
          dispatch(setFilters({ ...filters, ailments: ailmentsValues }));
          setChecked(false);
          break;
        }

        // eslint-disable-next-line no-case-declarations
        const ailments = filters.ailments
          ? `${filters.ailments}, ${Object.values(filter)[0]}`
          : `${Object.values(filter)[0]}`;

        dispatch(
          setFilters({
            ...filters,
            ailments,
          }),
        );
        setChecked(true);

        break;
    }
  };
  return (
    <div className="single-filter" onClick={handleToggle}>
      <p>
        {formatTableValue(Object.keys(filter)[0], Object.values(filter)[0])}
      </p>
      {checked ? (
        <BiSolidCheckboxChecked className="checkbox checked" />
      ) : (
        <BiCheckbox className="checkbox" />
      )}
    </div>
  );
};

export default FilterCheckbox;
