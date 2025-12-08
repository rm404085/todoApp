import { useEffect, useState } from "react";
import { addToWishlist } from "@/redux/features/wishList/wishListSlice";
import { UseAppDispatch, useAppSelector } from "@/redux/hook";
import type { Product } from "@/types/types";
import { Button } from "../ui/button";
import { AddProductModal } from "./AddProductModal";
import { useGetProductsQuery } from "@/redux/endPoints/productsApi";
import RecentViewed from "./RecentView";
import { useNavigate } from "react-router";
import { addRecentView } from "@/utility/recentView";
import { toast } from "sonner";

const Products = () => {
  const { data: apiData, isLoading, error } = useGetProductsQuery();
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = UseAppDispatch();
  const wishlist = useAppSelector((state) => state.wishlist.items);
  const navigate = useNavigate();

  // Merge API data + localStorage data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("localProducts") || "[]");
    if (apiData) {
      setProducts([...saved, ...apiData]);
    }
  }, [apiData]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Delete Product
  const handleDeleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem("localProducts", JSON.stringify(updated));
    toast.success("Product deleted successfully!");
  };

  // Update Product
  const handleUpdateProduct = (product: Product) => {
    const updatedTitle = prompt("Enter new product name", product.title);
    if (!updatedTitle) return;

    const updatedProducts = products.map((p) =>
      p.id === product.id ? { ...p, title: updatedTitle } : p
    );

    setProducts(updatedProducts);
    localStorage.setItem("localProducts", JSON.stringify(updatedProducts));
    toast.success("Product updated successfully!");
  };

  if (isLoading) return <h2 className="text-center text-xl">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-600 text-xl">Error Occurred</h2>;

  return (
    <div className="px-5 py-10">
      <AddProductModal onAddProduct={handleAddProduct} />

      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {products.map((product: Product) => {
          const isAdded = wishlist.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              onClick={() => {
                addRecentView(product);
                navigate(`/products/${product.id}`);
              }}
              className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between h-full"
            >
              <div className="flex flex-col gap-2">
                <div className="w-full h-56 flex items-center justify-center overflow-hidden bg-gray-100 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full object-contain p-4"
                  />
                </div>

                <p className="mt-3 inline-block text-xs bg-amber-200 text-amber-700 px-3 py-1 rounded-full capitalize">
                  {product.category}
                </p>

                <h3 className="mt-3 text-lg font-semibold line-clamp-2">
                  {product.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {product.description}
                </p>

                <p className="mt-3 text-xl font-bold text-amber-600">
                  ${product.price}
                </p>
              </div>

              <div className="flex gap-2 mt-5">
                <Button
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateProduct(product);
                  }}
                >
                  Update
                </Button>

                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProduct(product.id);
                  }}
                >
                  Delete
                </Button>
              </div>

              <Button
                disabled={isAdded}
                className={`w-full mt-2 font-medium transition-all
                  ${isAdded
                    ? "bg-green-500 hover:bg-green-500 text-white cursor-not-allowed"
                    : "bg-amber-400 hover:bg-amber-500 text-black"
                  }`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addToWishlist(product));
                }}
              >
                {isAdded ? "💚 Added to Wishlist" : "❤️ Add to Wishlist"}
              </Button>
            </div>
          );
        })}
      </div>

      <div>
        <RecentViewed />
      </div>
    </div>
  );
};

export default Products;
