/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "fakestoreapi.com",
				pathname: "/img/*",
			},
            {
                protocol: "https",
				hostname: "cdn.rareblocks.xyz",
				pathname: "/collection/clarity-ecommerce/images/**",
            }
		],
		domains: ["avatars.githubusercontent.com", "lh3.googleusercontent.com",],
	},
};

export default nextConfig;
