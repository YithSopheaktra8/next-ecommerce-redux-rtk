/* eslint-disable @next/next/no-img-element */
import { useAppDispatch } from "@/redux/hook";
import { ProductType } from "@/types/productType";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hook";
import {
	addToCart,
	removeFromCart,
	increment,
	decrement,
} from "@/redux/features/cart/cartSlice";

export default function ProductCart({
	image,
	title,
	price,
	id,
	description,
}: ProductType) {
	const dispatch = useAppDispatch();
	const products = useAppSelector((state) => state.cart.totalItems);
	let [quantity, setQuantity] = useState(1);

	const handleIncrement = (id: number) => {
		setQuantity((quantity += 1));
		dispatch(increment(id));
	};

	const handleDecrement = (id: number) => {
		setQuantity((quantity -= 1));
		if (quantity < 1) {
			handleRemoveFromCart(id);
		}
		dispatch(decrement(id));
	};

	const handleRemoveFromCart = (id: number) => {
		dispatch(removeFromCart(id));
	};

	return (
		<div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
			<div className="md:w-1/4 ">
				<img
					src={image}
					alt="asd"
					className="w-full h-full object-center object-cover rounded-lg"
				/>
			</div>
			<div className="md:pl-3 md:w-3/4">
				<p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">
					RF{id}
				</p>
				<div className="flex items-center justify-between w-full pt-1">
					<p className="text-2xl font-black leading-none text-gray-800">
						{title}
					</p>
				</div>
				<p className="w-96 mt-5 text-xs leading-3 text-gray-600">
					{description ? description : "No description"}
				</p>
				<div className="flex items-center justify-between pt-5 pr-6">
					<div className="flex flex-col">
						<p className="text-base font-black leading-none text-gray-800">
							${price}
						</p>
						<div className=" rounded-md flex mt-5 ">
							<button
								className="text-2xl text-black cursor-pointer border w-[40px]"
								onClick={() => handleDecrement(id)}>
								-
							</button>
							<p className="border text-lg px-3 text-center">
								{quantity}
							</p>
							<button
								className="text-2xl text-black cursor-pointer border w-[40px]"
								onClick={() => handleIncrement(id)}>
								+
							</button>
						</div>
					</div>
					<Button
						onClick={() => handleRemoveFromCart(id)}
						className="text-xs leading-3 bg-red-500 text-white pl-5 cursor-pointer">
						Remove
					</Button>
				</div>
			</div>
		</div>
	);
}
