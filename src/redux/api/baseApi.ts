import type { Product } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
  tagTypes: ["Products"], // declare tag type
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: ["Products"], // query provides tag
    }),

    getProductById: builder.query<Product, number>({
      query: (id: number) => `products/${id}`,
    }),

    createProducts: builder.mutation<Product, Partial<Product>>({
      query: (productData) => ({
        url: "products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"], // invalidate to refresh getProducts
    }),

    // LOGIN
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // REGISTER
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
    }),


  }),  

});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductsMutation,
  useLoginUserMutation, useRegisterUserMutation
} = baseApi;
