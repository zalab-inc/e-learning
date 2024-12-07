import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuccessMessage() {
	return (
		<div className="flex flex-col min-h-[50vh] h-full w-full items-center justify-center p-6 md:p-8">
			<div className="flex flex-col items-center gap-4 text-center">
				<CheckCircle2 className="w-8 h-8 text-primary" />
				<div className="space-y-1.5">
					<h2 className="text-2xl font-semibold">Pendaftaran Berhasil!</h2>
					<p className="text-sm text-muted-foreground">
						Akun Anda telah berhasil dibuat. Silakan masuk ke dashboard untuk
						memulai.
					</p>
				</div>
				<Link href="/dashboard">
					<Button>Masuk ke Dashboard</Button>
				</Link>
			</div>
		</div>
	);
}
