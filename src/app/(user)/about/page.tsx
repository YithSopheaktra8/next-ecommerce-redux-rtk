"use client"
import React from "react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hook";

export default function About() {

	const acess = useAppSelector((state) => state.accessToken.token);
	console.log("about :",acess)

	return (
		<main>
			<AuroraBackground>
				<motion.div
					initial={{ opacity: 0.0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						delay: 0.1,
						duration: 0.8,
						ease: "easeInOut",
					}}
					className="relative flex flex-col gap-4 items-center justify-center px-4">
					<div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
						We Provide The Best Experience For You
					</div>
					<div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
						Come and experience the best of our products
					</div>
					<button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
						Shop now
					</button>
				</motion.div>
			</AuroraBackground>
			<div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
				<div className="lg:w-10/12 w-full">
					<p className="font-normal text-sm leading-3 text-blue-700 dark:text-indigo-500 hover:text-indigo-800 cursor-pointer">
						About
					</p>
					<h1 className="xl:w-8/12 lg:w-10/12 w-full font-bold text-gray-800 dark:text-white lg:text-4xl text-3xl lg:leading-10 leading-9 mt-2">
						We are here to make great experience accessible and
						delightfull for everyone
					</h1>
					<p className="font-normal text-base leading-6 text-gray-600 dark:text-white mt-6">
						At KhStore, we believe in more than just transactions;
						we believe in building relationships. Our journey began
						with a simple idea: to provide customers with a curated
						selection of premium products combined with exceptional
						service.
					</p>
				</div>

				<div className="lg:mt-14 sm:mt-10 mt-12">
					<Image
						className="lg:block hidden w-full"
						src="https://i.ibb.co/GvwJnvn/Group-736.png"
						alt="Group of people Chilling"
						width={500}
						height={500}
					/>
					<Image
						className="lg:hidden sm:block hidden w-full"
						src="https://i.ibb.co/5sZTmHq/Rectangle-116.png"
						alt="Group of people Chilling"
						width={500}
						height={500}
					/>
					<Image
						className="sm:hidden block w-full"
						src="https://i.ibb.co/zSxXJGQ/Rectangle-122.png"
						alt="Group of people Chilling"
						width={500}
						height={500}
					/>
				</div>

				<div className="lg:mt-16 sm:mt-12 mt-16 flex lg:flex-row justify-between flex-col lg:gap-8 gap-12">
					<div className="w-full xl:w-5/12 lg:w-6/12">
						<h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-white">
							Our Story
						</h2>
						<p className="font-normal text-base leading-6 text-gray-600 dark:text-white mt-4">
							Established in 2024, KhStore was born out of a
							passion for Community Engagemen. What started as a
							humble endeavor has since grown into a trusted
							destination for Exceptional Service: Customer
							satisfaction is our top priority. Our dedicated team
							is here to assist you at every step of your shopping
							journey, from browsing to post-purchase support.
							enthusiasts worldwide.
						</p>
						<p className="font-normal text-base leading-6 text-gray-600 dark:text-white mt-6">
							It is a long established fact that a reader will be
							distracted by the readable content of a page when
							looking at its layout. The point of using Lorem
							Ipsum.In the first place we have granted to God, and
							by this our present charter confirmed for us and our
							heirs forever that the English Church shall be free,
							and shall have her rights entire, and her liberties
							inviolate; and we will that it be thus observed;
							which is apparent from
						</p>
					</div>
					<div className="lg:flex items-center w-full lg:w-1/2">
						<Image
							className="lg:block hidden w-full"
							src="https://i.ibb.co/2kxWpNm/Group-740.png"
							alt="people discussing on board"
							width={500}
							height={500}
						/>
						<Image
							className="lg:hidden sm:block hidden w-full h-3/4"
							src="https://i.ibb.co/ZLgK3NQ/Group-788.png"
							alt="people discussing on board"
							width={500}
							height={500}
						/>
						<Image
							className="sm:hidden block w-full"
							src="https://i.ibb.co/9g2R7Xr/Group-803.png"
							alt="people discussing on board"
							width={500}
							height={500}
						/>
					</div>
				</div>
				<div className="2xl:mx-auto 2xl:container py-12 lg:px-20 md:px-6 px-4">
					<div className="w-full flex flex-col justify-center items-center">
						<div className="flex flex-col justify-center items-center text-center space-y-4">
							<h1 className="text-3xl lg:text-4xl font-semibold dark:text-white leading-9 md:leading-7 lg:leading-9 text-gray-800">
								Frequently Asked Questions
							</h1>
							<p className="text-base leading-6 text-center dark:text-gray-400 text-gray-600 w-full md:w-10/12">
								Here are few of the most frequently asked
								questions by our valueable customers
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-6 justify-items-around gap-x-6 gap-y-6 xl:gap-y-0 xl:gap-x-8 mt-10">
							<button className="dark:focus:border-white w-full focus:outline-none border dark:bg-gray-800 focus:border-gray-800 border-transparent bg-gray-50 flex justify-center items-center flex-col text-center py-10 px-12 space-y-6">
								<Image
									className="dark:hidden"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/ecom-faq-3-svg1.svg"
									alt="Shipping"
									width={100}
									height={100}
								/>
								<Image
									className="hidden dark:block"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/ecom-faq-3-svg1dark.svg"
									alt="Shipping"
									width={100}
									height={100}
								/>
								<p className="text-xl font-medium leading-5 dark:text-white text-gray-800">
									Shipping
								</p>
							</button>
							<button className="dark:focus:border-white w-full focus:outline-none border dark:bg-gray-800 focus:border-gray-800 border-transparent bg-gray-50 flex justify-center items-center flex-col text-center py-10 px-12 space-y-6">
								<Image
									className="dark:hidden"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/ecom-faq-3-svg2.svg"
									alt="Payment"
									width={100}
									height={100}
								/>
								<Image
									className="hidden dark:block"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-3-svg2dark.svg"
									alt="Payment"
									width={100}
									height={100}
								/>
								<p className="text-xl font-medium leading-5 dark:text-white text-gray-800">
									Payment
								</p>
							</button>
							<button className="dark:focus:border-white w-full focus:outline-none border dark:bg-gray-800 focus:border-gray-800 border-transparent bg-gray-50 flex justify-center items-center flex-col text-center py-10 px-12 space-y-6">
								<Image
									className="dark:hidden"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/89gbwe.png"
									alt="Account"
									width={100}
									height={100}
								/>
								<Image
									className="hidden dark:block"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-3-svg3dark.svg"
									alt="Account"
									width={100}
									height={100}
								/>
								<p className="text-xl font-medium leading-5 dark:text-white text-gray-800">
									Account
								</p>
							</button>
							<button className="dark:focus:border-white w-full focus:outline-none border dark:bg-gray-800 focus:border-gray-800 border-transparent bg-gray-50 flex justify-center items-center flex-col text-center py-10 px-12 space-y-6">
								<Image
									className="dark:hidden"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/trwvghy.png"
									alt="Products"
									width={100}
									height={100}
								/>
								<Image
									className="hidden dark:block"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-3-svg4dark.svg"
									alt="Products"
									width={100}
									height={100}
								/>
								<p className="text-xl font-medium leading-5 dark:text-white text-gray-800">
									Products
								</p>
							</button>
							<button className="dark:focus:border-white w-full focus:outline-none border dark:bg-gray-800 focus:border-gray-800 border-transparent bg-gray-50 flex justify-center items-center flex-col text-center py-10 px-12 space-y-6">
								<Image
									className="dark:hidden"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/m23fg.png"
									alt="Return Policy"
									width={100}
									height={100}
								/>
								<Image
									className="hidden dark:block"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-3-svg5dark.svg"
									alt="Return Policy"
									width={100}
									height={100}
								/>
								<p className="text-xl w-40 font-medium leading-5 dark:text-white text-gray-800">
									Return Policy
								</p>
							</button>
							<button className="dark:focus:border-white w-full focus:outline-none border dark:bg-gray-800 focus:border-gray-800 border-transparent bg-gray-50 flex justify-center items-center flex-col text-center py-10 px-12 space-y-6">
								<Image
									className="dark:hidden"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/vadd.png"
									alt="Contact"
									width={100}
									height={100}
								/>
								<Image
									className="hidden dark:block"
									src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-3-svg6dark.svg"
									alt="Contact"
									width={100}
									height={100}
								/>
								<p className="text-xl w-40 font-medium leading-5 dark:text-white text-gray-800">
									Contact
								</p>
							</button>
						</div>

						<div className="mt-16 flex justify-start flex-col items-start w-full text-left space-y-8">
							<div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
								<h3 className="text-xl font-medium leading-7 dark:text-white md:leading-5 text-left text-gray-800">
									How long does it take for my package to
									arrive?
								</h3>
								<p className="mt-6 text-base leading-6 dark:text-gray-400 text-gray-600">
									For sterling silver items, your order will
									be delivered within 7 to 10 business days,
									including production and delivery, after you
									place an order.
								</p>
								<br />
								<p className="text-base leading-6 dark:text-gray-400 text-gray-600">
									For sterling silver items, your order will
									be delivered within 7 to 10 business days,
									including production and delivery, after you
									place an order.
								</p>
							</div>
							<hr className="border border-gray-100 w-full" />
							<div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
								<h3 className="text-xl font-medium leading-7 dark:text-white md:leading-5 text-left text-gray-800">
									Where is my order?
								</h3>
								<p className="mt-6 text-base leading-6 dark:text-gray-400 text-gray-600">
									Remeber you can query the staus of your
									oders any time in My orders in the My
									aacount section.l if you are not resigered
									at Mango.com, you can access dierectly in
									the Orders section. In this cause, you will
									have enter your em-mail address and order
									number.
								</p>
								<br />
								<p className="text-base leading-6 dark:text-gray-400 text-gray-600">
									What is more, when your order leaves our
									wharehouses, we will send you an e-mail.
								</p>
							</div>
							<hr className="border border-gray-100 w-full" />
							<div className="flex justify-start items-start flex-col text-left w-full xl:w-8/12">
								<h3 className="text-xl font-medium leading-7 dark:text-white md:leading-5 text-left text-gray-800">
									Can I cancel or change my Order?
								</h3>
								<p className="mt-6 text-base leading-6 dark:text-gray-400 text-gray-600">
									Yes, you can change or cancel your order
									within the first 10 days of your order
									placement.
								</p>
							</div>
							<hr className="border border-gray-100 w-full" />
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
