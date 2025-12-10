import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "@/redux/endPoints/productsApi";
import type { Product } from "@/types/types";
import React, { useState } from "react";



const DashboardProducts: React.FC = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{ title: string; price: number; category: string }>({ title: "", price: 0, category: "" });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products!</p>;
const handleEdit = (product: Product) => {
  setEditingId(product.id);
  setFormData({
    title: product.title ?? "",          // default empty string
    price: product.price ?? 0,           // default 0
    category: product.category ?? "",    // default empty string
  });
};
const handleUpdate = async () => {
  if (editingId !== null) {
    await updateProduct({ id: editingId, ...formData });
    setEditingId(null);
    refetch(); // Fakestore API হলো fake, তাই refresh করা লাগবে
  }
};


const handleDelete = async (id: number) => {
  if (window.confirm("Are you sure?")) {
    await deleteProduct(id);
    refetch(); // Refresh table
  }
};


  return (
    <div className="p-6  bg-popover-foreground text-amber-800 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Manage Products</h1>

      <table className="w-full text-left border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border border-gray-200">ID</th>
            <th className="p-3 border border-gray-200">Title</th>
            <th className="p-3 border border-gray-200">Price</th>
            <th className="p-3 border border-gray-200">Category</th>
            <th className="p-3 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: Product) => (
            <tr key={product.id}>
              <td className="p-3 border border-gray-200">{product.id}</td>
              <td className="p-3 border border-gray-200">
                {editingId === product.id ? (
                  <input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  product.title
                )}
              </td>
              <td className="p-3 border border-gray-200">
                {editingId === product.id ? (
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  `$${product.price}`
                )}
              </td>
              <td className="p-3 border border-gray-200">
                {editingId === product.id ? (
                  <input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  product.category
                )}
              </td>
              <td className="p-3 border border-gray-200">
                {editingId === product.id ? (
                  <>
                    <button
                      className="px-2 py-1 bg-green-600 text-white rounded mr-2"
                      onClick={handleUpdate}
                    >
                      Save
                    </button>
                    <button className="px-2 py-1 bg-gray-400 text-white rounded" onClick={() => setEditingId(null)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded mr-2"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardProducts;
