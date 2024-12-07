import type { ReactNode } from "react";
import { HomeLayout } from "fumadocs-ui/layouts/home";
import { baseOptions } from "@/app/layout.config";
import { cn } from "@/lib/utils";
import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html
			lang="en"
			className={cn("antialiased", inter.className)}
			suppressHydrationWarning
		>
			<body className="flex flex-col min-h-screen">
				<RootProvider>
					<HomeLayout {...baseOptions}>{children}</HomeLayout>
				</RootProvider>
			</body>
		</html>
	);
}
