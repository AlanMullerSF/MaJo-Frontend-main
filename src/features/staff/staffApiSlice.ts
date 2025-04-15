import { apiSlice } from "../../api/apiSlice";
import {
  IBeneficiary,
  IComplementaryInfo,
  IDiagnosesAndAilments,
  IGeneral,
  IParentsTutors,
  IPersonalInfo,
  ISchooling,
  IStaff,
  ITutor,
  TableResponse,
} from "../../types";
import { FiltersStore } from "../filters/filtersSlice";

// TODO separate staff api slice into different api slices so that file is not that large

/**
 * A collection of API endpoints for managing staff data.
 * @param {ApiEndpointBuilder} builder - The builder object for defining API endpoints.
 * @returns An object containing the defined API endpoints.
 */
export const staffSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    personalInfo: builder.query<
      TableResponse<IPersonalInfo[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        sorting: FiltersStore["sorting"];
        pageNo: number | undefined;
      }
    >({
      query: (options) => ({
        url: "/personal_info",
        method: "PUT",
        params: {
          ...Object.assign({}, options.sorting),
          pageSize: options.pageNo ? options.pageNo : "10",
        },
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
    general: builder.query<
      TableResponse<IGeneral[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        sorting: FiltersStore["sorting"];
        pageNo: number | undefined;
      }
    >({
      query: (options) => ({
        url: "/general",
        method: "PUT",
        params: {
          ...Object.assign({}, options.sorting),
          pageSize: options.pageNo ? options.pageNo : "10",
        },
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
    complimentaryInfo: builder.query<
      TableResponse<IComplementaryInfo[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        sorting: FiltersStore["sorting"];
        pageNo: number | undefined;
      }
    >({
      query: (options) => ({
        url: "/complimentary_info",
        method: "PUT",
        params: {
          ...Object.assign({}, options.sorting),
          pageSize: options.pageNo ? options.pageNo : "10",
        },
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
    diagnosticsAilments: builder.query<
      TableResponse<IDiagnosesAndAilments[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        sorting: FiltersStore["sorting"];
        pageNo: number | undefined;
      }
    >({
      query: (options) => ({
        url: "/diagnostics_ailments",
        method: "PUT",
        params: {
          ...Object.assign({}, options.sorting),
          pageSize: options.pageNo ? options.pageNo : "10",
        },
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
    schooling: builder.query<
      TableResponse<ISchooling[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        sorting: FiltersStore["sorting"];
        pageNo: number | undefined;
      }
    >({
      query: (options) => ({
        url: "/scholarship",
        method: "PUT",
        params: {
          ...Object.assign({}, options.sorting),
          pageSize: options.pageNo ? options.pageNo : "10",
        },
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
    tutors: builder.query<
      TableResponse<IParentsTutors[]>,
      {
        searchTerm: string;
        filters: FiltersStore["filtersToSend"];
        sorting: FiltersStore["sorting"];
        pageNo: number | undefined;
      }
    >({
      query: (options) => ({
        url: "/tutors",
        method: "PUT",
        params: {
          ...Object.assign({}, options.sorting),
          pageSize: options.pageNo ? options.pageNo : "10",
        },
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
    getSingleBeneficiary: builder.query<IBeneficiary, string>({
      query: (curp: string) => ({
        url: `/beneficiary/${curp}`,
        method: "GET",
      }),
    }),
    updateBeneficiary: builder.mutation({
      query: (body: IBeneficiary) => ({
        url: `/beneficiary/${body.curp}`,
        method: "PUT",
        body,
      }),
    }),
    removeBeneficiary: builder.mutation({
      query: (curp: string) => ({
        url: `/beneficiary/${curp}`,
        method: "DELETE",
      }),
    }),
    getSingleTutor: builder.query<ITutor, string>({
      query: (email) => ({
        url: `/tutors/${email}`,
        method: "GET",
      }),
    }),
    updateTutor: builder.mutation({
      query: (body: ITutor) => ({
        url: `/tutors/${body.email}`,
        method: "PUT",
        body,
      }),
    }),
    getStaff: builder.query<
      TableResponse<IStaff[]>,
      {
        searchTerm: string;
        sorting: FiltersStore["sorting"];
        pageNo: number | undefined;
      }
    >({
      query: (options) => ({
        url: "/staff",
        method: "PUT",
        params: {
          ...Object.assign({}, options.sorting),
          pageSize: options.pageNo ? options.pageNo : "10",
        },
        body: {
          nameLastName: options.searchTerm,
        },
      }),
    }),
    getSingleStaff: builder.query<IStaff, string>({
      query: (email) => ({
        url: `/staff/${email}`,
        method: "GET",
      }),
    }),
    createStaff: builder.mutation({
      query: (body: IStaff) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    updateStaff: builder.mutation({
      query: (body: IStaff) => ({
        url: "auth/staff/update",
        method: "PUT",
        body,
      }),
    }),
    removeStaff: builder.mutation({
      query: (email: string) => ({
        url: `/staff/${email}`,
        method: "DELETE",
      }),
    }),

    sendEmail: builder.mutation({
      query: (body: { subject: string; recipients: string; body: string }) => ({
        url: "/sendEmail",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useComplimentaryInfoQuery,
  useDiagnosticsAilmentsQuery,
  useGeneralQuery,
  useGetSingleBeneficiaryQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useUpdateBeneficiaryMutation,
  useUpdateTutorMutation,
  useGetStaffQuery,
  useRemoveStaffMutation,
  useRemoveBeneficiaryMutation,
  useSchoolingQuery,
  useTutorsQuery,
  usePersonalInfoQuery,
  useGetSingleStaffQuery,
  useGetSingleTutorQuery,
  useSendEmailMutation,
} = staffSlice;
