import { configureStore } from "@reduxjs/toolkit";
import accessToken from "@/redux/features/token/tokenSlice";
import { ecommerceApi } from "./api";
import cartSlice from "./features/cart/cartSlice";
import userProfileSlice from "./features/userProfile/userProfileSlice";

// create store
export const makeStore = () => {
	return configureStore({
		reducer: {
			accessToken: accessToken,
			[ecommerceApi.reducerPath]: ecommerceApi.reducer,
			cart: cartSlice,
			userProfile: userProfileSlice,
		},
		// Adding the api middleware enables caching, invalidation, polling,
		// and other useful features of `rtk-query`.
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(ecommerceApi.middleware),
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
