
// Homepage components
export function ShareSection() {
    return (
      <section className="bg-[#B88E2F] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Share the Love</h2>
          <p className="mb-8">
            Follow us on social media and share your amazing furniture setups.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="underline">
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="underline">
              Instagram
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="underline">
              Twitter
            </a>
          </div>
        </div>
      </section>
    );
  }
  