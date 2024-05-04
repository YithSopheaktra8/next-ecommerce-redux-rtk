"use client";
import { useGetProductByIdQuery } from "@/redux/service/products";
import { ProductType } from "@/types/productType";
import Image from "next/image";

type Params = {
	params: { id: string };
};

export default function ProductCardDetailComponent(params: Params) {
	const { data } = useGetProductByIdQuery(params.params.id);

	return (
		<main>
			<div className="font-sans bg-gray-50">
				<div className="px-24 py-32">
					<div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
						<div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
							<div className="bg-gray-50 px-4  rounded-xl">
								<Image
									width={500}
									height={500}
									src={data?.image}
									alt={data?.name}
									className="w-4/5 h-[500px] rounded object-cover object-center"
								/>
							</div>
						</div>

						<div className="lg:col-span-2">
							<h2 className="text-3xl font-semibold ">
								{data?.name}
							</h2>
							<div className="flex flex-wrap gap-4 mt-4">
								<p className=" text-4xl font-semibold">${data?.price}</p>
								<p className="text-gray-400 text-xl">
									<span>${30 + parseFloat(`${data?.price}`)}</span>
									<span className="text-sm ml-1">
										Tax included
									</span>
								</p>
							</div>

							<div className="flex space-x-2 mt-4">
								<svg
									className="w-5 fill-yellow-300"
									viewBox="0 0 14 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
								</svg>
								<svg
									className="w-5 fill-yellow-300"
									viewBox="0 0 14 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
								</svg>
								<svg
									className="w-5 fill-yellow-300"
									viewBox="0 0 14 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
								</svg>
								<svg
									className="w-5 fill-yellow-300"
									viewBox="0 0 14 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
								</svg>
								<svg
									className="w-5 fill-[#CED5D8]"
									viewBox="0 0 14 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
								</svg>
								<h4 className=" text-base">500 Reviews</h4>
							</div>

							<div className="flex flex-wrap gap-4 mt-8">
								<button
									type="button"
									className="min-w-[200px] px-4 py-2.5 border border-gray-900 bg-transparent  text-sm font-semibold rounded">
									Add to cart
								</button>
							</div>

							<div className="mt-8">
								<h3 className="text-lg font-semibold ">
									About the {data?.name}
								</h3>
								<ul className="space-y-3 list-disc mt-4 pl-4 text-sm ">
									<li>{data?.desc || "No description"}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
