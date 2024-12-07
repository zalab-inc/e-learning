import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import "@/app/global.css";

export const metadata: Metadata = {
	title: "Fumadocs",
	description: "Fumadocs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<NextTopLoader color="#333" key="top-loader" zIndex={1000} />
				{children}
				<Toaster position="top-right" duration={3000} closeButton richColors />
			</body>
		</html>
	);
}
