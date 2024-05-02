/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hook";
import ProductCart from "@/components/ProductCart";
import { Button } from "@nextui-org/button";

export default function Cart() {
	const ShippingTax = 65;
	const products = useAppSelector((state) => state.cart.products);
	const subTotalPrice = useAppSelector((state) => state.cart.totalPrice);
	const totalPrice =
		useAppSelector((state) => state.cart.totalPrice) - ShippingTax;
	const route = useRouter();

	return (
		<>
			<main
				className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden"
				id="chec-div">
				<div
					className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
					id="checkout">
					<div className="flex md:flex-row flex-col ">
						<div
							className=" w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
							id="scroll">
							<div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="icon icon-tabler icon-tabler-chevron-left"
									width={16}
									height={16}
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									fill="none"
									strokeLinecap="round"
									strokeLinejoin="round">
									<path
										stroke="none"
										d="M0 0h24v24H0z"
										fill="none"
									/>
									<polyline points="15 6 9 12 15 18" />
								</svg>
								<button
									onClick={() => route.push("/")}
									className="text-sm pl-2 leading-none">
									Back
								</button>
							</div>
							<p className="text-5xl font-black leading-10 text-gray-800 pt-3">
								Shopping Cart
							</p>
							{products.length === 0 ? (
								<p className="text-3xl leading-10  text-gray-800 pt-3 text-center mt-10">
									No items in your cart
								</p>
							) : (
								products.map((product) => (
									<ProductCart
										key={product.id}
										title={product.title}
										price={product.price}
										image={product.image}
										id={product.id}
										description={product.title}
									/>
								))
							)}
						</div>
						<div className="lg:w-[600px] md:w-1/3 w-full bg-gray-100 h-full">
							<div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
								<div>
									<p className="text-4xl font-black leading-9 text-gray-800">
										Summary
									</p>
									<div className="flex items-center justify-between pt-16">
										<p className="text-base leading-none text-gray-800">
											Subtotal
										</p>
										<p className="text-base leading-none text-gray-800">
											$
											{products.length === 0
												? 0
												: subTotalPrice}
										</p>
									</div>
									<div className="flex items-center justify-between pt-5">
										<p className="text-base leading-none text-gray-800">
											Shipping
										</p>
										<p className="text-base leading-none text-gray-800">
											$30
										</p>
									</div>
									<div className="flex items-center justify-between pt-5">
										<p className="text-base leading-none text-gray-800">
											Tax
										</p>
										<p className="text-base leading-none text-gray-800">
											$35
										</p>
									</div>
								</div>
								<div>
									<div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
										<p className="text-2xl leading-normal text-gray-800">
											Total
										</p>
										<p className="text-2xl font-bold leading-normal text-right text-gray-800">
											$
											{products.length === 0
												? 0
												: totalPrice}
										</p>
									</div>
									<button className="text-base rounded-xl leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
										Checkout
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<style>
				{` /* width */
                #scroll::-webkit-scrollbar {
                    width: 1px;
                }

                /* Track */
                #scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                #scroll::-webkit-scrollbar-thumb {
                    background: rgb(133, 132, 132);
                }
`}
			</style>
		</>
	);
}
