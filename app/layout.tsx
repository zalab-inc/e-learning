import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import "@/app/global.css";

export const metadata: Metadata = {
	title: {
		default: "KelasInovatif.com - Platform AI untuk Karya Ilmiah",
		template: "%s | KelasInovatif.com",
	},
	description:
		"Platform pembelajaran AI untuk penulisan karya ilmiah. Tingkatkan kualitas penelitian Anda dengan bantuan teknologi AI.",
	icons: {
		icon: [
			{
				url: "/favicon.svg",
				type: "image/svg+xml",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="id" suppressHydrationWarning>
			<body className={`${inter.className} antialiased overflow-x-hidden`}>
				<Toaster position="top-right" duration={3000} closeButton richColors />
				{children}
			</body>
		</html>
	);
}
