"use client";

import Image from "next/image";

// Homepage components
export default function Gallery() {
  return (
    <div className="px-5 mx-5">
        <div className="flex gap-6 justify-center">
      <div className="relative">
        <Image
          src="/images/Rectangle1.png"
          alt="Gallery Image 1"
          width={80}
          height={90}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative">
        <Image
          src="/images/Rectangle2.png"
          alt="Gallery Image 2"
          width={300}
          height={150}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative pt-10">
        <Image
          src="/images/Rectangle3.png"
          alt="Gallery Image 3"
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative">
        <Image
          src="/images/Rectangle4.png"
          alt="Gallery Image 4"
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
        </div>
      
      <div className="center">
        <Image
          src="/images/Rectangle5.png"
          alt="Gallery Image 5"
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
      </div>
      </div>
      <div className="flex gap-6 py-4 justify-evenly">
      <div className="relative">
        <Image
          src="/images/Rectangle6.png"
          alt="Gallery Image 6"
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative">
        <Image
          src="/images/Rectangle7.png"
          alt="Gallery Image 7"
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative">
        <Image
          src="/images/Rectangle7.png"
          alt="Gallery Image 8"
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
      </div>
      <div className="relative">
        <Image
          src="/images/Rectangle8.png"
          alt="Gallery Image 9"
          width={200}
          height={150}
          className="rounded-lg object-cover"
        />
      </div>
      </div>
    </div>
  );
}
