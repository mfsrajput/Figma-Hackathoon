"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchProducts } from "@/redux/slices/productSlice";
import HeroDefault from "@/components/HeroDefault";
import ProductCard from "@/components/Productcard";
import { useRouter } from "next/navigation";

const ShopPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.product);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div>
      <HeroDefault link1="Home" link2="Shop" />
      <div className="p-8">
        <h1 className="text-3xl font-semibold text-center mb-8">Shop</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} 
              product={product} onClick={() => router.push(`/shop/${product._id}`)} />
            ))
          ) : (
            <p className="text-center col-span-full">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;


// 'use client';
// import { useEffect, useState } from 'react';
// import HeroDefault from '@/components/HeroDefault';
// import { Product } from '../../../types/products';
// import { client } from '@/sanity/lib/client';
// import { allProducts } from '@/sanity/lib/queries';
// import ProductCard from '@/components/Productcard';
// import { useRouter } from 'next/navigation';

// const ShopPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         setLoading(true);
//         const fetchedProducts: Product[] = await client.fetch(allProducts);
//         setProducts(fetchedProducts);
//       } catch (err) {
//         setError('Failed to fetch products. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProducts();
//   }, []);

//   if (loading) {
//     return <p className="text-center">Loading products...</p>;
//   }

//   if (error) {
//     return <p className="text-center text-red-500">{error}</p>;
//   }

//   return (
//     <div>
//       <HeroDefault link1="Home" link2="Shop" />
//       <div className="p-8">
//         <h1 className="text-3xl font-semibold text-center mb-8">Shop</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {products.length > 0 ? (
//             products.map((product) => (
//               <ProductCard 
//                 key={product._id} 
//                 product={product}
//                 onClick={() => router.push(`/shop/${product._id}`)}
//               />
//             ))
//           ) : (
//             <p className="text-center col-span-full">No products available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopPage;



// // 'use client';
// // import { useEffect, useState } from 'react';
// // import HeroDefault from '@/components/HeroDefault';
// // import { Product } from '../../../types/products';
// // import { client } from '@/sanity/lib/client';
// // import { allProducts } from '@/sanity/lib/queries';
// // import ProductCard from '@/components/Productcard';
// // import { useRouter } from 'next/navigation';

// // const ShopPage =() => {
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [mounted, setMounted] = useState<boolean>(false);
// //   const router = useRouter();
// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);
// //   useEffect(() => {
// //     const loadProducts = async () => {
// //       try {
// //         setLoading(true);
// //         const fetchedProducts: Product[] = await client.fetch(allProducts);
// //         setProducts(fetchedProducts);
// //       } catch (err) {
// //         setError('Failed to fetch products. Please try again later.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadProducts();
// //   }, []);

// //   if (!mounted) {
// //     return null; // Return nothing until the component is mounted
// //   }

// //   if (loading) {
// //     return <p className="text-center">Loading products...</p>;
// //   }

// //   if (error) {
// //     return <p className="text-center text-red-500">{error}</p>;
// //   }
  
// //   return (
// //     <div>
// //       <HeroDefault link1="Home" link2="Shop" />
// //       <div className="p-8">
// //         <h1 className="text-3xl font-semibold text-center mb-8">Shop</h1>
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {products.length > 0? (
// //             products.map((product) => (
// //             <ProductCard 
// //             key={product._id} 
// //             product={product}
// //             onClick={() => router.push(`/shop/${product._id}`)} // Navigate to product detail page
// //             />
// //           ))
// //   )
// //           : (
// //             <p className="text-center col-span-full">No products available.</p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
    
// //   );
// // }
// // export default ShopPage;




