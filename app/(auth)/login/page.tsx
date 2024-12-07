import React from "react";
import { LoginForm } from "./_components/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<LoginForm />
		</div>
	);
}
