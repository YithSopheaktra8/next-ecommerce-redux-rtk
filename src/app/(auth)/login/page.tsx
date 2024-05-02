/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSession, signIn, signOut } from "next-auth/react";

type ValueTypes = {
	email: string;
	password: string;
};

const initialValues: ValueTypes = {
	email: "",
	password: "",
};

export default function Login() {
	const { data: session } = useSession();
	console.log(session);
	// checking if sessions exists
	if (session) {
		// rendering components for logged in users
		return (
			<div className="w-full h-screen flex flex-col justify-center items-center">
				<div className="w-44 h-44 relative mb-4">
					<img
						src={session.user?.image as string}
						alt=""
						className="object-cover rounded-full"
					/>
				</div>
				<p className="text-2xl mb-2">
					Welcome{" "}
					<span className="font-bold">{session.user?.name}</span>.
					Signed In As
				</p>
				<p className="font-bold mb-4">{session.user?.email}</p>
				<button
					className="bg-red-600 py-2 px-6 rounded-md"
					onClick={() => signOut()}>
					Sign out
				</button>
			</div>
		);
	}

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<p className="text-2xl mb-2">Not Signed In</p>
			<button
				className="bg-blue-600 py-2 px-6 rounded-md text-white mb-2"
				onClick={() => signIn("google")}>
				Sign in with google
			</button>
			<button
				className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
				onClick={() => signIn("github")}>
				Sign in with github
			</button>
		</div>
	);
}
