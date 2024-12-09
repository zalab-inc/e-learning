import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { RootProvider } from "fumadocs-ui/provider";
import { baseOptions } from "@/app/layout.config";
import { CourseHeader } from "@/components/dashboard/course-header";

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<RootProvider search={{ enabled: true }}>
			<CourseHeader />
			<DocsLayout tree={source.pageTree} {...baseOptions}>
				{children}
			</DocsLayout>
		</RootProvider>
	);
}
