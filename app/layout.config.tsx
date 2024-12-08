import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { Lightbulb } from "lucide-react";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	nav: {
		title: (
			<div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
				<Lightbulb className="w-5 h-5" />
			</div>
		),
		url: "/dashboard",
	},
	links: [
		{
			text: "Dashboard",
			url: "/dashboard",
			active: "none",
		},
	],
};
