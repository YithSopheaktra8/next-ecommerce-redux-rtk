/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
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
import { useAppSelector } from "@/redux/hook";
import { signOut, useSession } from "next-auth/react";

export default function App() {
	const session = useSession();
	const pathName = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();

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
			redirect("/login");
		}
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
					{session.status === "unauthenticated" ? (
						<Button
							as={Link}
							color="primary"
							href="/login"
							variant="flat">
							Login
						</Button>
					) : (
						<div className="flex items-center gap-4">
							<Dropdown placement="bottom-start">
								<DropdownTrigger>
									<User
										as="button"
										avatarProps={{
											isBordered: true,
											src: `${session.data?.user?.image}`,
										}}
										className="flex flex-col transition-transform md:flex-row"
										description={session.data?.user?.name}
										name={session.data?.user?.name}
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
											{session.data?.user?.email}
										</p>
									</DropdownItem>
									<DropdownItem key="settings">
										Dashboard
									</DropdownItem>
									<DropdownItem
										key="logout"
										color="danger"
										onClick={() => handleSignout()}>
										Log Out
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
						</div>
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
