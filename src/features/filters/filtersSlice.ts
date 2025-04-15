import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type FiltersStore = {
  filters: {
    sex: boolean | undefined;
    state: string;
    levelOfEducation: string;
    specialEducation: boolean | undefined;
    studying: boolean | undefined;
    geneticDiagnosis: boolean | undefined;
    typeOfDiagnosis: string;
    requiresGrowthHormone: boolean | undefined;
    ailments: string;
    socialSecurityRegime: string;
  };
  filtersToSend: {
    sex: boolean | undefined;
    state: string;
    levelOfEducation: string;
    specialEducation: boolean | undefined;
    studying: boolean | undefined;
    geneticDiagnosis: boolean | undefined;
    typeOfDiagnosis: string;
    requiresGrowthHormone: boolean | undefined;
    ailments: string;
    socialSecurityRegime: string;
  };
  sorting: {
    sortList: string;
    sortOrder: "DESC" | "ASC";
  };
  usersToSendEmail: string[] | [];
};

export const initialState: FiltersStore = {
  filters: {
    sex: undefined,
    state: "",
    levelOfEducation: "",
    specialEducation: undefined,
    studying: undefined,
    geneticDiagnosis: undefined,
    typeOfDiagnosis: "",
    requiresGrowthHormone: undefined,
    ailments: "",
    socialSecurityRegime: "",
  },
  filtersToSend: {
    sex: undefined,
    state: "",
    levelOfEducation: "",
    specialEducation: undefined,
    studying: undefined,
    geneticDiagnosis: undefined,
    typeOfDiagnosis: "",
    requiresGrowthHormone: undefined,
    ailments: "",
    socialSecurityRegime: "",
  },
  sorting: {
    sortList: "",
    sortOrder: "DESC",
  },
  usersToSendEmail: [],
};

/**
 * Creates a Redux slice for managing the "filters" state.
 * @param {object} initialState - The initial state of the "filters" slice.
 * @param {object} reducers - An object containing the reducer functions for the "filters" slice.
 * @returns A Redux slice object.
 */
const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (currState, action) => {
      const {
        sex,
        state,
        levelOfEducation,
        specialEducation,
        studying,
        geneticDiagnosis,
        typeOfDiagnosis,
        requiresGrowthHormone,
        ailments,
        socialSecurityRegime,
      } = action.payload;
      currState.filters.sex = sex;
      currState.filters.state = state;
      currState.filters.levelOfEducation = levelOfEducation;
      currState.filters.specialEducation = specialEducation;
      currState.filters.studying = studying;
      currState.filters.geneticDiagnosis = geneticDiagnosis;
      currState.filters.typeOfDiagnosis = typeOfDiagnosis;
      currState.filters.requiresGrowthHormone = requiresGrowthHormone;
      currState.filters.ailments = ailments;
      currState.filters.socialSecurityRegime = socialSecurityRegime;
    },
    setFiltersToSend: (currState, action) => {
      const {
        sex,
        state,
        levelOfEducation,
        specialEducation,
        studying,
        geneticDiagnosis,
        typeOfDiagnosis,
        requiresGrowthHormone,
        ailments,
        socialSecurityRegime,
      } = action.payload;
      currState.filtersToSend.sex = sex;
      currState.filtersToSend.state = state;
      currState.filtersToSend.levelOfEducation = levelOfEducation;
      currState.filtersToSend.specialEducation = specialEducation;
      currState.filtersToSend.studying = studying;
      currState.filtersToSend.geneticDiagnosis = geneticDiagnosis;
      currState.filtersToSend.typeOfDiagnosis = typeOfDiagnosis;
      currState.filtersToSend.requiresGrowthHormone = requiresGrowthHormone;
      currState.filtersToSend.ailments = ailments;
      currState.filtersToSend.socialSecurityRegime = socialSecurityRegime;
    },
    setSorting: (state, action) => {
      const { sortOrder, sortList } = action.payload;
      state.sorting.sortList = sortList;
      state.sorting.sortOrder = sortOrder;
    },
    resetSorting: (state) => {
      state.sorting.sortList = "";
      state.sorting.sortOrder = "DESC";
    },
    setUsersToSendEmail: (state, action) => {
      const ids = action.payload;
      state.usersToSendEmail = ids;
    },
  },
});

export const {
  setFilters,
  setFiltersToSend,
  setSorting,
  resetSorting,
  setUsersToSendEmail,
} = filtersSlice.actions;
export default filtersSlice.reducer;

export const selectFilters = (state: RootState) => state.filters.filters;
export const selectFiltersToSend = (state: RootState) =>
  state.filters.filtersToSend;
export const selectSorting = (state: RootState) => state.filters.sorting;
export const selectUsersToSendEmail = (state: RootState) =>
  state.filters.usersToSendEmail;
