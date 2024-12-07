import React from "react";
import { RegisterForm } from "./_components/register-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<RegisterForm />
		</div>
	);
}
