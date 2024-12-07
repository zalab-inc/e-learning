import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { LogoutButton } from "@/components/shared/logout";

export const metadata: Metadata = {
	title: "Dashboard | Fuma Starter",
	description: "Manage your account and view your dashboard",
};

export default async function DashPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/login");
	}
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-2xl font-bold">Welcome {session.user.name}</h1>
				<div className="mt-4">
					<LogoutButton />
				</div>
			</div>
		</div>
	);
}
