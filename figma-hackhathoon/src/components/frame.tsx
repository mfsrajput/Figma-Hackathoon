import React from 'react'
import Image from "next/image";

const Frame = () => {
  return (
    <div className='py-10'>
    <div className='py-16 px-20 bg-[#FAF3EA] '>
        <div className='bg-[#FAF3EA] w-[267] h-[30] '>
            <div className='flex flex-wrap gap-8'>
        <div className='flex gap-2'>
            <Image src={'/trophy.png'} alt='' width={60} height={58.13} />
            <h4 className=' font-bold text-xl'>High Quality <br /> <span className='text-[#898989] text-lg font-light'>crafted from top materials</span></h4>
        </div>
        <div className='flex gap-2'>
            <Image src={'/Group.png'} alt='' width={60} height={58.13} />
            <h4 className=' font-bold text-xl'>Warranty Protection <br /> <span className='text-[#898989] text-lg font-light'>Over 2 years</span></h4>
        </div>
        <div className='flex gap-2'>
            <Image src={'/shipping.png'} alt='' width={60} height={58.13} />
            <h4 className=' font-bold text-xl'>Free Shipping <br /> <span className='text-[#898989] text-lg font-light'>Order over 150 $</span></h4>
        </div>
        <div className='flex gap-2'>
            <Image src={'/customer-support.png'} alt='' width={60} height={58.13} />
            <h4 className=' font-bold text-xl'>24 / 7 Support <br /> <span className='text-[#898989] text-lg font-light'>Dedicated support</span></h4>
        </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default Frame