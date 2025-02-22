import Link from 'next/link';
import { Product } from '../../types/products';
import { urlFor } from '@/sanity/lib/image';
import { IoMdShare } from "react-icons/io";
import {FaRegHeart } from "react-icons/fa";
import Image from "next/image";
import { FaArrowRightArrowLeft } from 'react-icons/fa6';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <div className="bg-white group w-full max-w-xs h-auto rounded-lg shadow-md border-gray-300 border">
        <div className="relative">
          <Image
            src={product.productImage ? urlFor(product.productImage).url() : "/placeholder-image.png"}
            alt={product.title || "Product image"}
            width={256}
            height={256}
            className="w-full h-64 object-cover"
          />
          {product.isNew? (
            <div className="absolute top-2 right-2 bg-accent1 text-white text-sm px-2 py-1 rounded-full">
              NEW
            </div>
          ): null}
          <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Link href={`/shop/${product._id}`}>
              <button className="bg-white text-primary px-4 py-2 mb-4 rounded">
                View Product
              </button>
            </Link>
            <div className="flex space-x-4 text-white">
              <button className="hover:text-primary flex items-center">
                <IoMdShare />
                Share
              </button>
              <Link href="/comparison">
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
          <h3 className="text-xl font-semibold text-text2">{product.title}</h3>
          <p className="text-sm text-gray4 mt-2">{product.title}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-semibold text-text2">${product.price}</span>
            {product.discountPercentage && (
              <span className="text-sm text-gray4 line-through">${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;



