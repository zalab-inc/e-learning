"use client";

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	Sparkles,
	User,
} from "lucide-react";
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
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";

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

export function NavUser() {
	const { isMobile } = useSidebar();
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
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="w-8 h-8 rounded-lg">
								<AvatarImage src={userAvatar} alt={userName} />
								<AvatarFallback className="rounded-lg">
									<User className="w-4 h-4" />
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-sm leading-tight text-left">
								<span className="font-semibold truncate">{userName}</span>
								<span className="text-xs truncate">{userEmail}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="w-8 h-8 rounded-lg">
									<AvatarImage src={userAvatar} alt={userName} />
									<AvatarFallback className="rounded-lg">
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
								<Sparkles />
								Upgrade to Pro
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<BadgeCheck />
								Account
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCard />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Bell />
								Notifications
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
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
