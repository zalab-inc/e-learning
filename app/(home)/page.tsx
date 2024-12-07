// import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	if (!session) {
		redirect("/login");
	} else {
		redirect("/dash");
	}

	// return (
	// 	<main className="flex flex-col justify-center flex-1 text-center">
	// 		<h1 className="mb-4 text-2xl font-bold">Hello World</h1>
	// 		<p className="text-fd-muted-foreground">
	// 			You can open{" "}
	// 			<Link
	// 				href="/docs"
	// 				className="font-semibold underline text-fd-foreground"
	// 			>
	// 				/docs
	// 			</Link>{" "}
	// 			and see the documentation.
	// 		</p>
	// 	</main>
	// );
}
