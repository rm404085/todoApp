import { UseAppDispatch, useAppSelector } from "@/redux/hook";
import { removeFormWishlist } from "../../redux/features/wishList/wishListSlice";
import { Button } from "@/components/ui/button";

const WishlistPage = () => {
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const dispatch = UseAppDispatch();

  return (
    <div className="px-5 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">My Wishlist ❤️</h2>

      {wishlist.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No items in wishlist.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5"
          >
            {/* Image */}
            <div className="w-full h-56 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="h-full object-contain p-4"
              />
            </div>

            {/* Category Badge */}
            <p className="mt-3 inline-block text-xs bg-amber-200 text-amber-700 px-3 py-1 rounded-full capitalize">
              {item.category}
            </p>

            {/* Title */}
            <h3 className="mt-3 text-lg font-semibold line-clamp-2">
              {item.title}
            </h3>

            {/* Price */}
            <p className="mt-2 text-xl font-bold text-amber-600">${item.price}</p>

            {/* Remove Button */}
            <Button
              className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white font-medium transition-all"
              onClick={() => dispatch(removeFormWishlist(item.id))}
            >
              ❌ Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
