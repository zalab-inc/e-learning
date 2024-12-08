import React from "react";
import { ResetPasswordForm } from "@/app/(auth)/reset-password/_components/reset-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Reset Password | KelasInovatif.com",
	description: "Buat password baru untuk akun KelasInovatif.com Anda",
	openGraph: {
		title: "Reset Password | KelasInovatif.com",
		description: "Buat password baru untuk akun KelasInovatif.com Anda",
	},
};

export default function ResetPasswordPage({
	searchParams,
}: {
	searchParams: { token?: string };
}) {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<ResetPasswordForm token={searchParams.token} />
		</div>
	);
}
