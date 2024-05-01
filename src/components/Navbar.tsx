"use client";

import React from "react";
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
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

export default function App() {
	const pathName = usePathname();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const menuItems = [
		"Home",
        "About",
        "Policy",
        "My Shop",
		"Log Out",
	];
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
					<p className="font-bold text-inherit">ACME</p>
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
				<NavbarItem>
					<Button as={Link} color="primary" href="#" variant="flat">
						Sign Up
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
