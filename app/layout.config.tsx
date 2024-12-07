import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FumaHeader } from "@/components/shared/fuma-header";

/**
 * Shared layout configurations
 *
 * you can configure layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	nav: {
		component: <FumaHeader />,
	},
	links: [
		{
			text: "Dashboard",
			url: "/dashboard",
			active: "nested-url",
		},
	],
};
