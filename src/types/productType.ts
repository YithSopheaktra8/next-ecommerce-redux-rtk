type CatageoryType = {
	name: string;
	icon: string;
};

type ProductPostType = {
	category: CatageoryType;
	name: string;
	desc: string;
	image: string;
	price: number;
	quantity: number;
};

type ProductType = {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
};

type CartProductType = {
	title: string;
	image: string;
	price: number;
	id: number;
	onClick?: () => void;
};


export type { CatageoryType, ProductPostType, ProductType , CartProductType };
