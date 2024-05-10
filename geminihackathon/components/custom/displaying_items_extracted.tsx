import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { PlusIcon, Pencil, Trash2, SaveIcon } from "lucide-react";

interface extractedItems {
	is_menu: boolean;
	error: string;
	menu_items: {
		categories: string;
		items: {
			item_name: string;
			item_price: number;
			item_description: string;
		}[];
	}[];
}

export default function DisplayingItemsExtracted({
	extractedItems,
}: {
	extractedItems: extractedItems;
}) {
	return (
		<>
			{extractedItems && (
				<Tabs
					defaultValue={extractedItems.menu_items[0].categories}
					className="flex flex-col gap-2"
				>
					<div className="flex flex-col md:flex-row items-center">
						<TabsList>
							{extractedItems.menu_items.map((menu, index) => (
								<TabsTrigger
									key={index}
									value={menu.categories}
								>
									{menu.categories}
								</TabsTrigger>
							))}
						</TabsList>
						<div className="ml-auto flex items-center gap-4">
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full"
							>
								<PlusIcon className="w-5 h-5" />
							</Button>
							<Button size="icon" className="rounded-full">
								<SaveIcon className="w-5 h-5" />
							</Button>
						</div>
					</div>

					{extractedItems.menu_items.map((menu, index) => (
						<TabsContent key={index} value={menu.categories}>
							<Card x-chunk="dashboard-06-chunk-0">
								<CardHeader>
									<CardTitle>
										<p className="capitalize">
											{menu.categories}
										</p>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Item</TableHead>
												<TableHead>Price</TableHead>
												<TableHead>Options</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{menu.items.map((item, index) => (
												<TableRow key={index}>
													<TableCell>
														{item.item_name}
													</TableCell>
													<TableCell>
														${item.item_price}
													</TableCell>
													<TableCell>
														<div className="flex flex-col items-start md:items-center md:gap-2 md:flex-row">
															<Button
																variant="link"
																className="text-blue-700"
															>
																<Pencil className="w-4 h-4" />
															</Button>
															<Button
																variant="link"
																className="text-red-700"
															>
																<Trash2 className="w-4 h-4" />
															</Button>
														</div>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>
					))}
				</Tabs>
			)}
		</>
	);
}
