import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const cookies = request.cookies;
	const session = cookies.get("authjs.session-token");
	if (!session) {
		return NextResponse.redirect(new URL("/login", request.url).toString());
	}
}

export const config = {
	matcher: "/dashboard",
};
