/**
 * SidebarFooter is a component that is used to display the footer of the sidebar.
 * Logout button is also included in this component.
 * Logout button is used to logout the user from the application.
 *
 */

"use client";
import { LogoutButton } from "@/components/shared/logout";

export function SidebarFooter() {
	return (
		<div className="flex items-center gap-2 p-4 border-t">
			<LogoutButton
				variant="ghost"
				size="sm"
				className="w-full justify-start"
			/>
		</div>
	);
}
