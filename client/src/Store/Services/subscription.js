import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subscriptionsApi = createApi({
  reducerPath: "subscriptions",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => `/subscriptions`,
    }),
  }),
});

export const { useGetSubscriptionsQuery } = subscriptionsApi;
