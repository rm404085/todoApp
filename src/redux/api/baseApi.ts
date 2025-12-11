import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  tagTypes: ["Products", "Users", "Bookings"],
  endpoints: () => ({}), // endpoints will be injected
});
