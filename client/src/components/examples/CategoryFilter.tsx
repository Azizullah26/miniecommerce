import { useState } from 'react';
import { CategoryFilter } from '../CategoryFilter';

export default function CategoryFilterExample() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Electronics", "Accessories", "Home & Living", "Sports & Fitness"];

  return (
    <CategoryFilter
      categories={categories}
      selectedCategory={selectedCategory}
      searchQuery={searchQuery}
      onCategoryChange={setSelectedCategory}
      onSearchChange={setSearchQuery}
    />
  );
}
