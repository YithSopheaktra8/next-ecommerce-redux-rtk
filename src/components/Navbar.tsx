"use client";

import React from "react";
import Image from "next/image";
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
} from "@nextui-org/react";
import { AcmeLogo } from "./AcemeLogo";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/hook";

export default function App() {
	const pathName = usePathname();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const menuItems = ["Home", "About", "Policy", "My Shop", "Log Out"];
	const router = useRouter();

	const cart = useAppSelector((state) => state.cart.products);
	let cartLength = cart.length;

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
				<NavbarItem isActive={pathName === "/myshop"}>
					<Link color="foreground" href="/myshop">
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
					<Button as={Link} color="primary" href="#" variant="flat">
						Login
					</Button>
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
							href={`/${item.toLowerCase().replace(" ", "")}`}
							size="lg">
							{item}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
