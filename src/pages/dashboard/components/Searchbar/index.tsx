import { ChangeEventHandler, useCallback, useState } from "react";
import { SlMagnifier } from "react-icons/sl";
import { useTranslation } from "react-i18next";
import "./styles.scss";
import { useAppDispatch } from "../../../../app/store";
import { setSearchTerm } from "../../../../features/search/searchSlice";

/**
 * A search bar component that allows users to input search queries.
 * @returns The rendered search bar component.
 */
const Searchbar = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();

  const handleChange: ChangeEventHandler<HTMLInputElement> | undefined = (
    e,
  ) => {
    setSearchValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = useCallback(() => {
    dispatch(setSearchTerm(searchValue));
  }, [dispatch, searchValue]);

  return (
    <section className="searchbar">
      <label htmlFor="search" onClick={handleSearchSubmit}>
        <SlMagnifier className="magnifier-icon" />
      </label>
      <input
        type="search"
        name="search"
        placeholder={t("search placeholder")}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
      />
    </section>
  );
};

export default Searchbar;
