
import { client } from '@/sanity/lib/client';
import { productById } from '@/sanity/lib/queries';
import ProductDetail from '../../../components/ProductDetail';
import { notFound } from 'next/navigation';



interface ProductPageProps {
  params: { id: string };
}
// Async component for fetching product details
const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  try {
    // Fetch product data from Sanity
    const product = await client.fetch(productById, { id });
    // const product: Product | null = await client.fetch(productById, { id })
    
    // If product doesn't exist, show a 404 page
    if (!product) {
      notFound();
    }
  return <ProductDetail product={product} />;
} catch (error) {
  console.error('Error fetching product:', error);
    notFound(); // Show a 404 page if an error occurs
  
}

};




export default ProductPage;
