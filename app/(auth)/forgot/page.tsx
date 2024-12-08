import React from "react";
import { ForgotForm } from "./_components/forgot-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Lupa Password | KelasInvotif.com",
	description: "Reset password akun KelasInvotif.com Anda",
};

export default function ForgotPasswordPage() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<ForgotForm />
		</div>
	);
}
