import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gymsApi = createApi({
  reducerPath: "gyms",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getTopGyms: builder.query({
      query: () => `/gyms/top`,
    }),
  }),
});

export const { useGetTopGymsQuery } = gymsApi;
