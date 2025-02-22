import Order from "@/components/Order";

export default function OrdersPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>
      <Order />
    </div>
  );
}
