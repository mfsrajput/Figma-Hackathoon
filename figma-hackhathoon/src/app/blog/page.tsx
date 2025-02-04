import { Button } from "@/components/ui/button";
import BlogCenter from "./blogCenter";
import { CiSearch } from "react-icons/ci";
import Image from 'next/image'
import { RelatedPost } from "./relatedPost";
import Frame from "@/components/frame";
import HeroDefault from "@/components/HeroDefault";

export default function Blog() {
  return (
    <div>
      <HeroDefault link1="Home"  link2="Blog" />
    
    <div className="w-full relative bg-white flex flex-col items-start justify-start leading-normal tracking-normal">
      <main className="flex flex-col justify-start mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-24">


        {/* mainsection */}
        <section className="w-full flex flex-col lg:flex-row items-start justify-start gap-6 lg:gap-10">
          {/* cards */}
          <div className="w-full">
            <BlogCenter />
          </div>

          {/* sidebar */}
          <aside className="relative w-full lg:w-1/3 flex flex-col items-center gap-6">
            <div className="relative w-full">
              {/* <Input className="mb-6 h-12 w-full" /> */}
              <div className="absolute top-3 right-4">
                <CiSearch />
              </div>
            </div>

            <div className="bg-white w-full px-6">
              <h3 className="text-2xl font-semibold mb-6">Categories</h3>
              <ul className="space-y-4 text-darkgray">
                <li className="flex justify-between">
                  <a href="#" className="hover:text-black">Crafts</a>
                  <p>2</p>
                </li>
                <li className="flex justify-between">
                  <a href="#" className="hover:text-black">Design</a>
                  <p>8</p>
                </li>
                <li className="flex justify-between">
                  <a href="#" className="hover:text-black">Handmade</a>
                  <p>7</p>
                </li>
                <li className="flex justify-between">
                  <a href="#" className="hover:text-black">Interior</a>
                  <p>1</p>
                </li>
                <li className="flex justify-between">
                  <a href="#" className="hover:text-black">Wood</a>
                  <p>6</p>
                </li>
              </ul>
            </div>

            {/* related post */}
            <div className="border border-darkgray w-full px-6 py-4 mt-6">
              <h1 className="text-2xl font-medium mb-6">Recent Posts</h1>
              {RelatedPost.map((item, index) => (
                <div className="flex gap-3 mb-6" key={index}>
                  <Image src={item.src} width={80} height={80} alt="rp1" />
                  <div className="flex flex-col">
                    <p>{item.heading}</p>
                    <p className="text-gray-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </section>

        {/* four-button div */}
        <div className="flex gap-4 items-center justify-center my-8">
          <Button className="w-12 h-12 text-lg bg-[#b88e2f] hover:bg-[#b88e2f]">1</Button>
          <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f] hover:text-white">2</Button>
          <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f] hover:text-white">3</Button>
          <Button className="w-12 h-12 text-lg bg-white text-black hover:bg-[#b88e2f] hover:text-white">Next</Button>
        </div>

        
      </main>
    </div>
    <Frame/>
    </div>
  );
}