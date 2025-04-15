import { useAppDispatch, useAppSelector } from "../../../../app/store";
import {
  initialState,
  selectFilters,
  setFilters,
  setFiltersToSend,
} from "../../../../features/filters/filtersSlice";
import RoundButton from "../RoundButton";

type FilterCta = {
  onHide: () => void;
};

/**
 * Represents a call-to-action (CTA) for a filter.
 */
const FilterCta = ({ onHide }: FilterCta) => {
  const filters = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  const handleRemoveAllFilters = () => {
    dispatch(setFilters(initialState));
    dispatch(setFiltersToSend(initialState));
    onHide();
  };

  const handleApplyFilters = () => {
    dispatch(setFiltersToSend(filters));
    onHide();
  };
  return (
    <div className="cta-container">
      <RoundButton
        label="Aplicar filtros"
        onClick={handleApplyFilters}
        variant="filled"
      />
      <RoundButton
        label="Eliminar filtros"
        onClick={handleRemoveAllFilters}
        leftIcon="trash-can"
        variant="outlined"
      />
    </div>
  );
};

export default FilterCta;
