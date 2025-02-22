// "use client";

// import { useState, useEffect } from "react";
// import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { clearCart } from "@/redux/slices/cartSlice";
// import { Button } from "@/components/ui/button";
// import convertToSubCurrency from "@/lib/ConvertToSubCurrency";

// const Checkout = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const router = useRouter();
//     const dispatch = useDispatch();

//     const cartItems = useSelector((state: RootState) => state.cart.items);
//     const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

//     const [clientSecret, setClientSecret] = useState<string | null>(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [errorMessage, setErrorMessage] = useState<string | null>(null);
//     const [loading, setLoading] = useState(true);

//     const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

//     useEffect(() => {
//         if (!totalPrice) return;

//         const fetchPaymentIntent = async () => {
//             setLoading(true);
//             try {
//                 const res = await fetch("/api/payment-intent", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         amount: convertToSubCurrency(totalPrice),
//                         cart: cartItems,
//                     }),
//                 });

//                 const data = await res.json();
//                 if (data.clientSecret) {
//                     setClientSecret(data.clientSecret);
//                 } else {
//                     throw new Error("Failed to get clientSecret");
//                 }
//             } catch (error) {
//                 console.error("❌ Error fetching payment intent:", error);
//                 setErrorMessage("Failed to initialize payment. Please try again.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPaymentIntent();
//     }, [totalPrice, cartItems]);

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         setIsProcessing(true);
//         setErrorMessage(null);

//         if (!stripe || !elements || !clientSecret) {
//             setErrorMessage("Payment system is not initialized. Please try again.");
//             setIsProcessing(false);
//             return;
//         }

//         try {
//             const { error: submitErrors } = await elements.submit();
//             if (submitErrors) {
//                 setErrorMessage(submitErrors.message ?? "An unknown error occurred.");
//                 return;
//             }

//             const { error, paymentIntent } = await stripe.confirmPayment({
//                 elements,
//                 clientSecret,
//                 confirmParams: { return_url: `${baseURL}/order-success` },
//                 redirect: "if_required",
//             });

//             if (error) {
//                 setErrorMessage(error.message ?? "Payment failed. Please try again.");
//             } else if (paymentIntent?.status === "succeeded") {
//                 dispatch(clearCart());
//                 router.push("/order-success");
//             }
//         } catch (error) {
//             console.error("❌ Payment Submission Error:", error);
//             setErrorMessage("Unexpected error during payment.");
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4 p-6">
//             {loading && <p>Loading payment form...</p>}
//             {!loading && clientSecret ? <PaymentElement /> : <p>Initializing payment...</p>}
            
//             {errorMessage && <p className="text-red-500">{errorMessage}</p>}

//             <Button type="submit" disabled={!stripe || isProcessing}>
//   {isProcessing ? "Processing..." : "Pay Now"}
//     </Button>
//         </form>
//     );
// };

// export default Checkout;
