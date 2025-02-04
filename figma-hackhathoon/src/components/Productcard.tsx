import Link from 'next/link';
import { Product } from '../../types/products';
import { urlFor } from '@/sanity/lib/image';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg bg-white">
      <Link href={`/shop/${product._id}`} className="block">
        <img
          src={product.productImage ? urlFor(product.productImage).url() : ''}
          alt={product.title || 'Product image'}
          className="w-full h-64 object-cover"
        />
      </Link>
      <div className="p-4">
        <h2 className="text-xl font-bold">{product.title || 'Unnamed Product'}</h2>
        <p className="text-lg text-gray-500">
          {product.price ? `$${product.price}` : 'Price not available'}
        </p>
        {product.discountPercentage && (
          <p className="text-sm text-gray-400">{`${product.discountPercentage}% off`}</p>
        )}
        <Link href={`/shop/${product._id}`} className="text-indigo-600 mt-4 inline-block">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
