import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionsApi = createApi({
  reducerPath: "subscriptions",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/gym",
  }),
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => `/subscription`,
    }),
  }),
});

export const { useGetSubscriptionsQuery } = subscriptionsApi;
