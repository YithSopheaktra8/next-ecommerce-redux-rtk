/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
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
import {  useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { signOut, useSession } from "next-auth/react";
import { clearAccessToken } from "@/redux/features/token/tokenSlice";
import { cookies } from "next/headers";
import Link from "next/link";

import type { UserProfile } from "@/types/userType";
import {
	useGetMyProductsQuery,
	useGetProductsQuery,
	useGetUserProfileQuery,
} from "@/redux/service/products";

export default function NavbarComponent() {
	const dispatch = useAppDispatch();
	const session = useSession();
	const pathName = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();
	const { data : userProfileData,  isSuccess } = useGetUserProfileQuery({});

	let userProfile: UserProfile;
	if (session.data != null) {
		userProfile = {
			userAvatar: session.data?.user?.image || "",
			userBio: session.data?.user?.name || "",
			userEmail: session.data?.user?.email || "",
			userUsername: session.data?.user?.name || "",
		};
	} else if (isSuccess) {
		userProfile = {
			userAvatar: userProfileData.profile.avatar || "",
			userBio: userProfileData.profile.bio || "",
			userEmail: userProfileData.email || "",
			userUsername: userProfileData.last_name || "",
		};
	} else {
		userProfile = {
			userAvatar: "",
			userBio: "",
			userEmail: "",
			userUsername: "",
		};
	}

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

	const cart = useAppSelector((state) => state.cart.totalItems);

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
		signOut();
		router.push("/login");
	};


	useEffect(() => {
		
	}, [userProfileData, session.data]);

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
					<a color="foreground" href="/dashboard">
						My Shop
					</a>
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
							{cart}
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
											src: userProfile.userAvatar,
										}}
										className="flex flex-col transition-transform md:flex-row"
										description={userProfile.userBio}
										name={userProfile.userUsername}
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
											{userProfile.userUsername}
										</p>
									</DropdownItem>
									{userProfile.userEmail == "" ? (
										<DropdownItem
											key="login"
											onClick={() =>
												router.push("/login")
											}>
											<Link href="/login" color="primary">
												Login
											</Link>
										</DropdownItem>
									) : (
										<DropdownItem
											key="logout"
											color="danger"
											onClick={() => handleLogout()}>
											Log Out
										</DropdownItem>
									)}
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
							href={item.path}>
							{item.name}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
