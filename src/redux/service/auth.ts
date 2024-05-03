import { ecommerceApi } from "../api";
import type { LoginRequest } from "@/types/userType";

// Define a service using a base URL from the "ecommerceApi" and injects endpoints to it
export const authApi = ecommerceApi.injectEndpoints({
	endpoints: (builder) => ({
		// user profile
		userProfile: builder.query<any, {}>({
			query: () => "api/user/profile/",
		}),
	}),
	overrideExisting: false, // don't override existing hooks
});

// Export hooks for usage in components, which are
export const { useUserProfileQuery } = authApi;
