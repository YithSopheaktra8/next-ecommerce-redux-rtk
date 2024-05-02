/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/lib/testimonals";
import CardComponent from "@/components/CardComponent";
import { useGetProductsQuery } from "@/redux/service/products";
import { useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { useAppSelector } from "@/redux/hook";

export default function Home() {
	const [currentPage, setCurrentPage] = useState(1);

	const words = "Fitness kits that help you keep fit.";
	const { data, error, isFetching, isLoading } = useGetProductsQuery({
		page: currentPage,
		pageSize: 8,
	});
	const totalPages = data?.total;


	// if (isLoading) return <LoadingComponent />;

	return (
		<main>
			{/* hero section */}
			<section className="relative pt-12 bg-gray-50 sm:pt-16 lg:py-36 lg:px-10 xl:py-48">
				<div className="absolute inset-0 hidden lg:block">
					<Image
						className="object-cover object-right w-full h-full sm:object-center lg:object-right-top lg:w-full lg:h-full"
						src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/4/background.png"
						alt="backgroud"
						width={1000}
						height={1000}
					/>
				</div>

				<div className="relative px-4 mx-auto sm:px-6 lg:px-8 ">
					<div className="max-w-lg mx-auto text-center lg:mx-0 lg:max-w-md lg:text-left">
						<p className="text-base font-bold text-gray-600">
							Use “FIT40” coupon to get 40% flat discount
						</p>
						<h1 className="mt-3 text-4xl font-bold text-gray-900 sm:mt-8 sm:text-5xl xl:text-7xl">
							{<TextGenerateEffect words={words} fontSize="" />}
						</h1>

						<div className="mt-8 sm:mt-12">
							<a
								href="#"
								title=""
								className="
                            inline-flex
                            items-center
                            justify-center
                            px-8
                            py-3
                            text-base
                            font-bold
                            leading-7
                            text-white
                            transition-all
                            duration-200
                            bg-gray-900
                            border border-transparent
                            rounded-md
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900
                            hover:bg-gray-600
                            focus:ring-offset-[#FFE942]
                        "
								role="button">
								Start shopping
							</a>
						</div>
					</div>

					<div className="mt-8 lg:hidden">
						<Image
							className="w-full mx-auto"
							src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/hero/4/bg.png"
							alt="backgroud"
							width={1000}
							height={1000}
						/>
					</div>
				</div>
			</section>

			{/* banner */}
			<section>
				<div className="pt-14 px-10">
					<div className="lg:max-w-[1540px] md:max-w-[744px] max-w-[375px] mx-auto bg-white relative md:px-6 px-4 py-7">
						<div className="lg:max-w-full md:max-w-[696px] max-w-[343px] mx-auto bg-gray-50">
							<div className="lg:flex md:flex block justify-between items-center">
								<div className="md:p-10 p-4">
									<p className="text-base leading-none text-gray-800">
										Save upto 30%
									</p>
									<p className="text-3xl font-semibold leading-9 text-gray-800 py-4">
										Summer Sale
									</p>
									<p className="text-base leading-normal text-gray-600">
										Want to save some cash and still look
										like a fashion diva ?
										<br />
										Checkout our summer sale now !!!
									</p>
								</div>
								<div className="md:p-10 p-4">
									<img
										src="https://tuk-cdn.s3.amazonaws.com/can-uploader/ec2.png"
										className="w-full h-full"
										alt="summer sale"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* banner */}
			<section>
				<div className="container mx-auto py-9 md:py-12 px-4 md:px-6">
					<div className="flex items-strech justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
						<div className="flex flex-col md:flex-row items-strech justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
							<div className="flex flex-col justify-center md:w-1/2">
								<h1 className="text-3xl font-semibold leading-9 text-gray-800">
									Best Deal
								</h1>
								<p className="text-base leading-normal text-gray-600">
									Save upto{" "}
									<span className="font-bold">50%</span>
								</p>
							</div>
							<div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
								<img
									src="https://i.ibb.co/J2BtZdg/Rectangle-56-1.png"
									alt="lamp"
								/>
							</div>
						</div>
						<div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
							<div className="flex flex-col justify-center">
								<h1 className="text-3xl font-semibold leading-9 text-gray-800">
									Game Console
								</h1>
								<p className="text-base leading-normal text-gray-600">
									Save Upto{" "}
									<span className="font-bold">30%</span>
								</p>
							</div>
							<div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
								<img
									src="https://i.ibb.co/rGfP7mp/Rectangle-59-1.png"
									alt="games"
									className="md:w-20 md:h-20 lg:w-full lg:h-full"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* review */}
			<section className="mt-10">
				<h2 className="text-center text-3xl font-semibold leading-9 text-gray-800 mb-10 uppercase">
					Customer Review
				</h2>
				<div className=" rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
					<InfiniteMovingCards
						items={testimonials}
						direction="left"
						speed="slow"
					/>
				</div>
			</section>

			{/* card section */}
			<section className="mt-10">
				<h2 className="text-center text-3xl font-semibold leading-9 text-gray-800 uppercase">
					Popular Product
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-screen px-[30px] md:[50px] lg:px-[30px] xl:px-[100px] gap-5 xl:gap-12 mt-14">
					{data?.results.map((product: any) => (
						<CardComponent
							key={product.id}
							title={product.name}
							description={product.desc}
							image={
								product.image === ""
									? "https://agrimart.in/uploads/vendor_banner_image/default.jpg"
									: product.image
							}
							price={product.price}
							id={product.id}
						/>
					))}
				</div>
			</section>

			{/* pagination */}
			<section className="w-full grid place-content-center h-auto inline-block mt-10">
				<div className="w-[500px]">
					<ResponsivePagination
						current={currentPage}
						total={totalPages}
						onPageChange={setCurrentPage}
					/>
				</div>
			</section>
		</main>
	);
}
