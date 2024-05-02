import NextImage from "next/image";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import { ProductType } from "@/types/productType";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/features/cart/cartSlice";

export default function CardComponent(
	{ title, price, image, description, id }: ProductType,
	{ isLoading }: { isLoading: boolean }
) {
	const dispatch = useAppDispatch();

	return (
		<div className="w-full">
			<Card shadow="sm" key={id} isPressable isBlurred isHoverable>
				<CardBody className="overflow-visible p-0">
					<Image
						shadow="sm"
						radius="lg"
						width="100%"
						alt={title}
						className="w-[500px] object-cover h-[350px]"
						src={image}
					/>
				</CardBody>
				<CardFooter className="text-small justify-between items-start">
					<p className="text-base ">{title}</p>
					<div>
						<p className="text-base">${price}</p>
						<button
							className="w-full flex justify-between  font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50"
							onClick={() =>
								dispatch(addToCart({ id, image, title, price }))
							}>
							<span className="text-base">Add to Cart</span>
						</button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
