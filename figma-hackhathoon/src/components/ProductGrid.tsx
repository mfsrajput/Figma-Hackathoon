import Link from "next/link";
import { IoMdShare } from "react-icons/io";
import { FaArrowRightArrowLeft, FaRegHeart } from "react-icons/fa6";
import { urlFor } from "@/sanity/lib/image";


interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: any;
  isNew?: boolean;
  dicountPercentage?: number;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
      {products.map((product, i) => (
        <div
          key={i}
          className="bg-white group w-full max-w-xs h-auto rounded-lg shadow-md border border-gray-300 justify-center items-center"
        >
          <div className="relative">
            <img
              src={product.productImage ? urlFor(product.productImage).url() : ""}
              alt={product.title || "Product image"}
              className="w-full h-64 object-cover"
            />

            {product.isNew && (
              <div className="absolute top-2 right-2 bg-accent1 text-white text-sm px-2 py-1 rounded-full">
                NEW
              </div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/shop/${product._id}`}>
                <button className="bg-white text-primary hover:cursor-pointer px-4 py-2 mb-4 rounded">
                  View Product
                </button>
              </Link>
              <div className="flex space-x-4 text-white">
                <button className="hover:text-primary flex items-center">
                  <IoMdShare className="mr-1" />
                  Share
                </button>
                <Link href={"/comparison"}>
                  <button className="hover:text-primary flex items-center">
                    <FaArrowRightArrowLeft className="mr-1" />
                    Compare
                  </button>
                </Link>
                <button className="hover:text-primary flex items-center">
                  <FaRegHeart className="mr-1" />
                  Like
                </button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold font-poppins text-text2">
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{product.title}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-semibold text-text2">
                ${product.price}
              </span>
              {product.dicountPercentage && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.dicountPercentage}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
