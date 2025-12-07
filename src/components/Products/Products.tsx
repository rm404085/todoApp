import { useGetProductsQuery } from "@/redux/api/baseApi";
import { addToWishlist } from "@/redux/features/wishList/wishListSlice";
import { UseAppDispatch, useAppSelector } from "@/redux/hook";
import type { Product } from "@/types/types";
import { Button } from "../ui/button";
import { AddProductModal } from "./AddProductModal";

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const dispatch = UseAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);

  if (isLoading) return <h2 className="text-center text-xl">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-600 text-xl">Error Occurred</h2>;

  return (
    <div className="px-5 py-10">
      <AddProductModal />

      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {data?.map((product: Product) => {
          const isAdded = wishlist.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between h-full"
            >
              <div className="flex flex-col gap-2">
                {/* Image */}
                <div className="w-full h-56 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full object-contain p-4"
                  />
                </div>

                {/* Category */}
                <p className="mt-3 inline-block text-xs bg-amber-200 text-amber-700 px-3 py-1 rounded-full capitalize">
                  {product.category}
                </p>

                {/* Title */}
                <h3 className="mt-3 text-lg font-semibold line-clamp-2">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>

                {/* Price */}
                <p className="mt-3 text-xl font-bold text-amber-600">
                  ${product.price}
                </p>
              </div>

              {/* Wishlist Button */}
              <Button
                disabled={isAdded}
                className={`w-full mt-5 font-medium transition-all
                  ${isAdded
                    ? "bg-green-500 hover:bg-green-500 text-white cursor-not-allowed"
                    : "bg-amber-400 hover:bg-amber-500 text-black"
                  }`}
                onClick={() => dispatch(addToWishlist(product))}
              >
                {isAdded ? "💚 Added to Wishlist" : "❤️ Add to Wishlist"}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
