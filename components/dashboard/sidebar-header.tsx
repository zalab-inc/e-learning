import { Lightbulb } from "lucide-react";
import Link from "next/link";

export function SidebarHeader() {
	return (
		<div className="flex items-center gap-3 p-4 border-b">
			<Link href="/dashboard" className="flex items-center gap-3">
				<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
					<Lightbulb className="w-5 h-5" />
				</div>
				<div className="text-sm font-semibold">KelasInvotif.com</div>
			</Link>
		</div>
	);
}
