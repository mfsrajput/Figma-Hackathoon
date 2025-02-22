import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { client } from "@/sanity/lib/client";
import { allProducts, four, eight } from "@/sanity/lib/queries";

interface Product {
  _id: string;
  title: string;
  price: number;
  productImage: any;
  description: string;
  tags: string[];
  isNew: boolean;  // Ensuring it is always defined
  dicountPercentage?: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// ✅ Async Thunk for fetching products
export const fetchProducts = createAsyncThunk("product/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const products: Product[] = await client.fetch(allProducts);
    return products.map(product => ({
      ...product,
      isNew: product.isNew ?? false,  // ✅ Ensure isNew is always defined
    }));
  } catch (error) {
    return rejectWithValue("Failed to fetch products");
  }
});
// Async Thunk for fetching the first 4 products
export const fetchFourProducts = createAsyncThunk("product/fetchFourProducts", async (_, { rejectWithValue }) => {
  try {
    const products: Product[] = await client.fetch(four);
    return products.map(product => ({
      ...product,
      isNew: product.isNew ?? false,
    }));
  } catch (error) {
    return rejectWithValue("Failed to fetch first 4 products");
  }
});

// Async Thunk for fetching the first 8 products
export const fetchEightProducts = createAsyncThunk("product/fetchEightProducts", async (_, { rejectWithValue }) => {
  try {
    const products: Product[] = await client.fetch(eight);
    return products.map(product => ({
      ...product,
      isNew: product.isNew ?? false,
    }));
  } catch (error) {
    return rejectWithValue("Failed to fetch first 8 products");
  }
});


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(fetchFourProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchFourProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    })
    .addCase(fetchFourProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(fetchEightProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchEightProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.loading = false;
    })
    .addCase(fetchEightProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      });
  },
});

export default productSlice.reducer;



// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import { client } from "@/sanity/lib/client";
// import { allProducts } from "@/sanity/lib/queries";

// interface Product {
//   _id: string;
//   title: string;
//   price: number;
//   productImage: any;
//   description: string;
//   tags: string[];
//   isNew?: boolean;
//   discountPercentage?: number;
// }

// interface ProductState {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// // Async Thunk for fetching products
// export const fetchProducts = createAsyncThunk("product/fetchProducts", async (_, { rejectWithValue }) => {
//   try {
//     const products: Product[] = await client.fetch(allProducts);
//     return products;
//   } catch (error) {
//     return rejectWithValue("Failed to fetch products");
//   }
// });

// const productSlice = createSlice({
//   name: "product",
//   initialState,
//   reducers: {
//     fetchProductsStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
//       state.products = action.payload;
//       state.loading = false;
//     },
//     fetchProductsFailure(state, action: PayloadAction<string>) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
//         state.products = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;
// export default productSlice.reducer;


