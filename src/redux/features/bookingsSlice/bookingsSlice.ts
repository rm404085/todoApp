import type { Booking } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


interface BookingState {
  saved: Booking[];
}

const initialState: BookingState = {
  saved: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    saveBookingLocally: (state, action: PayloadAction<Booking>) => {
      state.saved.push(action.payload);
    },
    removeBookingLocally: (state, action: PayloadAction<number>) => {
      state.saved = state.saved.filter((b) => b.id !== action.payload);
    },
  },
});

export const { saveBookingLocally, removeBookingLocally } = bookingSlice.actions;
export default bookingSlice.reducer;
