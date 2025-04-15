import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState: {
  searchTerm: string;
} = {
  searchTerm: "",
};

/**
 * Creates a Redux slice for managing the search state.
 * @param {object} options - The options for creating the slice.
 * @param {string} options.name - The name of the slice.
 * @param {object} options.initialState - The initial state of the slice.
 * @param {object} options.reducers - The reducers for the slice.
 * @returns A Redux slice object.
 */
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      const searchTerm = action.payload;
      state.searchTerm = searchTerm;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;

export const selectCurrentSearchTerm = (state: RootState) =>
  state.search.searchTerm;
