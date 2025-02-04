import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import PropTypes from 'prop-types'

interface SubHeroProps {
  title: string;
  home: string; 
  linkUrl: string;
}

const SubHero :React.FC<SubHeroProps> = (props) => {
  return (
    <section>
      {/* Banner Section */}
      <div className="relative">
        <Image
          src="/shop/shop.png"
          alt="Shop Banner"
          width={1440}
          height={316}
          className="w-full lg:h-auto h-[126px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <Image
            src="/logo1.png"
            alt="Logo"
            width={50}
            height={32}
            className="lg:mb-2 mb-0 "
          />
          <h1 className="text-black1 text-[28px] sm:text-[px] leading-[40px] sm:leading-[72px] font-poppins hover:scale-110 transition-transform font-semibold">
            {props.title}
          </h1>
          <ul className="flex flex-wrap items-center justify-center space-x-2 lg:mt-4 sm:mt-1 text-[16px] sm:text-[20px]">
            <Link
              href={'/'}
              className="text-black1 hover:cursor-pointer hover:scale-110 transition-transform font-poppins font-semibold"
            >
             {props.home}
            </Link>
            <IoIosArrowForward className="w-4 h-4" />
            <Link
              href={props.linkUrl}
              className="text-black1 hover:cursor-pointer hover:scale-110 transition-transform"
            >
              {props.title}
            </Link>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SubHero;


SubHero.propTypes = {
  title: PropTypes.string.isRequired,
  home: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired
};
