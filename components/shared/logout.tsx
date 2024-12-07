"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function LogoutButton() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const handleLogout = async () => {
		setIsLoading(true);
		try {
			await authClient.signOut();
			router.push("/");
		} catch {
			alert("Failed to sign out");
		}
	};
	return (
		<Button onClick={handleLogout} disabled={isLoading} className="gap-2">
			{isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
			Sign Out
		</Button>
	);
}
