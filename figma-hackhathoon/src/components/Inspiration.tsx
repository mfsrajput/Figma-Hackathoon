"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Homepage components
const inspirations = [
  {
    id: 1,
    title: "Modern Living Room",
    description: "Create a cozy and stylish living room with our curated furniture pieces.",
    img: "/images/Rectangle 24.png",
  },
  {
    id: 2,
    title: "Sleek Bedroom Design",
    description: "Design a serene and minimalistic bedroom with premium furniture.",
    img: "/images/Rectangle 25.png",
  },
  {
    id: 3,
    title: "Elegant Dining Area",
    description: "Make your dining space the center of attention with exquisite furniture.",
    img: "/images/Rectangle 24.png",
  },
];

export default function Inspiration() {
  return (
    <section className="slider-row flex flex-col md:flex-row items-center py-20 space-y-8 md:space-y-0">
      <div className="px-4">
      <h2 className="text-4xl font-bold mb-8">50+ Beautiful rooms inspiration</h2>
      <p>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="swiper-wrapper"
      >
        {inspirations.map((inspiration) => (
          <SwiperSlide key={inspiration.id} className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src={inspiration.img}
              alt={inspiration.title}
              width={400}
              height={300}
              className="rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-4">{inspiration.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
