import { Loader2 } from "lucide-react";

export function LoginSuccess() {
	return (
		<div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center p-6 md:p-8">
			<div className="flex flex-col items-center gap-4 text-center">
				<Loader2 className="w-8 h-8 text-primary animate-spin" />
				<div className="space-y-1.5">
					<h2 className="text-2xl font-semibold">Memuat...</h2>
					<p className="text-sm text-muted-foreground">
						Anda akan segera diarahkan ke dashboard.
					</p>
				</div>
			</div>
		</div>
	);
}
