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
		],
	},
};

export default nextConfig;
