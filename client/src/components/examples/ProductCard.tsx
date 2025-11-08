import { ProductCard } from '../ProductCard';
import speakerImg from '@assets/generated_images/Wireless_Bluetooth_Speaker_3b6ef110.png';

export default function ProductCardExample() {
  const sampleProduct = {
    id: 1,
    name: "Wireless Bluetooth Speaker",
    price: 79.99,
    category: "Electronics",
    stock_status: 'In Stock' as const,
    image: speakerImg
  };

  return <ProductCard product={sampleProduct} />;
}
