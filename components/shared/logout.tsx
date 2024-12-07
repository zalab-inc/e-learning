"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps extends React.ComponentProps<typeof Button> {}

export function LogoutButton({ className, ...props }: LogoutButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			await authClient.signOut();
			await new Promise((resolve) => setTimeout(resolve, 100));
			router.replace("/");
		} catch {
			alert("Failed to sign out");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			onClick={handleLogout}
			disabled={isLoading}
			className={cn("gap-2", className)}
			{...props}
		>
			{isLoading ? (
				<Loader2 className="w-4 h-4 animate-spin" />
			) : (
				<LogOut className="w-4 h-4" />
			)}
			Sign Out
		</Button>
	);
}
