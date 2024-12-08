/**
 * Home page is the first page that the user sees when they visit the application.
 * convert to landing page
 */
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Lightbulb } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	return (
		<main className="flex flex-col items-center min-h-screen">
			<div className="flex flex-col items-center justify-center flex-1 px-4 py-16 text-center sm:px-6 lg:px-8">
				<div className="flex items-center justify-center w-16 h-16 mb-8 rounded-lg bg-primary text-primary-foreground">
					<Lightbulb className="w-8 h-8" />
				</div>
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
					KelasInovatif.com
				</h1>
				<p className="max-w-2xl mt-4 text-xl text-muted-foreground">
					Platform pembelajaran AI untuk penulisan karya ilmiah. Tingkatkan
					kualitas penelitian Anda dengan bantuan teknologi AI.
				</p>
				<div className="flex flex-wrap justify-center gap-4 mt-8">
					{session ? (
						<Button asChild size="lg">
							<Link href="/dashboard">Ke Dashboard</Link>
						</Button>
					) : (
						<>
							<Button asChild size="lg">
								<Link href="/login">Masuk</Link>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href="/register">Daftar</Link>
							</Button>
						</>
					)}
				</div>
			</div>
		</main>
	);
}
