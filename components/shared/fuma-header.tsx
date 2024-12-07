/**
 *
 */

import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "./user-menu";

export function FumaHeader() {
	return (
		<div className="sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-background">
			<Link href="/dashboard" className="flex items-center gap-2">
				<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
					<Lightbulb className="w-5 h-5" />
				</div>
				<span className="text-sm font-semibold">KelasInvotif.com</span>
			</Link>
			<UserMenu />
		</div>
	);
}
