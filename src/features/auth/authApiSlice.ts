import { apiSlice } from "../../api/apiSlice";

/**
 * Injects endpoints for the authentication API into the API slice.
 * @param {object} apiSlice - The API slice object.
 * @returns None
 */
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/authenticate",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
