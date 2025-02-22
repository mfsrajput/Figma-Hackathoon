export default function Success() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Payment Successful!</h1>
        <p>Thank you for your order.</p>
        <a href="/" className="text-blue-500">Return to Home</a>
      </div>
    );
  }