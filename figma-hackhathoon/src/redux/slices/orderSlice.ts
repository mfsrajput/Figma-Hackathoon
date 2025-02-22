import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client } from "@/sanity/lib/client";
import { format } from "date-fns";
 
interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
}

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  orderDate: string;
  status: string;
  total: number;
  cart: Product[];
  formattedDate?: string; // New field for formatted date
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk to fetch orders from Sanity
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  // console.log("🟡 Fetching orders from Sanity...");
  try {
    const ordersData = await client.fetch(
      `*[_type == "order"]{
        _id,
        firstName,
        lastName,
        email,
        phone,
        street,
        city,
        province,
        zip,
        country,
        orderDate,
        status,
        total,
        cart[]{
          _id,
          _key,
          quantity,
          color,
          size,
          price,
          name,
          image
        }
      }`
    );
    // Ensure cart is never null
const sanitizedOrders = ordersData.map((order: Order)=> ({
  ...order,
  cart: order.cart || [],  // Ensures cart is an empty array if null
  lastName: order.lastName || "N/A", // Default empty lastName to "N/A"
  formattedDate: format(new Date(order.orderDate), "MM/dd/yyyy HH:mm") // Format date
}));
// console.log("✅ Orders fetched from Sanity:", sanitizedOrders); 
return sanitizedOrders;
  } catch (error) {
    console.error("❌ Fetching orders failed:", error);
    throw error;
  }
});

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        // console.log("🟢 Orders received in Redux state:", action.payload);
        state.orders = action.payload.sort((a: Order, b: Order) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      });
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
