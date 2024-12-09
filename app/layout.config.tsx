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
			<div className="flex items-center gap-2">
				<div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground">
					<Lightbulb className="w-4 h-4" />
				</div>
				<span className="font-medium">KelasInovatif.com</span>
			</div>
		),
		url: "/dashboard",
	},
};
