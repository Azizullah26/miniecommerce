import { useState, useMemo } from "react";
import { ProductCard, type Product } from "@/components/ProductCard";
import { AddProductDialog } from "@/components/AddProductDialog";
import { Pagination } from "@/components/Pagination";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EmptyState } from "@/components/EmptyState";

import speakerImg from '@assets/generated_images/Wireless_Bluetooth_Speaker_3b6ef110.png';
import bagImg from '@assets/generated_images/Premium_Leather_Laptop_Bag_203b5f04.png';
import bottleImg from '@assets/generated_images/Insulated_Water_Bottle_6925d43d.png';
import mouseImg from '@assets/generated_images/Wireless_Ergonomic_Mouse_d0fd5f91.png';
import lampImg from '@assets/generated_images/Modern_Desk_Lamp_cf446b18.png';
import trackerImg from '@assets/generated_images/Smart_Fitness_Tracker_1984b2cc.png';

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Bluetooth Speaker",
      price: 79.99,
      category: "Electronics",
      stock_status: "In Stock",
      image: speakerImg,
    },
    {
      id: 2,
      name: "Premium Leather Laptop Bag",
      price: 129.99,
      category: "Accessories",
      stock_status: "In Stock",
      image: bagImg,
    },
    {
      id: 3,
      name: "Insulated Water Bottle",
      price: 24.99,
      category: "Home & Living",
      stock_status: "Low Stock",
      image: bottleImg,
    },
    {
      id: 4,
      name: "Wireless Ergonomic Mouse",
      price: 49.99,
      category: "Electronics",
      stock_status: "In Stock",
      image: mouseImg,
    },
    {
      id: 5,
      name: "Modern Desk Lamp",
      price: 89.99,
      category: "Home & Living",
      stock_status: "In Stock",
      image: lampImg,
    },
    {
      id: 6,
      name: "Smart Fitness Tracker",
      price: 149.99,
      category: "Sports & Fitness",
      stock_status: "Out of Stock",
      image: trackerImg,
    },
    {
      id: 7,
      name: "Noise Cancelling Headphones",
      price: 199.99,
      category: "Electronics",
      stock_status: "In Stock",
    },
    {
      id: 8,
      name: "Portable Phone Charger",
      price: 39.99,
      category: "Electronics",
      stock_status: "Low Stock",
    },
    {
      id: 9,
      name: "Yoga Mat Pro",
      price: 59.99,
      category: "Sports & Fitness",
      stock_status: "In Stock",
    },
    {
      id: 10,
      name: "Stainless Steel Coffee Mug",
      price: 19.99,
      category: "Home & Living",
      stock_status: "In Stock",
    },
    {
      id: 11,
      name: "Wireless Keyboard",
      price: 69.99,
      category: "Electronics",
      stock_status: "In Stock",
    },
    {
      id: 12,
      name: "Running Shoes",
      price: 119.99,
      category: "Sports & Fitness",
      stock_status: "Low Stock",
    },
  ]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);

  const handleAddProduct = (productData: any) => {
    const newProduct: Product = {
      id: products.length + 1,
      name: productData.name,
      price: parseFloat(productData.price),
      category: productData.category,
      stock_status: productData.stock_status,
    };
    setProducts([newProduct, ...products]);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">
              Products
            </h1>
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <AddProductDialog onAddProduct={handleAddProduct} />
        </div>

        <div className="mb-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
          />
        </div>

        {paginatedProducts.length === 0 ? (
          <EmptyState
            message={
              searchQuery || selectedCategory !== "all"
                ? "No products match your filters. Try adjusting your search or category."
                : "No products yet. Add your first product to get started."
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
