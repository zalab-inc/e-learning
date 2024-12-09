"use client";
import { HeaderDropdown } from "@/components/dashboard/header-dropdown";

export function CourseHeader() {
	return (
		<header className="fixed z-50 hidden w-auto lg:top-2 left-4 md:right-4 md:left-auto lg:block ">
			<HeaderDropdown />
		</header>
	);
}
