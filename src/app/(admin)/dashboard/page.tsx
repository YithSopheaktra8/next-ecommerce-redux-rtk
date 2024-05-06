/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useAppSelector } from "@/redux/hook";
import {
	useDeleteProductMutation,
	useGetMyProductsQuery,
	useGetProductsQuery,
} from "@/redux/service/products";
import { ProductType } from "@/types/productType";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEye, FaEdit, FaSearch } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import Link from "next/link";
import LoadingComponent from "@/components/LoadingComponent";
import { Input } from "@nextui-org/react";

export default function Dashboard() {
	const [currentPage, setCurrentPage] = useState(1);
	const route = useRouter();
	const [deleteProduct, { isSuccess }] = useDeleteProductMutation();
	const { data, isLoading } = useGetMyProductsQuery({});
	const [filter, setFilter] = useState<ProductType[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	const columns: TableColumn<ProductType>[] = [
		{
			name: "Product Title",
			selector: (row) => row.title,
		},
		{
			name: "Price (USD)",
			selector: (row) => row.price,
			sortable: true,
		},
		{
			name: "Image",
			selector: (row): any => (
				<img className="w-16 h-16" src={row.image} alt={row.image} />
			),
			sortable: true,
		},
		{
			name: "Category",
			selector: (row) => row.category,
			sortable: true,
		},
		{
			name: "Action",
			selector: (row): any => (
				<Dropdown>
					<DropdownTrigger>
						<Button>...</Button>
					</DropdownTrigger>
					<DropdownMenu
						variant="faded"
						aria-label="Dropdown menu with description">
						<DropdownSection showDivider>
							<DropdownItem
								href={`/detail/${row.id}`}
								as={Link}
								key="new"
								description="View Product Detail"
								startContent={<FaEye size={30} />}>
								View
							</DropdownItem>
							<DropdownItem
								key="edit"
								description="Edit Product"
								startContent={<FaEdit size={30} />}>
								Edit
							</DropdownItem>
						</DropdownSection>
						<DropdownSection title="Danger zone">
							<DropdownItem
								onClick={() => {
									deleteProduct({ id: row.id });
								}}
								key="delete"
								className="text-danger"
								color="danger"
								description="Permanently delete the product"
								startContent={<MdDelete size={30} />}>
								Delete
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			),
		},
	];

	let dataTable: ProductType[] =
		data?.map((product: any) => ({
			id: product.id,
			title: product.name,
			image: product.image,
			price: product.price,
			description: product.desc,
			category: product.category,
		})) || [];

	const dataLength = dataTable.length;

	useEffect(() => {
		setFilter(dataTable);

		const filteredData = dataTable.filter((product) =>
			product.title.toLowerCase().includes(searchTerm.toLowerCase())
		);

		setFilter(filteredData);
	}, [data, searchTerm]);

	return (
		<div>
			{/* search */}
			<div className="px-24 mt-12"></div>

			<DataTable
				subHeader
				subHeaderComponent={
					<div className="w-screen flex px-24 gap-10">
						<Input
							onChange={(e) => setSearchTerm(e.target.value)}
							isClearable
							radius="lg"
							classNames={{
								label: "text-black/50 dark:text-white/90 border",
								input: [
									"bg-transparent",
									"text-black/90 dark:text-white/90",
									"placeholder:text-default-700/50 dark:placeholder:text-white/60",
								],
								innerWrapper: "bg-transparent",
								inputWrapper: [
									"shadow-xl",
									"bg-default-200/50",
									"dark:bg-default/60",
									"backdrop-blur-xl",
									"backdrop-saturate-200",
									"hover:bg-default-200/70",
									"dark:hover:bg-default/70",
									"group-data-[focused=true]:bg-default-200/50",
									"dark:group-data-[focused=true]:bg-default/60",
									"!cursor-text",
								],
							}}
							placeholder="Type to search..."
							startContent={<FaSearch />}
						/>
						<Button as={Link} href="/dashboard/create-product">
							Create New
						</Button>
					</div>
				}
				className="mt-5"
				progressPending={isLoading}
				progressComponent={<LoadingComponent />}
				responsive
				columns={columns}
				data={filter.slice((currentPage - 1) * 10, currentPage * 10)}
			/>
			{/* pagination */}
			<section className="w-full grid place-content-center h-auto inline-block mt-10">
				<div className="w-[500px]">
					<ResponsivePagination
						current={currentPage}
						total={Math.ceil(dataLength / 10)}
						onPageChange={setCurrentPage}
					/>
				</div>
			</section>
		</div>
	);
}
