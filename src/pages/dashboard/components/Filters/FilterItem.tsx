import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import "./styles.scss";
import { useCallback, useState } from "react";
import FilterCheckbox from "../FilterCheckbox";
import { useTranslation } from "react-i18next";

export type FilterItemProps = {
  filterOptions:
    | {
        sex: boolean;
      }[]
    | {
        state: string;
      }[]
    | {
        levelOfEducation: string;
      }[]
    | {
        specialEducation: boolean;
      }[]
    | {
        studying: boolean;
      }[]
    | {
        geneticDiagnosis: boolean;
      }[]
    | {
        typeOfDiagnosis: string;
      }[]
    | {
        requiresGrowthHormone: boolean;
      }[]
    | {
        ailments: string;
      }[]
    | {
        socialSecurityRegime: string;
      }[];
};

/**
 * A component that represents a filter item.
 * @param {FilterItemProps} filterOptions - The filter options for the item.
 * @returns The JSX element representing the filter item.
 */
const FilterItem = ({ filterOptions }: FilterItemProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const toggle = useCallback(() => {
    setOpen((prevState) => !prevState);
  }, []);

  return (
    <div className="filter-item">
      <div className="filter-header" onClick={toggle}>
        {/* // TODO add a custom function to get filter title */}
        <p>{t(Object.keys(filterOptions[0])[0])}</p>
        {open ? (
          <BsChevronUp className="chevron" />
        ) : (
          <BsChevronDown className="chevron" />
        )}
      </div>
      {open ? (
        <div className="filter-body">
          {filterOptions.map((f) => {
            const key = Object.values(f);
            return <FilterCheckbox key={key[0]} filter={f} />;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default FilterItem;
