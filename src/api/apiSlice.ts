import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut } from "../features/auth/authSlice";

/**
 * Determines the base URL based on the environment.
 * @param {string} baseUrl - The base URL to use in production environment.
 * @returns The base URL to use based on the current environment.
 */
const baseUrl: string = import.meta.env.PROD
  ? import.meta.env.VITE_PROD_BASE_URL
  : import.meta.env.VITE_DEV_BASE_URL;

/**
 * Creates a base query object for making API requests using fetchBaseQuery.
 * @param {string} baseUrl - The base URL for the API.
 * @returns {BaseQuery} - The base query object.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: new URL(baseUrl).href,
  mode: "cors",
  prepareHeaders: (headers, api) => {
    // headers.set("Access-Control-Allow-Origin", "*");
    // @ts-expect-error getState() is compatible
    const token = api.getState().auth.token;
    headers.set("Accept", "application/json");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

/**
 * A wrapper function for the baseQuery function that logs out the user if the token has expired.
 * @param {any} args - The arguments to pass to the baseQuery function.
 * @param {Api} api - The API object.
 * @param {any} extraOptions - Any extra options to pass to the baseQuery function.
 * @returns The result of the baseQuery function.
 */
const baseQueryLogOutOnExpiredToken: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result?.error?.status === 403 ||
    result?.error?.status === "FETCH_ERROR"
  ) {
    console.log("token expired, logging out...");
    api.dispatch(logOut());
    // redirect("/login");
  }

  return result;
};

/**
 * Creates an API slice using the given base query and endpoint configuration.
 * @param {object} baseQuery - The base query function to be used for all requests.
 * @param {function} endpoints - A function that configures the endpoints for the API slice.
 * @returns An API slice object with the configured endpoints.
 */
export const apiSlice = createApi({
  baseQuery: baseQueryLogOutOnExpiredToken,
  endpoints: (builder) => ({
    postRequest: builder.mutation({
      query: (requestData) => ({
        url: "/form/register",
        method: "POST",
        body: requestData,
      }),
    }),
  }),
});

export const { usePostRequestMutation } = apiSlice;
