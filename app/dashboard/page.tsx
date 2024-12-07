import { DashHeader } from "@/components/dashboard/dash-header";

const breadcrumbItems = [
	{
		title: "Dashboard",
		href: "/dashboard",
	},
	{
		title: "Welcome",
		current: true,
	},
];

export default function Page() {
	return (
		<>
			<DashHeader items={breadcrumbItems} />
			<div className="flex flex-col items-center justify-center flex-1 p-8">
				<div className="max-w-2xl space-y-4 text-center">
					<h1 className="text-4xl font-bold tracking-tight">
						Welcome to KelasInvotif.com
					</h1>
					<p className="text-lg text-muted-foreground">
						Platform pembelajaran AI untuk penulisan karya ilmiah. Tingkatkan
						kualitas penelitian Anda dengan bantuan teknologi AI yang dirancang
						khusus untuk penulisan akademik.
					</p>
				</div>
			</div>
		</>
	);
}
