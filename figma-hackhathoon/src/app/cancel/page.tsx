export default function Cancel() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Payment Cancelled</h1>
        <p>Your order was not completed.</p>
        <a href="/checkout" className="text-blue-500">Try Again</a>
      </div>
    );
  }