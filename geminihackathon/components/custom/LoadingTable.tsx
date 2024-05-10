import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function LoadingTable() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between">
				<Skeleton className="w-1/2 lg:w-96 h-10" />
				<div className="flex gap-4">
					<Skeleton className="w-10 h-10 rounded-full" />
					<Skeleton className="w-10 h-10 rounded-full" />
				</div>
			</div>

			<Card x-chunk="dashboard-06-chunk-0">
				<CardHeader>
					<CardTitle>
						<Skeleton className="w-28 lg:w-52 h-10" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>
									<Skeleton className="w-20 lg:w-40 h-8" />
								</TableHead>
								<TableHead>
									<Skeleton className="w-20 lg:w-40 h-8" />
								</TableHead>
								<TableHead>
									<Skeleton className="w-10 lg:w-40 h-8" />
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 3 }).map((_, index) => (
								<TableRow key={index}>
									<TableCell>
										<Skeleton className="w-20 lg:w-40 h-8" />
									</TableCell>
									<TableCell>
										<Skeleton className="w-20 lg:w-40 h-8" />
									</TableCell>
									<TableCell>
										<Skeleton className="w-10 lg:w-40 h-8" />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
