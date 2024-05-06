import { ecommerceApi } from "../api";

// Define a service using a base URL from the "ecommerceApi" and injects endpoints to it
export const productApi = ecommerceApi.injectEndpoints({
	endpoints: (builder) => ({
		// The rest of the endpoints
		// get all products
		//                        <result type,         args type>
		getProducts: builder.query<any, { page: number; pageSize: number }>({
			query: ({ page = 1, pageSize = 10 }) =>
				`api/products/?page=${page}&page_size=${pageSize}`,
			providesTags: ["Product"],
		}),
		// get single product
		getProductById: builder.query<any, string>({
			query: (id) => `api/products/${id}/`,
			providesTags: ["Product"],
		}),

		getMyProducts: builder.query<any, {}>({
			query: () => `api/products/my_products/`,
			providesTags: ["Product"],
		}),

		// get api file products
		getProductsImage: builder.query<
			any,
			{ page: number; pageSize: number }
		>({
			query: ({ page = 1, pageSize = 5 }) =>
				`api/file/product/?page=${page}&page_size=${pageSize}`,
			providesTags: ["ProductImage"],
		}),

		// get api file products category
		getProductsCategory: builder.query<
			any,
			{ page: number; pageSize: number }
		>({
			query: ({ page = 1, pageSize = 5 }) =>
				`api/file/category/?page=${page}&page_size=${pageSize}`,
			providesTags: ["ProductImage"],
		}),

		getUserProfile: builder.query<any, any>({
			query: () => "api/user/",
			providesTags: ["UserProfile"],
		}),

		// upload a product image
		uploadProductImage: builder.mutation<any, { image: object }>({
			query: ({ image }) => ({
				url: "api/file/product/",
				method: "POST",
				body: image,
			}),
			invalidatesTags: ["ProductImage"],
		}),

		uploadCategoryImage: builder.mutation<any, { image: object }>({
			query: ({ image }) => ({
				url: "api/file/category/",
				method: "POST",
				body: image,
			}),
			invalidatesTags: ["ProductImage"],
		}),
		

		// create a product
		createProduct: builder.mutation<any, { newProduct: object }>({
			query: ({ newProduct }) => ({
				url: "api/products/",
				method: "POST",
				body: newProduct,
			}),
			invalidatesTags: ["Product"],
		}),

		// update a product
		updateProduct: builder.mutation<
			any,
			{ id: number; updatedProduct: object }
		>({
			query: ({ id, updatedProduct }) => ({
				url: `api/products/${id}/`,
				method: "PATCH",
				body: updatedProduct,
			}),
			invalidatesTags: ["Product"],
		}),

		// delete a product
		deleteProduct: builder.mutation<any, { id: number }>({
			query: ({ id }) => ({
				url: `api/products/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: ["Product"],
		}),
	}),
	overrideExisting: false, // don't override existing hooks
});
// Export hooks for usage in components, which are

// Export hooks for usage in components, which are
export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
	useGetMyProductsQuery,
	useGetUserProfileQuery,
	useGetProductsImageQuery,
	useGetProductsCategoryQuery,
	useUploadProductImageMutation,
	useUploadCategoryImageMutation
} = productApi;
