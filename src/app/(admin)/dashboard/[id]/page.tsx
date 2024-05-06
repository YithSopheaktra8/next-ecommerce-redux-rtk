"use client";
import {
	useGetProductByIdQuery,
	useGetProductsImageQuery,
	useUpdateProductMutation,
	useUploadCategoryImageMutation,
	useUploadProductImageMutation,
} from "@/redux/service/products";
import {
	Dropdown,
	DropdownTrigger,
	Button,
	DropdownMenu,
	DropdownItem,
	Pagination,
} from "@nextui-org/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Image from "next/image";
import * as Yup from "yup";

type ValueTypes = {
	productName: string;
	productDesc: string;
	productPrice: number;
	productQuantity: number;
	productImage: string;
};

const validationSchema = Yup.object().shape({
	productName: Yup.string(),
	productDesc: Yup.string(),
	productPrice: Yup.number(),
	productQuantity: Yup.number(),
});

const uploadInitialValues = {
	name: "",
	file: null,
	type: "",
};

const uploadValidationSchema = Yup.object().shape({
	file: Yup.mixed().required("File is required"),
});

type Params = {
	params: { id: string };
};

const notifySuccess = () =>
	toast.success("Success", {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Bounce,
	});

const notifyError = () =>
	toast.error("can't not create product", {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Bounce,
	});

