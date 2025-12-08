import { baseApi } from "../api/baseApi";
import type { Product } from "@/types/types";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "products",
      providesTags: ["Products"],
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: ( result, error, id) => [{ type: "Products", id }],
    }),

    createProducts: builder.mutation<Product, Partial<Product>>({
      query: (productData) => ({
        url: "products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Products"],
    }),

    // ✅ Update product
    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>({
      query: ({ id, ...data }) => ({
        url: `products/${id}`,
        method: "PUT", // fakestoreapi PUT 
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // ✅ Delete product
    deleteProduct: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

// Export hooks
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductsMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
