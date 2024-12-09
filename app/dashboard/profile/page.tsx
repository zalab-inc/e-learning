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
import { Textarea } from "@/components/ui/textarea";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default async function ProfilePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	const breadcrumbItems = [
		{ title: "Dashboard", href: "/dashboard" },
		{ title: "Profile", current: true },
	];

	return (
		<div className="flex flex-col min-h-screen">
			<DashHeader items={breadcrumbItems} />
			<main className="flex-1 p-4 space-y-4 md:p-6">
				<div className="max-w-2xl mx-auto space-y-6">
					{/* Profile Header */}
					<Card>
						<CardContent className="pt-6">
							<div className="flex flex-col items-center space-y-4">
								<Avatar className="w-24 h-24">
									<AvatarImage
										src={session.user.image || ""}
										alt={session.user.name || "Profile"}
									/>
									<AvatarFallback>
										<User className="w-12 h-12" />
									</AvatarFallback>
								</Avatar>
								<div className="space-y-1 text-center">
									<h2 className="text-2xl font-bold">{session.user.name}</h2>
									<p className="text-muted-foreground">{session.user.email}</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Profile Details */}
					<Card>
						<CardHeader>
							<CardTitle>Profile Details</CardTitle>
							<CardDescription>Update your profile information</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="display-name">Display Name</Label>
								<Input
									id="display-name"
									defaultValue={session.user.name || ""}
									placeholder="Your display name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="bio">Bio</Label>
								<Textarea
									id="bio"
									placeholder="Write a short bio about yourself"
									className="min-h-[100px]"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="website">Website</Label>
								<Input
									id="website"
									type="url"
									placeholder="https://your-website.com"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="location">Location</Label>
								<Input id="location" placeholder="Your location" />
							</div>
							<Button className="w-full">Update Profile</Button>
						</CardContent>
					</Card>

					{/* Social Links */}
					<Card>
						<CardHeader>
							<CardTitle>Social Links</CardTitle>
							<CardDescription>
								Connect your social media accounts
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="twitter">Twitter</Label>
								<Input id="twitter" placeholder="@username" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="github">GitHub</Label>
								<Input id="github" placeholder="username" />
							</div>
							<div className="space-y-2">
								<Label htmlFor="linkedin">LinkedIn</Label>
								<Input id="linkedin" placeholder="profile-url" />
							</div>
							<Button className="w-full">Save Social Links</Button>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
