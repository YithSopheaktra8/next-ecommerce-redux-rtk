import { ecommerceApi } from "../api";

// Define a service using a base URL from the "ecommerceApi" and injects endpoints to it
export const productApi = ecommerceApi.injectEndpoints({
	endpoints: (builder) => ({
		getUserProfile: builder.query<any, any>({
			query: () => "api/user/",
			providesTags: ["UserProfile"],
		}),

		// register user
		registerUser: builder.mutation<any, { user: object }>({
			query: ({ user }) => ({
				url: "api/user/register/",
				method: "POST",
				body: user,
			}),
		}),
		// verify email
		verifyEmail: builder.mutation<any, string>({
			query: (key) => ({
				url: `account-confirm-email/${key}/`,
				method: "POST",
                body: {
                    key: key
                }
			}),
		}),
	}),
	overrideExisting: false, // don't override existing hooks
});
// Export hooks for usage in components, which are

// Export hooks for usage in components, which are
export const {
	useGetUserProfileQuery,
	useRegisterUserMutation,
	useVerifyEmailMutation,
} = productApi;
