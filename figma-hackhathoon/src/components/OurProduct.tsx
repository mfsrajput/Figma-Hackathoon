"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { eight } from "@/sanity/lib/queries"; // Import pre-defined query
import { IoMdShare } from "react-icons/io";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";

import Link from "next/link";

// Homepage components
const OurProduct = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await client.fetch(eight); // Use the predefined query
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="container px-10 py-10">
      <h2 className="text-3xl font-bold text-center py-10 leading-10">Our Products</h2>

      {loading && <p className="text-center text-gray-500">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {products.map((product, i) => (
          <div key={i} className="bg-white group w-full max-w-xs h-auto rounded-lg shadow-md border-gray-300 border justify-center items-center">
            <div className="relative">
            <img
          src={product.productImage ? urlFor(product.productImage).url() : ''}
          alt={product.title || 'Product image'}
          className="w-full h-64 object-cover"
        />
              
              {product.isNew && (
                <div className="absolute top-2 right-2 bg-accent1 text-white text-sm px-2 py-3 rounded-full">
                  NEW
                </div>
              )}

              <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={(`/shop/${product._id}`)}>
                  <button className="bg-white text-primary hover:cursor-pointer px-4 py-2 mb-4 rounded">
                  View Product
                  </button>
                </Link>
                <div className="flex space-x-4 text-white">
                  <button className="hover:text-primary flex items-center">
                    <IoMdShare />
                    Share
                  </button>
                  <Link href={"/comparison"}>
                    <button className="hover:text-primary flex items-center">
                      <FaArrowRightArrowLeft />
                      Compare
                    </button>
                  </Link>
                  <button className="hover:text-primary flex items-center">
                    <FaRegHeart />
                    Like
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold font-poppins text-text2">{product.title}</h3>
              <p className="text-sm text-gray4 mt-2">{product.title}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-semibold text-text2">${product.price}</span>
                {product.dicountPercentage && (
                  <span className="text-sm text-gray4 line-through">${product.dicountPercentage}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProduct;
