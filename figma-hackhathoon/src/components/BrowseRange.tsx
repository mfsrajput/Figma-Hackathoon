import Link from "next/link";
import Image from "next/image";  // Import Image from next/image

const categories = [
  { title: "Living Room", href: "/images/Living.png" },
  { title: "Bedroom", href: "/images/Bedroom.png" },
  { title: "Dining", href: "/images/Dining.png" },
];


// Homepage components
export function BrowseRange() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Browse Our Range</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto max-w-7xl">
          {categories.map((category) => (
            <Link key={category.title} href={category.href} passHref>
              <div className="p-6 hover:bg-[#E3D2B7] rounded-lg flex flex-col items-center justify-center">
                {/* Image */}
                <div className="mb-4 w-full flex justify-center px-4">
                  <Image
                    src={category.href}
                    alt={category.title}
                    width={300}  // Adjust width according to your design
                    height={200} // Adjust height according to your design
                    className="object-contain"
                  />
                </div>
                {/* Title */}
                <h3 className="text-lg font-medium ">{category.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
