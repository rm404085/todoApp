import type { Booking } from "@/types/types";
import { baseApi } from "../api/baseApi";

export const bookingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET: All bookings
    getBookings: builder.query<Booking[], void>({
      query: () => "carts",
      providesTags: ["Bookings"],
    }),

    // POST: Add booking
    addBookings: builder.mutation<Booking, number>({
      query: (productId) => ({
        url: "carts",
        method: "POST",
        body: {
          userId: 14,
          date: new Date(),
          products: [{ productId, quantity: 1 }],
        },
        
      }),
      invalidatesTags: ["Bookings"], // auto-refetch getBookings
    }),

    // DELETE: Delete booking
    deleteBookings: builder.mutation<void, number>({
      query: (id) => ({
        url: `carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bookings"], // auto-refetch getBookings
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useAddBookingsMutation,
  useDeleteBookingsMutation,
} = bookingsApi;
