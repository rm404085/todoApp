import type { Product } from '@/types/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
    endpoints: (builder) => ({

        getProducts: builder.query<Product[], void>({
            query: () => "products"
        }),

      
        getProductById: builder.query<Product[], void>({
            query: (id) => `products/${id}`
        }),

    }),
})

export const { useGetProductsQuery, useGetProductByIdQuery } = baseApi;
