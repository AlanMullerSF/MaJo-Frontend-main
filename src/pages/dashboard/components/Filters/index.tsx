import { Offcanvas } from "react-bootstrap";
import FilterItem from "./FilterItem";
import FilterCta from "./FilterCta";
import { FiltersType } from "../../../../layouts/filters";

type FiltersProps = {
  show: boolean;
  handleToggle: () => void;
  options: FiltersType;
};

/**
 * Filters an array based on a given condition.
 * @param {Array} array - The array to filter.
 * @param {Function} condition - The condition to filter by.
 * @returns {Array} - The filtered array.
 */
const Filters = ({ show, handleToggle, options }: FiltersProps) => {
  return (
    <Offcanvas show={show} onHide={handleToggle}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>&nbsp;</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="filters-container">
        <div>
          {options.map((filter, i) => (
            <FilterItem
              key={`${Object.keys(filter)[0]}-${i}`}
              filterOptions={filter}
            />
          ))}
        </div>
        <div className="filter-cta-container">
          <FilterCta onHide={handleToggle} />
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Filters;
