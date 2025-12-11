import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAddBookingsMutation, useDeleteBookingsMutation, useGetBookingsQuery } from "@/redux/endPoints/bookingsApi";
import { removeBookingLocally, saveBookingLocally } from "@/redux/features/bookingsSlice/bookingsSlice";
import { UseAppDispatch, useAppSelector } from "@/redux/hook";
import type { Booking } from "@/types/types";

const DashboardBookings: React.FC = () => {
  const dispatch = UseAppDispatch();
  const { data: bookingsFromApi = [], isLoading, error } = useGetBookingsQuery();
  const [addBooking] = useAddBookingsMutation();
  const [deleteBooking] = useDeleteBookingsMutation();

  const localBookings = useAppSelector((state) => state.bookings.saved);

  // Local state for merged bookings to trigger re-render
  const [mergedBookings, setMergedBookings] = useState<Booking[]>([]);

  // Merge API + local bookings whenever either changes
  useEffect(() => {
    const uniqueApiBookings = bookingsFromApi.filter(
      (b) => !localBookings.some((lb) => lb.id === b.id)
    );

    setMergedBookings([...localBookings, ...uniqueApiBookings]);
  }, [bookingsFromApi, localBookings]);

  const handleAddBooking = async (productId: number) => {
    try {
      const res = await addBooking(productId).unwrap();
      dispatch(saveBookingLocally(res)); // update local slice
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteBooking = async (id: number) => {
    try {
      await deleteBooking(id).unwrap();
      dispatch(removeBookingLocally(id)); // remove from local slice
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <Button
        onClick={() => handleAddBooking(3)}
        className="btn btn-primary mb-4"
      >
        Add Booking
      </Button>

      <div className="space-y-3">
        {mergedBookings.map((booking, idx) => (
          <div key={`${booking.id}-${idx}`} className="border p-4 rounded-lg shadow">
            <h2 className="font-bold">Booking ID: {booking.id}</h2>
            <p>User: {booking.userId}</p>
            <p>Date: {booking.date}</p>

            <h3 className="font-bold mt-2">Products:</h3>
            {booking.products.map((p) => (
              <p key={`${p.productId}-${idx}`}>Product {p.productId} - Qty: {p.quantity}</p>
            ))}

            <Button
              onClick={() => handleDeleteBooking(booking.id)}
              className="btn btn-error btn-sm mt-2"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBookings;
