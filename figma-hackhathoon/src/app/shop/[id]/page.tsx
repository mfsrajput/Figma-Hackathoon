import { client } from "@/sanity/lib/client";
import { productById } from "@/sanity/lib/queries";
import ProductDetail from "@/components/ProductDetail";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  if (!id) return notFound();

  try {
    const product = await client.fetch(productById, { id });
    if (!product) return notFound();

    return <ProductDetail product={product} />;
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
};

export default ProductPage;


// import { client } from '@/sanity/lib/client';
// import { productById } from '@/sanity/lib/queries';
// import ProductDetail from '../../../components/ProductDetail';
// import { notFound } from 'next/navigation';



// interface ProductPageProps {
//   params: Promise<{ id: string }>; 
// }
// // Async component for fetching product details
// const ProductPage = async ({ params }: ProductPageProps) => {
//   const resolvedParams = await params;
//   const { id } = resolvedParams;
//   if (!id) {
//     return notFound();
//   }
//   try {
//     // Fetch product data from Sanity
//     const product = await client.fetch(productById, { id });
//     // const product: Product | null = await client.fetch(productById, { id })
    
//     // If product doesn't exist, show a 404 page
//     if (!product) {
//       return notFound();
//     }
//   return <ProductDetail product={product} />;
// } catch (error) {
//   console.error('Error fetching product:', error);
//   return notFound(); // Show a 404 page if an error occurs
  
// }

// };




// export default ProductPage;
