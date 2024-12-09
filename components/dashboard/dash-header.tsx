import { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderDropdown } from "@/components/dashboard/header-dropdown";

interface BreadcrumbItemType {
	title: string;
	href?: string;
	current?: boolean;
}

interface DashHeaderProps {
	items?: BreadcrumbItemType[];
}

export function DashHeader({ items = [] }: DashHeaderProps) {
	return (
		<header className="flex items-center justify-between h-16 gap-2 px-4 border-b shrink-0">
			<div className="flex items-center gap-2">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="h-4 mr-2" />
				<Breadcrumb>
					<BreadcrumbList>
						{items.map((item, index) => (
							<Fragment key={`${item.title}-${item.href}`}>
								<BreadcrumbItem className="hidden md:block">
									{!item.current ? (
										<BreadcrumbLink href={item.href || "#"}>
											{item.title}
										</BreadcrumbLink>
									) : (
										<BreadcrumbPage>{item.title}</BreadcrumbPage>
									)}
								</BreadcrumbItem>
								{!item.current && index < items.length - 1 && (
									<BreadcrumbSeparator className="hidden md:block" />
								)}
							</Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className="flex items-center gap-2">
				<HeaderDropdown />
			</div>
		</header>
	);
}
