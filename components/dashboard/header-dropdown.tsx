"use client";

import { BadgeCheck, Bell, CreditCard, Sparkles, User } from "lucide-react";
import { LogoutButton } from "@/components/shared/logout";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type BetterAuthUser = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	emailVerified: boolean;
	name: string;
	image?: string | null;
};

type BetterAuthSession = {
	user: BetterAuthUser;
	session: {
		id: string;
		userId: string;
	};
};

export function HeaderDropdown() {
	const [session, setSession] = useState<BetterAuthSession | null>(null);

	useEffect(() => {
		const getSession = async () => {
			const currentSession = await authClient.getSession();
			if ("data" in currentSession && currentSession.data) {
				setSession(currentSession.data);
			}
		};
		getSession();
	}, []);

	const userName = session?.user?.name || "User";
	const userEmail = session?.user?.email || "";
	const userAvatar = session?.user?.image || "";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<Avatar className="w-8 h-8">
						<AvatarImage src={userAvatar} alt={userName} />
						<AvatarFallback>
							<User className="w-4 h-4" />
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" sideOffset={4}>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="w-8 h-8">
							<AvatarImage src={userAvatar} alt={userName} />
							<AvatarFallback>
								<User className="w-4 h-4" />
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-sm leading-tight text-left">
							<span className="font-semibold truncate">{userName}</span>
							<span className="text-xs truncate">{userEmail}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Sparkles className="w-4 h-4 mr-2" />
						<span>Upgrade to Pro</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<BadgeCheck className="w-4 h-4 mr-2" />
						<span>Account</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard className="w-4 h-4 mr-2" />
						<span>Billing</span>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Bell className="w-4 h-4 mr-2" />
						<span>Notifications</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onSelect={(e) => {
						e.preventDefault();
						const button = document.getElementById("nav-logout-button");
						if (button) {
							button.click();
						}
					}}
				>
					<LogoutButton
						id="nav-logout-button"
						variant="ghost"
						className="w-full justify-start px-2 py-1.5 h-9"
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
