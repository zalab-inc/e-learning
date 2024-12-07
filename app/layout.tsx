import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import "@/app/global.css";

export const metadata: Metadata = {
	title: {
		default: "KelasInvotif.com - Platform AI untuk Karya Ilmiah",
		template: "%s | KelasInvotif.com",
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
			<body className={`${inter.className} antialiased`}>
				<NextTopLoader color="#333" key="top-loader" zIndex={1000} />
				<Toaster position="top-right" duration={3000} closeButton richColors />
				{children}
			</body>
		</html>
	);
}
