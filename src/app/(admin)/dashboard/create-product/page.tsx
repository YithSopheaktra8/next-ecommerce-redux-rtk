/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
	Formik,
	Form,
	Field,
	ErrorMessage,
	useFormikContext,
	useFormik,
} from "formik";
import * as Yup from "yup";
import { useSession, signIn, signOut } from "next-auth/react";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Image,
	Pagination,
} from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { LoginRequest } from "@/types/userType";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
	productApi,
	useCreateProductMutation,
	useGetProductsCategoryQuery,
	useGetProductsImageQuery,
	useUploadCategoryImageMutation,
	useUploadProductImageMutation,
} from "@/redux/service/products";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import constructWithOptions from "styled-components/dist/constructors/constructWithOptions";
import { toast } from "react-toastify";

type ValueTypes = {
	productName: string;
	productDesc: string;
	productPrice: number;
	productQuantity: number;
	productImage: string;
	productCategoryName: string;
	productCategoryIcon: string;
};

const validationSchema = Yup.object().shape({
	productName: Yup.string().required("Product Name is required"),
	productDesc: Yup.string().required("Description is required"),
	productPrice: Yup.number().required("Price is required"),
	productQuantity: Yup.number().required("Quantity is required"),
	productCategoryName: Yup.string().required("Category Name is required"),
});

const uploadInitialValues = {
	name: "",
	file: null,
};

const uploadValidationSchema = Yup.object().shape({
	file: Yup.mixed().required("File is required"),
});

export default function CreateProduct() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [categoryCurrentPage, setCategoryCurrentPage] = useState(1);
	const { data } = useGetProductsImageQuery({
		page: currentPage,
		pageSize: 5,
	});
	const { data: categoryData } = useGetProductsCategoryQuery({
		page: categoryCurrentPage,
		pageSize: 5,
	});

	const [
		uploadProductImage,
		{ data: productImageData, isLoading: productImageLoading },
	] = useUploadProductImageMutation();

	const [
		uploadCategoryImage,
		{ data: categoryImageData, isLoading: categoryImageLoading },
	] = useUploadCategoryImageMutation();

	const [createProduct, { data: productData, isSuccess: productSuccess }] =
		useCreateProductMutation();
	const categoryLength = categoryData?.total;
	const productImageLength = data?.total;
	const [productImage, setProductImage] = useState(
		"https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
	);
	const [categoryImage, setCategoryImage] = useState(
		"https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png"
	);

	const notifySuccess = () =>
		toast.success("Success!", {
			position: "top-center",
		});

	const handleProductImage = (product: any, setFieldValue: any) => {
		setFieldValue("productImage", product.image);
		setProductImage(product.image);
	};

	const handleCategoryImage = (category: any, setFieldValue: any) => {
		setFieldValue("productCategoryIcon", category.image);
		setCategoryImage(category.image);
	};

	const handleCreateProduct = (product: any) => {
		createProduct({
			newProduct: {
				category: {
					name: product.productCategoryName,
					icon: product.productCategoryIcon,
				},
				name: product.productName,
				desc: product.productDesc,
				image: product.productImage,
				price: product.productPrice,
				quantity: product.productQuantity,
			},
		});

		router.push("/dashboard");
		notifySuccess();
	};

	const initialValues: ValueTypes = {
		productName: "",
		productDesc: "",
		productPrice: 0,
		productQuantity: 0,
		productImage: "",
		productCategoryName: "",
		productCategoryIcon: "",
	};

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
									const filenameWithoutExtension =
										value.name.split(".")[0];
									const formData = new FormData();
									formData.append("image", value.file);
									formData.append(
										"name",
										filenameWithoutExtension
									);
									uploadProductImage({
										image: formData,
									});
									uploadCategoryImage({
										image: formData,
									});
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
												htmlFor="productName"
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
							handleCreateProduct(value);
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
												{data?.results.map(
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
										src={productImage}
										alt="preview"
										width={250}
										height={250}
										className="rounded-lg mt-5"
									/>
								</div>
								{/* category name */}
								<div>
									<label
										htmlFor="productCategoryName"
										className="block text-sm font-medium text-gray-700">
										Category Name
									</label>
									<div className="relative">
										<Field
											type="text"
											id="productCategoryName"
											name="productCategoryName"
											className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
										/>
									</div>
									<ErrorMessage
										name="productCategoryName"
										component="div"
										className="text-red-500 text-base text-center my-3"
									/>
								</div>
								{/* category icon */}
								<div>
									<div className="relative">
										<Dropdown>
											<DropdownTrigger>
												<Button variant="bordered">
													Select Category Icon
												</Button>
											</DropdownTrigger>
											<DropdownMenu
												closeOnSelect
												variant="faded"
												aria-label="Dropdown menu with description">
												{categoryData?.results.map(
													(item: any) => (
														<DropdownItem
															onClick={() =>
																handleCategoryImage(
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
																alt={item.name}
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
														total={categoryLength}
														initialPage={1}
														page={
															categoryCurrentPage
														}
														onChange={(page) =>
															setCategoryCurrentPage(
																page
															)
														}
													/>
												</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</div>
									<Image
										src={categoryImage}
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
									Create
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
		</main>
	);
}

const CustomInput = ({ field, form, setFieldValue }: any) => {
	const [imagePreview, setImagePreview] = useState("");

	const handleUploadeFile = (e: any) => {
		console.log(e);
		const file = e.target.files[0];
		const localUrl = URL.createObjectURL(file);
		console.log(localUrl);
		setImagePreview(localUrl);

		setFieldValue(field.name, file);
	};
	return (
		<div>
			<input onChange={(e) => handleUploadeFile(e)} type="file" />
		</div>
	);
};
