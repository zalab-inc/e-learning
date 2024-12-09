"use client";
import { HeaderDropdown } from "@/components/dashboard/header-dropdown";
import { Lightbulb, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CourseHeader() {
	const handleSearch = () => {
		// Trigger Control+K keyboard shortcut
		const event = new KeyboardEvent("keydown", {
			key: "k",
			code: "KeyK",
			ctrlKey: true,
			bubbles: true,
		});
		document.dispatchEvent(event);
	};

	return (
		<div className="sticky top-0 z-50 w-full border-b bg-background">
			<div className="flex items-center justify-between h-16 px-4">
				<div className="flex items-center gap-4">
					<Link href="/course" className="flex items-center gap-2">
						<div className="flex items-center justify-center w-8 h-8 rounded bg-primary text-primary-foreground">
							<Lightbulb className="w-4 h-4" />
						</div>
						<span className="font-medium">KelasInovatif.com</span>
					</Link>
				</div>

				<div className="flex items-center">
					<Button
						variant="ghost"
						className="hidden hover:bg-transparent md:flex"
						onClick={handleSearch}
					>
						<Search className="w-4 h-4" />
						<span className="sr-only">Search</span>
					</Button>
					<HeaderDropdown />
				</div>
			</div>
		</div>
	);
}
