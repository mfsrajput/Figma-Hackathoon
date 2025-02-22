// 'use client';

// import { useState, useEffect } from 'react';
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import convertToSubCurrency from '@/lib/ConvertToSubCurrency';

// const CheckoutPage = ({ amount }: { amount: number }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [errorMessage, setError] = useState<string | null>(null);
//     const [clientSecret, setClientSecret] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);

//     // Dynamically determine base URL
//     const baseURL = typeof window !== 'undefined' && window.location.host.includes('localhost')
//         ? 'http://localhost:3001'
//         : 'https://stripe-payment-one-nu.vercel.app';

//     useEffect(() => {
//         fetch('/api/payment-intent', { 
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 amount: convertToSubCurrency(amount),  
//                 cart: []  // ✅ Fixed: Moved inside JSON.stringify()
//             })

//         })
//         .then(res => res.json())
//         .then(data => {
//             if (data.clientSecret) {
//                 setClientSecret(data.clientSecret);
//                 console.log("✅ Client Secret received:", data.clientSecret);
//             } else {
//                 console.error("❌ Error: clientSecret not received", data);
//                 setClientSecret(null); 
//             }
//         })
//         .catch(error => console.error("❌ Error fetching payment intent:", error));
//     }, [amount]);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setLoading(true);

//         if (!stripe || !elements || !clientSecret) {
//             console.error("❌ Stripe.js not ready or clientSecret missing");
//             setError("Payment system is not initialized. Please try again.");
//             setLoading(false);
//             return;
//         }

//         console.log("🟢 Submitting Payment:", clientSecret);

//         try {
//             // Ensure elements are submitted before confirming payment
//             const { error: submitErrors } = await elements.submit();
//             if (submitErrors) {
//                 setError(submitErrors.message ?? "An unknown error occurred.");
//                 setLoading(false);
//                 return;
//             }

//             // Confirm payment
//             const { error } = await stripe.confirmPayment({
//                 elements,
//                 clientSecret,
//                 confirmParams: { return_url: `${baseURL}/payment-success?amount=${amount}` },
//             });

//             if (error) {
//                 setError(error.message ?? "An unknown error occurred.");
//                 console.error("❌ Payment Error:", error);
//             } else {
//                 setError(null);
//             }
//         } catch (error) {
//             console.error("❌ Payment Submission Error:", error);
//             setError("Unexpected error during payment.");
//         }

//         setLoading(false);
//     };

//     return (
//         <form onSubmit={handleSubmit} className="p-8">
//             {clientSecret ? <PaymentElement /> : <p>Loading payment form...</p>}
//             <button 
//                 className="w-full bg-black text-white py-2 mt-5" 
//                 disabled={!stripe || !elements || !clientSecret || loading}
//             >
//                 {loading ? 'Processing...' : 'Pay Now'}
//             </button>
//             {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
//         </form>
//     );
// };

// export default CheckoutPage;
