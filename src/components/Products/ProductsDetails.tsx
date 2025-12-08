import { useParams } from "react-router-dom";

import { addRecentView } from "@/utility/recentView";
import type { Product } from "@/types/types";
import { useGetProductByIdQuery } from "@/redux/endPoints/productsApi";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  // id null হলে 0 বা NaN হয়ে যাওয়ার সম্ভাবনা রোধ
  const productId = id ? Number(id) : undefined;

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId!, {
    skip: productId === undefined,
  });

  // Save to recently viewed (safe check)
  if (product) {
    addRecentView(product as Product);
  }

  if (isLoading)
    return <h2 className="text-center text-lg">Loading...</h2>;

  if (error || !product)
    return (
      <h2 className="text-center text-red-600">
        Product Not Found!
      </h2>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">

        {/* Image */}
        <div className="flex-1 bg-gray-100 rounded-xl flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-64 h-64 object-contain p-5"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <p className="text-sm text-gray-500 capitalize">
            {product.category}
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {product.title}
          </h2>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <h3 className="text-3xl font-bold text-amber-600 mt-5">
            ${product.price}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
