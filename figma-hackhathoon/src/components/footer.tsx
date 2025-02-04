import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="font-bold text-2xl mb-6">Funiro.</h3>
            <p className="text-gray-600 mb-4">
              400 University Drive Suite 200 Coral Gables,
              <br />
              FL 33134 USA
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-600 hover:text-[#B88E2F]">
                Home
              </Link>
              <Link href="/shop" className="block text-gray-600 hover:text-[#B88E2F]">
                Shop
              </Link>
              <Link href="/about" className="block text-gray-600 hover:text-[#B88E2F]">
                About
              </Link>
              <Link href="/contact" className="block text-gray-600 hover:text-[#B88E2F]">
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-bold mb-4">Help</h4>
            <nav className="space-y-2">
              <Link href="/payment-options" className="block text-gray-600 hover:text-[#B88E2F]">
                Payment Options
              </Link>
              <Link href="/returns" className="block text-gray-600 hover:text-[#B88E2F]">
                Returns
              </Link>
              <Link href="/privacy-policies" className="block text-gray-600 hover:text-[#B88E2F]">
                Privacy Policies
              </Link>
            </nav>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="w-full p-4 border border-gray-300 focus:outline-none focus:border-[#B88E2F]"
              />
              <button
                type="submit"
                className="w-full p-4 bg-[#B88E2F] text-white hover:bg-[#A67B1F]"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>
        <div className="border-t mt-12 pt-6 text-center text-gray-600">
          <p>2023 furino. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}

