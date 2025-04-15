import { Button } from "react-bootstrap";
import { VscFilter } from "react-icons/vsc";

import "./styles.scss";
import { useTranslation } from "react-i18next";

type FilterButtonProps = {
  onClick: () => void;
};

/**
 * A functional component that renders a filter button.
 * @param {FilterButtonProps} onClick - The function to be called when the button is clicked.
 * @returns The rendered filter button.
 */
const FilterButton = ({ onClick }: FilterButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button className="btn" onClick={onClick}>
      {t("filter")} <VscFilter />
    </Button>
  );
};

export default FilterButton;
