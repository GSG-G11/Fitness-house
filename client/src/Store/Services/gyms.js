import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gymsApi = createApi({
  reducerPath: "gyms",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/gyms",
  }),
  endpoints: (builder) => ({
    getTopGyms: builder.query({
      query: () => `/top`,
    }),
    getGymData: builder.query({
      query: (id) => `/${id}`,
    }),
    // getFilterData: builder.query({
    //   query: (query) => `/filter?${query}`,
    // }),
  }),
});

export const { useGetTopGymsQuery, useGetGymDataQuery } = gymsApi;
