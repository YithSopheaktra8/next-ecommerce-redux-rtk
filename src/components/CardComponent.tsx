import Image from "next/image";
import { ProductType } from "@/types/productType";
import { useAppDispatch } from "@/redux/hook";
import { addToCart } from "@/redux/features/cart/cartSlice";

export default function CardComponent({
	title,
	price,
	image,
	description,
	id,
}: ProductType, { isLoading }: { isLoading: boolean }) {

	const dispatch = useAppDispatch();

	return (
		<div className="w-full flex items-center justify-center h-[450px]  rounded-lg  ">
			<article className="max-w-sm w-full h-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
				<div>
					<Image
						className="object-cover h-64 w-full transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 transform duration-300"
						src={image}
						alt={title}
						draggable="false"
						width={250}
						height={250}
					/>
				</div>

				<div className="flex flex-col gap-1 mt-4 px-4">
					<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">
						{title}
					</h2>
					<span className="font-normal text-gray-600 dark:text-gray-300 line-clamp-1">
						{description? description : "No description"}
					</span>
					<span className="font-semibold text-gray-800 dark:text-gray-50">
						${price}
					</span>
				</div>

				<div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
					<button className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50"
					onClick={()=>dispatch(addToCart({id,image,title,price}))}>
						<span className="text-base">Add to Cart</span>
						<svg
							className="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 6v6m0 0v6m0-6h6m-6 0H6"
							/>
						</svg>
					</button>
				</div>
			</article>
		</div>
	);
}
