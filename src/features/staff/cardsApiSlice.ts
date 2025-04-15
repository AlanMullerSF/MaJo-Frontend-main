import { apiSlice } from "../../api/apiSlice";
import { ICard } from "../../types";

/**
 * Creates an API slice for managing card data.
 * @param {ApiSliceOptions} options - The options for configuring the API slice.
 * @returns {ApiSlice} - The created API slice.
 */
export const cardsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    generalCards: builder.query<ICard[], void>({
      query: () => ({
        url: "/cards/general",
        method: "GET",
      }),
    }),
    complimentaryInfoCards: builder.query<ICard[], void>({
      query: () => ({
        url: "/cards/complimentary_info",
        method: "GET",
      }),
    }),
    personalInfoCards: builder.query<ICard[], void>({
      query: () => ({
        url: "/cards/personal_info",
        method: "GET",
      }),
    }),
    diagnosticsAndAilmentsCards: builder.query<ICard[], void>({
      query: () => ({
        url: "/cards/diagnostics_ailments",
        method: "GET",
      }),
    }),
    schoolingCards: builder.query<ICard[], void>({
      query: () => ({
        url: "/cards/scholarship",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useComplimentaryInfoCardsQuery,
  useDiagnosticsAndAilmentsCardsQuery,
  useGeneralCardsQuery,
  usePersonalInfoCardsQuery,
  useSchoolingCardsQuery,
} = cardsSlice;
