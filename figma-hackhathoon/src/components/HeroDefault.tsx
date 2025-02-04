import Link from 'next/link'; 
import Image from "next/image";
import heroImg from "../../public/images/Rectangle 1.png";
// Define the types for the props
interface HeroDefaultProps {
    link1: string;
    link2: string;
  }

  const HeroDefault: React.FC<HeroDefaultProps> = ({ link1, link2 }) =>{
    return(
        <div className='relative'>
            <Image src={heroImg} alt="Hero Image"  />
            <div className="absolute inset-0 flex items-center justify-center space-x-6">
        {/* link1 */}
        <Link href="/" className="text-black-800 text-lg">{link1}</Link>
        {/* link2 */}
        <Link href="/shop" className="text-black-600 text-lg">{link2}</Link>
        
      </div></div>
        
    )
}
export default HeroDefault;