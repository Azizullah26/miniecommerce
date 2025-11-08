import { ProductCard } from "../ProductCard"

export default function ProductCardExample() {
  const sampleProduct = {
    id: 1,
    name: "Wireless Bluetooth Speaker",
    price: 79.99,
    category: "Electronics",
    stock_status: "In Stock" as const,
    image: "/placeholder.svg?height=300&width=300",
  }

  return <ProductCard product={sampleProduct} />
}
