import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	console.log("========| Middleware Running |========");
	console.log("=> Request URL: ", request.url);
	console.log("=> Request Method: ", request.method);
	// console.log("=> Request Headers: ", request.headers)
	const cookies = request.cookies;
	// console.log("=> Request Cookies: ", cookies)
	let session = cookies.get("authjs.session-token");
	console.log("=> Session: ", session);
	console.log("=> Request Cookies: ", cookies);
	const refreshToken = cookies.get("refresh");
	console.log("refresh : ", refreshToken);

	if (session == undefined) {
		session = refreshToken;
	}
	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url).toString());
	}
}

// multiple middleware
export const config = {
	matcher: ["/dashboard"],
};
