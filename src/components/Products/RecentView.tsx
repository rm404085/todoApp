import type { Product } from "@/types/types";
import { getRecentView } from "@/utility/recentView";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const RecentViewed = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(getRecentView());
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-5">Recently Viewed</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {items.map((product : Product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer bg-white border rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={product.image}
              className="w-full h-32 object-contain mb-3"
            />
            <p className="text-sm line-clamp-2">{product.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentViewed;
