import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function SidebarUpgrade() {
	return (
		<Card className="shadow-none">
			<CardHeader className="p-4 pb-0">
				<CardTitle className="text-sm">Upgrade to Pro</CardTitle>
				<CardDescription>
					Get access to all premium features and support.
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-2.5 p-4">
				<Button
					className="w-full shadow-none bg-sidebar-primary text-sidebar-primary-foreground"
					size="sm"
				>
					<Sparkles className="w-4 h-4 mr-2" />
					Upgrade Now
				</Button>
			</CardContent>
		</Card>
	);
}
