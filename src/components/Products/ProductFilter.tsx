import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterProps {
  onFilter: (filters: {
    search: string;
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
}

export default function ProductFilter({ onFilter }: FilterProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleApply = () => {
    onFilter({ search, category, minPrice, maxPrice });
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow mb-6 space-y-4">

      <h2 className="text-lg font-bold">Filter Products</h2>

      {/* Search */}
      <Input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category */}
      <Input
        placeholder="Category (e.g. electronics)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {/* Price Range */}
      <div className="flex gap-3">
        <Input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
        />
        <Input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </div>

      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={handleApply}>
        Apply Filter
      </Button>
    </div>
  );
}
