import React from "react";
import { ResetPasswordForm } from "./_components/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reset Password | KelasInovatif.com",
	description: "Buat password baru untuk akun KelasInovatif.com Anda",
	openGraph: {
		title: "Reset Password | KelasInovatif.com",
		description: "Buat password baru untuk akun KelasInovatif.com Anda",
	},
};

type SearchParamsType = Promise<{
	token?: string;
}>;

export default async function ResetPasswordPage({
	searchParams,
}: {
	searchParams: SearchParamsType;
}) {
	const params = await searchParams;
	const token = params.token;

	return (
		<div className="flex items-center justify-center min-h-screen">
			<ResetPasswordForm token={token} />
		</div>
	);
}
