// ProductDetail
'use client';
import { useState } from 'react';
import { Product } from '../../types/products';
import { urlFor } from '@/sanity/lib/image';
import AddToCartForm from '@/components/AddToCartForm';
import HeroDefault from '@/components/HeroDefault';
import Frame from './frame';
import { BrowseRange } from './BrowseRange';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const [showPopup, setShowPopup] = useState(false); // State for popup
  const [popupMessage, setPopupMessage] = useState(''); // State for popup message
  // console.log('Product Image:', product.productImage);
  const productImageUrl = product.productImage?.asset?._ref
    ? urlFor(product.productImage).url()
    : '/placeholder-image.png';
    // console.log('Product Image URL:', productImageUrl); 
      // Function to show popup
  const handleAddToCart = () => {
    setPopupMessage(`${product.title} has been added to your cart`);
    setShowPopup(true);
    
    setTimeout(() => {
      setShowPopup(false);
    }, 2000); // Hide after 2 seconds
  };
  

  return (
    <div>
      <HeroDefault link1="Home" link2="Shop" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          {/* Product Gallery with Image Boxes */}
          <div className="w-full flex md:flex-row flex-col md:py-12">
            <div className="md:w-5/5 w-full md:flex gap-6">
              {/* Mobile View Large Image */}
              <div className="w-full md:hidden block p-6 bg-[#F9F1E7] mb-3 aspect-square overflow-hidden">
                <img src={productImageUrl} alt={product.title} className="object-cover w-full h-min" />
              </div>
              
              {/* Small Thumbnail Images */}
              <div className="flex md:flex-col flex-row md:gap-5 gap-3">
                {[...Array(4)].map((_, index) => (
                  <span key={index} className="w-32 md:h-28 bg-[#F9F1E7] p-4">
                    <img src={productImageUrl} alt={product.title} className="object-cover w-full h-full" />
                  </span>
                ))}
              </div>
              
              {/* Large Image Desktop View */}
              <div className="md:flex-1 md:h-[520px] md:block hidden p-6 bg-[#F9F1E7]">
                <img src={productImageUrl} alt={product.title} className="object-cover w-full h-full max-w-[1000px] mx-auto" />
              </div>
            </div>
          </div>


          <div className="space-y-6">
            {/* Product Name */}
            <h1 className="text-3xl font-bold">{product.title}</h1>

            {/* Product Price */}
            <div className="text-2xl font-semibold">${product.price}</div>

            {/* Product Tags */}
            <div className="flex items-center space-x-2 text-sm">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Product Description */}
            <p className="text-muted-foreground">{product.description}</p>

            {/* Add to Cart Form */}
            <AddToCartForm productId={product._id}
            name={product.title}
            price={product.price}
             image={productImageUrl}
             onAddToCart={handleAddToCart} />



            {/* Product Details */}
            <div className="border-t pt-6 space-y-2 text-sm">
              <div className="flex">
                <span className="w-24 text-muted-foreground">SKU:</span>
                <span>{product._id}</span>
              </div>
              <div className="flex">
                <span className="w-24 text-muted-foreground">Tags:</span>
                <span>{product.tags.join(', ') || 'None'}</span>
              </div>
              <div className="flex">
                <span className="w-24 text-muted-foreground">Status:</span>
                <span>{product.isNew ? 'New' : 'Regular'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Popup for Add to Cart */}
      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md">
          {popupMessage}
        </div>
      )}
      <BrowseRange/>
      {/* Frame Component */}
      <Frame/>
    </div>
  );
};

export default ProductDetail;
