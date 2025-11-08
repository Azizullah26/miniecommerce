import { useState, useMemo } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ProductCard, type Product } from "@/components/ProductCard";
import { AddProductDialog } from "@/components/AddProductDialog";
import { Pagination } from "@/components/Pagination";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EmptyState } from "@/components/EmptyState";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import speakerImg from '@assets/generated_images/Wireless_Bluetooth_Speaker_3b6ef110.png';
import bagImg from '@assets/generated_images/Premium_Leather_Laptop_Bag_203b5f04.png';
import bottleImg from '@assets/generated_images/Insulated_Water_Bottle_6925d43d.png';
import mouseImg from '@assets/generated_images/Wireless_Ergonomic_Mouse_d0fd5f91.png';
import lampImg from '@assets/generated_images/Modern_Desk_Lamp_cf446b18.png';
import trackerImg from '@assets/generated_images/Smart_Fitness_Tracker_1984b2cc.png';

const productImages: Record<string, string> = {
  "Wireless Bluetooth Speaker": speakerImg,
  "Premium Leather Laptop Bag": bagImg,
  "Insulated Water Bottle": bottleImg,
  "Wireless Ergonomic Mouse": mouseImg,
  "Modern Desk Lamp": lampImg,
  "Smart Fitness Tracker": trackerImg,
};

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data, isLoading } = useQuery<{ products: Product[]; total: number }>({
    queryKey: ['/api/products', { 
      category: selectedCategory, 
      search: searchQuery,
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
    }],
  });

  const { data: allCategories = [] } = useQuery<string[]>({
    queryKey: ['/api/categories'],
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      return await apiRequest("POST", "/api/products", {
        name: productData.name,
        price: parseFloat(productData.price),
        category: productData.category,
        stock_status: productData.stock_status,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      toast({
        title: "Success",
        description: "Product added successfully",
      });
      setCurrentPage(1);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add product",
        variant: "destructive",
      });
    },
  });

  const products = useMemo(() => {
    if (!data?.products) return [];
    return data.products.map(product => ({
      ...product,
      image: productImages[product.name],
    }));
  }, [data?.products]);

  const totalPages = Math.ceil((data?.total || 0) / pageSize);

  const handleAddProduct = (productData: any) => {
    createProductMutation.mutate(productData);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2" data-testid="text-page-title">
              Products
            </h1>
            <p className="text-sm text-muted-foreground">
              Showing {data?.total || 0} product{data?.total !== 1 ? 's' : ''}
            </p>
          </div>
          <AddProductDialog onAddProduct={handleAddProduct} />
        </div>

        <div className="mb-6">
          <CategoryFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onCategoryChange={handleCategoryChange}
            onSearchChange={handleSearchChange}
          />
        </div>

        {products.length === 0 ? (
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
              {products.map((product) => (
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
