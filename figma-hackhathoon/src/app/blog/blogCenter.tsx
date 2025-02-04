import React from "react";
import Image from "next/image";
import { BlogData } from "./blogData";
import { MdDateRange, MdOutlineDateRange, MdPersonOutline } from "react-icons/md";

function BlogCenter() {
  return (
    <>
      {BlogData.map((item, index) => (
        <div key={index} className="w-full mb-12">
          {/* image top div */}
          <div className="w-full">
            <Image
              src={item.src}
              width={820}
              height={400}
              alt="image1"
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex gap-2">
              <MdPersonOutline  width={20} height={20} className="size-6"  />
              <p className="text-gray-400">{item.admin}</p>
            </div>
            <div className="flex gap-2">
            <MdDateRange  width={20} height={20}  className="size-6" />
            <p className="text-gray-400">{item.date}</p>
            </div>
            <div className="flex gap-2">
              {/* < src="/wood.png" width={20} height={20} className="size-6"  /> */}
              <p className="text-gray-400">{item.category}</p>
            </div>
          </div>

          {/* bottom div */}
          <div className="mt-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-2">{item.h1}</h1>
            <p className="text-sm sm:text-base leading-relaxed mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet.
            </p>
            <p className="text-sm underline cursor-pointer">Read More</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default BlogCenter;