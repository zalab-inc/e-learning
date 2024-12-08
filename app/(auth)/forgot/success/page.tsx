import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Cek Email | KelasInovatif.com",
	description: "Link reset password telah dikirim ke email Anda",
};

export default function ForgotSuccessPage() {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<Card className="w-[400px]">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Cek Email Anda</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-center text-muted-foreground">
						Jika akun dengan email tersebut ada, kami telah mengirimkan link
						reset password.
					</p>
					<Button asChild className="w-full">
						<Link href="/login">Kembali ke Login</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
