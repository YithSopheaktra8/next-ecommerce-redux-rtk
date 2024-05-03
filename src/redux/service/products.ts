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
		}),
		// get single product
		getProductById: builder.query<any, number>({
			query: (id) => `api/products/${id}/`,
		}),

		// create a product
		createProduct: builder.mutation<any, { newProduct: object }>({
			query: ({ newProduct }) => ({
				url: "api/products/",
				method: "POST",
				body: newProduct,
			}),
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
		}),

		// delete a product
		deleteProduct: builder.mutation<any, { id: number }>({
			query: ({ id }) => ({
				url: `api/products/${id}/`,
				method: "DELETE",
			}),
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
} = productApi;
