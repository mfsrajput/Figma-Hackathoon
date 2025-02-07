import { HeroSection } from "@/components/HeroSection";
import { BrowseRange } from "@/components/BrowseRange";
import  OurProduct  from "@/components/OurProduct";
import  Inspiration  from "@/components/Inspiration";
import { ShareSection } from "@/components/ShareSection";
import Gallery from "@/components/Gallery";



export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <BrowseRange />
      <OurProduct />
      <Inspiration />
      <Gallery />
      <ShareSection />
      

    </div>
  );
}