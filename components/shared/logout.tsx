"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoutButtonProps = React.ComponentProps<typeof Button>;

export function LogoutButton({
	className,
	onClick,
	...props
}: LogoutButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (onClick) {
			onClick(e);
		}

		setIsLoading(true);
		try {
			await authClient.signOut();
			await new Promise((resolve) => setTimeout(resolve, 100));
			router.replace("/");
		} catch (error) {
			console.error("Failed to sign out:", error);
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
