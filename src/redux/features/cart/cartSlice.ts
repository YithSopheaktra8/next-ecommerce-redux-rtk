import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductType } from "@/types/productType";
import type { RootState } from "@/redux/store";

const initialState = {
	products: [] as CartProductType[],
	totalPrice: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartProductType>) => {
			const productExists = state.products.some(
				(product) => product.id === action.payload.id
			);

			if (!productExists) {
				state.products.push(action.payload);
				const price = parseFloat(action.payload.price.toString());
				state.totalPrice += price;
			}
		},
		removeFromCart: (state, action: PayloadAction<number>) => {
			// find product by id
			const product = state.products.find(
				(product) => product.id === action.payload
			);

			state.totalPrice -= product?.price || 0;

			state.products = state.products.filter(
				(product) => product.id !== action.payload
			);
		},
		increment: (state, action: PayloadAction<number>) => {
			const product = state.products.find(
				(product) => product.id === action.payload
			);
			const price = product?.price || 0;

			state.totalPrice += parseFloat(price.toString());
		},
		decrement: (state, action: PayloadAction<number>) => {
			const product = state.products.find(
				(product) => product.id === action.payload
			);
			const price = product?.price || 0;
			state.totalPrice -= parseFloat(price.toString());
		},
	},
});

// export actions
export const { addToCart, removeFromCart, increment, decrement } =
	cartSlice.actions;
export default cartSlice.reducer;

// create selector
export const selectProducts = (state: RootState) => state.cart.products;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
