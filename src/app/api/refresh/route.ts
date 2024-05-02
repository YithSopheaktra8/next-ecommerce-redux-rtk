import { serialize } from "cookie";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Create a POST request handler
export async function POST() {
	// Get the refresh token from the client-side cookies
	const cookieStore = cookies();
	const cookieName = process.env.COOKIE_REFRESH_TOKEN_NAME || "refresh";
	const credential = cookieStore.get(cookieName);
	console.log("Credential", credential);
	// If the refresh token is not found, return an error message to the client-side
	if (!credential) {
		return NextResponse.json(
			{
				message: "Token not found",
			},
			{
				status: 404,
			}
		);
	}
	// get the refresh token value
	const refreshToken = credential.value;

	// if the refresh token is found, make a POST request to the Our API
	const response = await fetch(
		`${process.env.DJANGO_API_URL}/api/token/refresh/`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ refresh: refreshToken }),
		}
	);
	// If the request fails, return an error message to the client-side
	if (!response.ok) {
		return NextResponse.json(
			{
				message: "Failed to refresh access token",
			},
			{
				status: response.status,
			}
		);
	}
	// Parse the response body to get the data
	const data = await response.json();
	const refresh = data?.refresh || null;
	const access = data?.access || null;

	// Serialize the refresh token and set it as a cookie with
	// (httpOnly, secure, path, and sameSite options) in the response headers to the client-side
	const serialized = serialize(cookieName, refresh, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax",
	});
	// Return the access token to the client-side with the serialized refresh token as a cookie
	return NextResponse.json(
		{
			accessToken: access,
		},
		{
			headers: {
				"Set-Cookie": serialized,
			},
		}
	);
}
