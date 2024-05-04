/* eslint-disable @next/next/no-img-element */
"use client";
import { useGetProductsQuery } from "@/redux/service/products";
import { ProductType } from "@/types/productType";
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FaEye, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Dashboard() {
	const [currentPage, setCurrentPage] = useState(1);

	const { data } = useGetProductsQuery({
		page: currentPage,
		pageSize: 8,
	});

	console.log(data.results.id);

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
								key="delete"
								className="text-danger"
								color="danger"
								description="Permanently delete the file"
								startContent={<MdDelete size={30} />}>
								Delete file
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			),
		},
	];

	const dataTable: ProductType[] = [
		{
			id: data.results?.id,
			title: data.results?.name,
			image: data.results?.image,
			price: data.results?.price,
			description: data.results?.desc,
			category: data.results?.category,
		},
	];

	console.log(dataTable)

	const dataTable2: ProductType[] = [
		{
			id: 1,
			title: "Ad",
			image: "asd",
			price: 22,
			description: "Asd",
			category: "asd",
		},
	];

	return (
		<div>
			<DataTable
				responsive
				pagination
				columns={columns}
				data={dataTable2}
			/>
		</div>
	);
}
