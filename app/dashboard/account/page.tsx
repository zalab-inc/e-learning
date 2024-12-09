import { DashHeader } from "@/components/dashboard/dash-header";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AccountPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const breadcrumbItems = [
		{ title: "Dashboard", href: "/dashboard" },
		{ title: "Account", current: true },
	];

	return (
		<div className="flex flex-col min-h-screen">
			<DashHeader items={breadcrumbItems} />
			<main>
				<div className="container flex flex-col w-full max-w-4xl gap-4 pt-12 mx-auto">
					{/* Profile Section */}
					<Card>
						<CardHeader>
							<CardTitle>Profile Information</CardTitle>
							<CardDescription>
								Update your account profile details
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Name</Label>
								<Input
									id="name"
									defaultValue={session.user.name || ""}
									placeholder="Your name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									defaultValue={session.user.email}
									disabled
								/>
							</div>
							<Button>Save Changes</Button>
						</CardContent>
					</Card>

					{/* Password Section */}
					<Card>
						<CardHeader>
							<CardTitle>Change Password</CardTitle>
							<CardDescription>
								Update your password to keep your account secure
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="current-password">Current Password</Label>
								<Input
									id="current-password"
									type="password"
									placeholder="Enter current password"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="new-password">New Password</Label>
								<Input
									id="new-password"
									type="password"
									placeholder="Enter new password"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="confirm-password">Confirm New Password</Label>
								<Input
									id="confirm-password"
									type="password"
									placeholder="Confirm new password"
								/>
							</div>
							<Button>Update Password</Button>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
