import React from 'react'
import Image from 'next/image'
import { FaPhone } from "react-icons/fa6";
import { IoMdPin } from "react-icons/io";
import { GoClockFill } from "react-icons/go";
import HeroDefault from '@/components/HeroDefault';

const Contact = () => {
  return (
    <><div>
      <HeroDefault link1="Home" link2="Contact" />
     
          <div className="sm:flex-row flex-col pt-20 mb-12">
              <h1 className='text-center justify-center font-medium text-[30px] text-black'>
                  Get In Touch With Us
              </h1>
              <p className="text-center text-gray-500">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email.
                <br /> Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
          </div>
      </div><section
          id="contact"
          className="grid md:grid-cols-2 my-12 md:my-12 py-24 px-8 gap-4 relative"
      >
               {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <IoMdPin className="w-6 h-6 md:w-8 md:h-8" />
                <div>
                  <h3 className="font-medium text-lg md:text-xl mb-2">Address</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    236 5th SE Avenue, New York NY10000, United States
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <FaPhone  className="w-6 h-6 md:w-8 md:h-8" />
                <div>
                  <h3 className="font-medium text-lg md:text-xl mb-2">Phone</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Mobile: +(84) 546-6789
                    <br />
                    Hotline: +(84) 456-6789
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <GoClockFill  className="w-6 h-6 md:w-8 md:h-8" />
                <div>
                  <h3 className="font-medium text-lg md:text-xl mb-2">Working Time</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Monday-Friday: 9:00 - 22:00
                    <br />
                    Saturday-Sunday: 9:00 - 21:00
                  </p>
                </div>
              </div>
            </div>
              <div>
                  {/* <form ref={form} onSubmit={sendEmail} className="flex flex-col "> */}
                  <div className="mb-6">
                      <label
                          htmlFor=""
                          className="text-black block mb-2 text-sm font-medium"
                      >
                          Your Name
                      </label>
                      <input
                          name="name"
                          type="text"
                          id="example"
                          required
                          className="bg-white border border-[#9F9F9F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                          placeholder="Name" />
                  </div>
                  <div className="mb-6">
                      <label
                          htmlFor="email"
                          className="text-black block text-sm mb-2 font-medium"
                      >
                          Email
                      </label>
                      <input
                          name="email"
                          type="email"
                          id="exampleInput91"
                          required
                          className="bg-white border border-[#9F9F9F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                          placeholder="abc@gmail.com" />
                  </div>
                  <div className="mb-6">
                      <label
                          htmlFor="email"
                          className="text-black block text-sm mb-2 font-medium"
                      >
                          Subjuct
                      </label>
                      <input
                          name="text"
                          type="text"
                          id="exampleInput91"
                          required
                          className="bg-white border border-[#9F9F9F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                          placeholder="This is an optional" />
                  </div>
                  <div className="mb-6">
                      <label
                          htmlFor="message"
                          className="text-black block text-sm mb-2 font-medium"
                      >
                          Message
                      </label>
                      <textarea
                          name="message"
                          id="message"
                          className="bg-white border border-[#9F9F9F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                          placeholder="Let's talk about..." />
                  </div>
                  <button
                      type="submit"
                      className=" texr-start bg-[#B88E2F] text-white font-medium py-2.5 px-5 rounded "
                  >
                      Send Message
                  </button>
                  {/* <ToastContainer />
  </form> */}
              </div>
          </section><hr /></>
  )
}

export default Contact