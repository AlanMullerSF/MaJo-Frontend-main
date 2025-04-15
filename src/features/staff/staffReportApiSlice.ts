import { apiSlice } from "../../api/apiSlice";
import {
  TableResponse,
  IGeneral,
  IPersonalInfo,
  IComplementaryInfo,
  IDiagnosesAndAilments,
  ISchooling,
  IParentsTutors,
  IStaff,
} from "../../types";
import { FiltersStore } from "../filters/filtersSlice";

/**
 * Injects endpoints for the staff report slice using the provided API slice.
 * @param {ApiSlice} apiSlice - The API slice to inject endpoints into.
 * @returns None
 */
export const staffReportSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generalReport: builder.query<
      TableResponse<IGeneral[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        pageSize: number | undefined;
      }
    >({
      query: ({ pageSize, ...options }) => ({
        url: "/general",
        method: "PUT",
        params: pageSize
          ? {
              pageSize,
            }
          : {},
        body: {
          nameLastName: options.searchTerm,
          ...Object.assign(
            {},
            {
              ...options.filters,
              sex:
                options.filters.sex === undefined
                  ? undefined
                  : `${options.filters.sex}`,
              specialEducation:
                options.filters.specialEducation === undefined
                  ? undefined
                  : `${options.filters.specialEducation}`,
              studying:
                options.filters.studying === undefined
                  ? undefined
                  : `${options.filters.studying}`,
              geneticDiagnosis:
                options.filters.geneticDiagnosis === undefined
                  ? undefined
                  : `${options.filters.geneticDiagnosis}`,
              requiresGrowthHormone:
                options.filters.requiresGrowthHormone === undefined
                  ? undefined
                  : `${options.filters.requiresGrowthHormone}`,
            },
          ),
        },
      }),
    }),
    personalInfoReport: builder.query<
      TableResponse<IPersonalInfo[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        pageSize: number | undefined;
      }
    >({
      query: ({ pageSize, ...options }) => ({
        url: "/personal_info",
        method: "PUT",
        params: pageSize
          ? {
              pageSize,
            }
          : {},
        body: {
          nameLastName: options.searchTerm,
          ...Object.assign(
            {},
            {
              ...options.filters,
              sex:
                options.filters.sex === undefined
                  ? undefined
                  : `${options.filters.sex}`,
              specialEducation:
                options.filters.specialEducation === undefined
                  ? undefined
                  : `${options.filters.specialEducation}`,
              studying:
                options.filters.studying === undefined
                  ? undefined
                  : `${options.filters.studying}`,
              geneticDiagnosis:
                options.filters.geneticDiagnosis === undefined
                  ? undefined
                  : `${options.filters.geneticDiagnosis}`,
              requiresGrowthHormone:
                options.filters.requiresGrowthHormone === undefined
                  ? undefined
                  : `${options.filters.requiresGrowthHormone}`,
            },
          ),
        },
      }),
    }),
    complimentaryInfoReport: builder.query<
      TableResponse<IComplementaryInfo[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        pageSize: number | undefined;
      }
    >({
      query: ({ pageSize, ...options }) => ({
        url: "/complimentary_info",
        method: "PUT",
        params: pageSize
          ? {
              pageSize,
            }
          : {},
        body: {
          nameLastName: options.searchTerm,
          ...Object.assign(
            {},
            {
              ...options.filters,
              sex:
                options.filters.sex === undefined
                  ? undefined
                  : `${options.filters.sex}`,
              specialEducation:
                options.filters.specialEducation === undefined
                  ? undefined
                  : `${options.filters.specialEducation}`,
              studying:
                options.filters.studying === undefined
                  ? undefined
                  : `${options.filters.studying}`,
              geneticDiagnosis:
                options.filters.geneticDiagnosis === undefined
                  ? undefined
                  : `${options.filters.geneticDiagnosis}`,
              requiresGrowthHormone:
                options.filters.requiresGrowthHormone === undefined
                  ? undefined
                  : `${options.filters.requiresGrowthHormone}`,
            },
          ),
        },
      }),
    }),
    diagnosticsAilmentsReport: builder.query<
      TableResponse<IDiagnosesAndAilments[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        pageSize: number | undefined;
      }
    >({
      query: ({ pageSize, ...options }) => ({
        url: "/diagnostics_ailments",
        method: "PUT",
        params: pageSize
          ? {
              pageSize,
            }
          : {},
        body: {
          nameLastName: options.searchTerm,
          ...Object.assign(
            {},
            {
              ...options.filters,
              sex:
                options.filters.sex === undefined
                  ? undefined
                  : `${options.filters.sex}`,
              specialEducation:
                options.filters.specialEducation === undefined
                  ? undefined
                  : `${options.filters.specialEducation}`,
              studying:
                options.filters.studying === undefined
                  ? undefined
                  : `${options.filters.studying}`,
              geneticDiagnosis:
                options.filters.geneticDiagnosis === undefined
                  ? undefined
                  : `${options.filters.geneticDiagnosis}`,
              requiresGrowthHormone:
                options.filters.requiresGrowthHormone === undefined
                  ? undefined
                  : `${options.filters.requiresGrowthHormone}`,
            },
          ),
        },
      }),
    }),
    schoolingReport: builder.query<
      TableResponse<ISchooling[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        pageSize: number | undefined;
      }
    >({
      query: ({ pageSize, ...options }) => ({
        url: "/scholarship",
        method: "PUT",
        params: pageSize
          ? {
              pageSize,
            }
          : {},
        body: {
          nameLastName: options.searchTerm,
          ...Object.assign(
            {},
            {
              ...options.filters,
              sex:
                options.filters.sex === undefined
                  ? undefined
                  : `${options.filters.sex}`,
              specialEducation:
                options.filters.specialEducation === undefined
                  ? undefined
                  : `${options.filters.specialEducation}`,
              studying:
                options.filters.studying === undefined
                  ? undefined
                  : `${options.filters.studying}`,
              geneticDiagnosis:
                options.filters.geneticDiagnosis === undefined
                  ? undefined
                  : `${options.filters.geneticDiagnosis}`,
              requiresGrowthHormone:
                options.filters.requiresGrowthHormone === undefined
                  ? undefined
                  : `${options.filters.requiresGrowthHormone}`,
            },
          ),
        },
      }),
    }),
    tutorsReport: builder.query<
      TableResponse<IParentsTutors[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        pageSize: number | undefined;
      }
    >({
      query: ({ pageSize, ...options }) => ({
        url: "/tutors",
        method: "PUT",
        params: pageSize
          ? {
              pageSize,
            }
          : {},
        body: {
          nameLastName: options.searchTerm,
          ...Object.assign(
            {},
            {
              ...options.filters,
              sex:
                options.filters.sex === undefined
                  ? undefined
                  : `${options.filters.sex}`,
              specialEducation:
                options.filters.specialEducation === undefined
                  ? undefined
                  : `${options.filters.specialEducation}`,
              studying:
                options.filters.studying === undefined
                  ? undefined
                  : `${options.filters.studying}`,
              geneticDiagnosis:
                options.filters.geneticDiagnosis === undefined
                  ? undefined
                  : `${options.filters.geneticDiagnosis}`,
              requiresGrowthHormone:
                options.filters.requiresGrowthHormone === undefined
                  ? undefined
                  : `${options.filters.requiresGrowthHormone}`,
            },
          ),
        },
      }),
    }),
    getStaffReport: builder.query<
      TableResponse<IStaff[]>,
      { searchTerm: string; pageSize: number | undefined }
    >({
      query: ({ searchTerm, pageSize }) => ({
        url: "/staff",
        method: "PUT",
        params: pageSize
          ? {
              pageSize,
            }
          : {},
        body: {
          nameLastName: searchTerm,
        },
      }),
    }),
  }),
});

export const {
  useGeneralReportQuery,
  useComplimentaryInfoReportQuery,
  useDiagnosticsAilmentsReportQuery,
  useGetStaffReportQuery,
  usePersonalInfoReportQuery,
  useSchoolingReportQuery,
  useTutorsReportQuery,
} = staffReportSlice;
