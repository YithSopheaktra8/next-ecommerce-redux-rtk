/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Link,
	Button,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Image,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Avatar,
	User,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcemeLogo";
import { redirect, useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { signOut, useSession } from "next-auth/react";
import { clearAccessToken } from "@/redux/features/token/tokenSlice";
import { cookies } from "next/headers";
import { useUserProfileQuery } from "@/redux/service/auth";
import {
	selectAvatar,
	selectBio,
} from "@/redux/features/userProfile/userProfileSlice";
import {
	addUser,
	fetchUserProfile,
} from "@/redux/features/userProfile/userProfileSlice";

export default function NavbarComponent() {
	const dispatch = useAppDispatch();
	const session = useSession();
	const pathName = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();
	const userAvatar = useAppSelector(selectAvatar);
	const userBio = useAppSelector(selectBio);
	const userProfile = useAppSelector((state) => state.userProfile);

	const menuItems = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "About",
			path: "/about",
		},
		{
			name: "Policy",
			path: "/policy",
		},
		{
			name: "My Shop",
			path: "/dashboard",
		},
	];

	const cart = useAppSelector((state) => state.cart.products);
	let cartLength = cart.length;

	const handleSignout = async () => {
		const isSignout = await signOut();
		if (isSignout) {
			signOut();
			router.push("/login");
		}
	};

	const handleLogout = async () => {
		fetch(process.env.NEXT_PUBLIC_BASE_URL_LOCALHOST + "/logout", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Response data from logout", data);
			})
			.catch((error) => {
				console.error("Refresh Token error:", error);
			});
		dispatch(clearAccessToken());
		router.push("/login");
	};

	return (
		<Navbar
			shouldHideOnScroll
			className="bg-white"
			onMenuOpenChange={setIsMenuOpen}>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="sm:hidden"
				/>
				<NavbarBrand>
					<AcmeLogo />
					<p className="font-bold text-inherit">I-SHOP</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem isActive={pathName === "/"}>
					<Link color="foreground" href="/">
						Home
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === "/about"}>
					<Link color="foreground" href="/about">
						About Us
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === "/policy"}>
					<Link color="foreground" href="/policy">
						Policy
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathName === "/dashboard"}>
					<Link color="foreground" href="/dashboard">
						My Shop
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="flex items-center gap-5">
					<button onClick={() => router.push("/cart")}>
						<Image
							src="/icons/cart.png"
							alt="backgroud"
							width={30}
							height={30}
						/>
						<span className="self-center grid place-content-center whitespace-nowrap text-medium font-medium text-white bg-black w-[25px] h-[25px] rounded-full absolute top-1 ml-5">
							{cartLength}
						</span>
					</button>
					{true ? (
						<div className="flex items-center gap-4">
							<Dropdown placement="bottom-start">
								<DropdownTrigger>
									<User
										as="button"
										avatarProps={{
											isBordered: true,
											src: `${
												session.data === null
													? userAvatar
													: session.data?.user?.image
											}`,
										}}
										className="flex flex-col transition-transform md:flex-row"
										description={
											session.data === null
												? userBio
												: session.data?.user?.name
										}
										name={
											session.data === null
												? ""
												: session.data?.user?.name
										}
									/>
								</DropdownTrigger>
								<DropdownMenu
									aria-label="User Actions"
									variant="flat">
									<DropdownItem
										key="profile"
										className="h-14 gap-2">
										<p className="font-bold">
											Signed in as
										</p>
										<p className="font-bold">
											{session.data === null
												? "User"
												: session.data?.user?.email}
										</p>
									</DropdownItem>
									<DropdownItem
										key="login"
										onClick={() => {
											router.push("/login");
										}}>
										Login
									</DropdownItem>
									<DropdownItem
										key="logout"
										color="danger"
										onClick={() => {
											session.data === null
												? handleLogout()
												: handleSignout();
										}}>
										Log Out
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
					) : (
						<Button
							href="/login"
							as={Link}
							color="primary"
							variant="flat">
							Login
						</Button>
					)}
				</NavbarItem>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link

							color={
								index === 2
									? "primary"
									: index === menuItems.length - 1
									? "danger"
									: "foreground"
							}
							className="w-full"
							href={item.path}
							size="lg">
							{item.name}
						
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
