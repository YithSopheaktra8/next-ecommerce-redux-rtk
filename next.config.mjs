/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "fakestoreapi.com",
				pathname: "/img/*",
			},
			{
				protocol: "https",
				hostname: "cdn.rareblocks.xyz",
				pathname: "/collection/clarity-ecommerce/images/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.shopify.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.ctfassets.net",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "www.datocms-assets.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.prismic.io",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.contentful.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.vercel.app",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.now.sh",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.cloudfront.net",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.wp.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.blogspot.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.ggpht.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.wikimedia.org",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.flickr.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.staticflickr.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "*.imgur.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "store.istad.co",
				pathname: "/media/**",
			},
		],
		domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com"],
	},
};

export default nextConfig;
