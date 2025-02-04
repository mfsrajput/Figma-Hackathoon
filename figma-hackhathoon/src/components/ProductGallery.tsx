'use client';

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[]; // Accept images as props
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Replace these with actual image URLs or dynamic imports
  // const images = [
  //   "/images/Syltherine.png",  // Replace with actual image paths
  //   "/images/Leviosa.png",
  //   "/images/Lolito.png",
  //   "/images/Respira.png",
  //   "/images/Grifo.png",
  //   "/images/Muggo.png",
  //   "/images/Pingky.png",
  //   "/images/potty.png",
  // ];
   // Check if there are no images available
   if (!images || images.length === 0) {
    return <p className="text-muted-foreground">No images available for this product.</p>;
  }

  return (
    <div className="grid gap-4">
      {/* Main Image */}
      <div className="aspect-square relative overflow-hidden rounded-xl bg-muted">
        <Image
          src={images[selectedImage]}
          alt={`Product image ${selectedImage + 1}`}
          className="object-cover"
          fill
          priority
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            aria-label={`Select image ${index + 1}`} // Accessibility enhancement
            className={`aspect-square relative rounded-lg overflow-hidden bg-muted ${
              selectedImage === index ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              className="object-cover"
              fill
            />
          </button>
        ))}
      </div>
    </div>
  );
}