export default function UpdateProduct(params: Params) {
	const [currentPage, setCurrentPage] = useState(1);

	const [
		uploadProductImage,
		{
			data: productImageData,
			isLoading: productImageLoading,
			isSuccess: productImageSuccess,
		},
	] = useUploadProductImageMutation();

	const [
		uploadCategoryImage,
		{ data: categoryImageData, isSuccess: categoryImageSuccess },
	] = useUploadCategoryImageMutation();

	const { data: ProductImage } = useGetProductsImageQuery({
		page: currentPage,
		pageSize: 5,
	});

	const { data: productData } = useGetProductByIdQuery(params.params.id);
	const [updateProduct, { isSuccess: updateSuccess, isError: updateError }] =
		useUpdateProductMutation();

	const [productImage, setProductImage] = useState("");

	const productImageLength = productData?.total;

	const handleProductImage = (product: any, setFieldValue: any) => {
		setFieldValue("productImage", product.image);
		setProductImage(product.image);
	};

	console.log(productData);

	const handleUpdateProduct = (product: any) => {
		updateProduct({
			id: productData?.id,
			updatedProduct: product,
		});
		if (updateSuccess) {
			notifySuccess();
		}
		if (updateError) {
			notifyError();
		}
	};

	const initialValues: ValueTypes = {
		productName: productData?.name,
		productDesc: productData?.desc,
		productPrice: productData?.price,
		productQuantity: productData?.quantity,
		productImage: productData?.image,
	};

	useEffect(() => {}, [params.params.id]);

	return (
		<main className="flex justify-center">
			<div className="w-full bg-gray-100  flex items-center justify-center">
				<div className=" w-[800px] p-6 bg-white my-24 rounded-lg">
					<div>
						<h1 className="text-3xl font-semibold mb-6 text-black text-center">
							Create Product
						</h1>
						<div>
							<Formik
								initialValues={uploadInitialValues}
								validationSchema={uploadValidationSchema}
								onSubmit={(value, { setSubmitting }) => {
									if (!value.file) {
										console.error("No file selected");
										return;
									}
									console.log(value);
									const filenameWithoutExtension =
										value.name.split(".")[0];
									const formData = new FormData();
									formData.append("image", value.file);
									formData.append(
										"name",
										filenameWithoutExtension
									);

									if (value.type === "ProductImage") {
										uploadProductImage({
											image: formData,
										});
										if (productImageSuccess) {
											notifySuccess();
										}
									}

									if (value.type === "CategoryImage") {
										uploadCategoryImage({
											image: formData,
										});
										if (categoryImageSuccess) {
											notifySuccess();
										}
									}
								}}>
								{({ setFieldValue }) => (
									<Form className="space-y-4 ">
										{/* product Image */}
										<div>
											<label
												htmlFor="productName"
												className="block text-sm font-medium text-gray-700">
												Product Image
											</label>
											<Field
												onChange={(e: any) => {
													setFieldValue(
														"file",
														e.target.files[0]
													);
													setFieldValue(
														"name",
														e.target.files[0].name
													);
													setFieldValue(
														"type",
														"ProductImage"
													);
												}}
												type="file"
												id="productName"
												name="productName"
												className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
											/>
											<ErrorMessage
												name="productName"
												component="div"
												className="text-red-500 text-base text-center my-3"
											/>
										</div>

										{/* Category Image */}
										<div>
											<label
												htmlFor="categoryImage"
												className="block text-sm font-medium text-gray-700">
												Category Image
											</label>
											<Field
												onChange={(e: any) => {
													setFieldValue(
														"file",
														e.target.files[0]
													);
													setFieldValue(
														"name",
														e.target.files[0].name
													);
													setFieldValue(
														"type",
														"CategoryImage"
													);
												}}
												type="file"
												id="productName"
												name="productName"
												className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
											/>
											<ErrorMessage
												name="productName"
												component="div"
												className="text-red-500 text-base text-center my-3"
											/>
										</div>
										{/* button */}
										<button
											type="submit"
											className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
											{productImageLoading ? (
												<div>Loading...</div>
											) : (
												"Upload"
											)}
										</button>
									</Form>
								)}
							</Formik>
						</div>
					</div>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={(value) => {
							handleUpdateProduct(value);
						}}>
						{({ setFieldValue }) => (
							<Form className="space-y-4 ">
								{/* product Name */}
								<div>
									<label
										htmlFor="productName"
										className="block text-sm font-medium text-gray-700 mt-5">
										Product Name
									</label>
									<Field
										value={initialValues?.productName}
										type="text"
										id="productName"
										name="productName"
										className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
									/>
									<ErrorMessage
										name="productName"
										component="div"
										className="text-red-500 text-base text-center my-3"
									/>
								</div>
								{/* product desc */}
								<div>
									<label
										htmlFor="productDesc"
										className="block text-sm font-medium text-gray-700">
										Description
									</label>
									<div className="relative">
										<Field
											value={initialValues?.productDesc}
											as="textarea"
											type="text"
											id="productDesc"
											name="productDesc"
											className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
										/>
									</div>
									<ErrorMessage
										name="productDesc"
										component="div"
										className="text-red-500 text-base text-center my-3"
									/>
								</div>
								{/* price */}
								<div>
									<label
										htmlFor="productPrice"
										className="block text-sm font-medium text-gray-700">
										Price
									</label>
									<div className="relative">
										<Field
                                            placeholder={initialValues?.productPrice}
											type="text"
											id="productPrice"
											name="productPrice"
											className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
										/>
									</div>
									<ErrorMessage
										name="productPrice"
										component="div"
										className="text-red-500 text-base text-center my-3"
									/>
								</div>
								{/* quantity */}
								<div>
									<label
										htmlFor="productQuantity"
										className="block text-sm font-medium text-gray-700">
										Quantity
									</label>
									<div className="relative">
										<Field
											value={
												initialValues?.productQuantity
											}
											type="text"
											id="productQuantity"
											name="productQuantity"
											className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
										/>
									</div>
									<ErrorMessage
										name="productQuantity"
										component="div"
										className="text-red-500 text-base text-center my-3"
									/>
								</div>
								{/* image */}
								<div>
									<div className="relative">
										<Dropdown>
											<DropdownTrigger>
												<Button variant="bordered">
													Select Product Image
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												variant="faded"
												aria-label="Dropdown menu with description">
												{ProductImage?.results.map(
													(item: any) => (
														<DropdownItem
															onClick={() =>
																handleProductImage(
																	item,
																	setFieldValue
																)
															}
															key={item.id}
															shortcut={
																item.name
															}>
															<Image
																src={item.image}
																width={50}
																height={50}
																alt=""
															/>
														</DropdownItem>
													)
												)}
												<DropdownItem
													key="delete"
													closeOnSelect>
													<Pagination
														isCompact
														showControls
														total={
															productImageLength
														}
														initialPage={1}
														page={currentPage}
														onChange={(page) =>
															setCurrentPage(page)
														}
													/>
												</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</div>
									<Image
										src={
											productImage === ""
												? productData?.image
												: productImage
										}
										alt="preview"
										width={250}
										height={250}
										className="rounded-lg mt-5"
									/>
								</div>

								{/* button */}
								<button
									type="submit"
									className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300">
									Update
								</button>
							</Form>
						)}
					</Formik>
					{/* <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                    Already have an account?{" "}
                    <a href="#" className="text-black hover:underline">
                        Login here
                    </a>
                </p>
            </div> */}
				</div>
			</div>
			<ToastContainer />
		</main>
	);
}
