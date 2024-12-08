import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { source } from "@/lib/source";
import { RootProvider } from "fumadocs-ui/provider";
import { baseOptions } from "@/app/layout.config";
import { RootToggle } from "fumadocs-ui/components/layout/root-toggle";

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<RootProvider>
			<DocsLayout
				tree={source.pageTree}
				{...baseOptions}
				sidebar={{
					banner: (
						<RootToggle
							options={[
								{
									title: "Folder 1",
									description: "Pages in folder 1",
									url: "/path/to/page-tree-1",
								},
								{
									title: "Folder 2",
									description: "Pages in folder 2",
									url: "/path/to/page-tree-2",
								},
							]}
						/>
					),
				}}
			>
				{children}
			</DocsLayout>
		</RootProvider>
	);
}
