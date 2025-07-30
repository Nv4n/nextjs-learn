import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Customers" };

export default async function Page(props: {
	searchParams?: Promise<{
		query?: string;
	}>;
}) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || "";
	const customers = await fetchFilteredCustomers(query);
	return (
		<div className="w-full">
			<Suspense key={query} fallback={<InvoicesTableSkeleton />}>
				<CustomersTable customers={customers} />
			</Suspense>
		</div>
	);
}
