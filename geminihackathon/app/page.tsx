"use client";

import { Button } from "@/components/ui/button";
import { ImageUp, Loader, ScanText } from "lucide-react";
import { useState } from "react";
import LoadingTable from "@/components/custom/LoadingTable";
import DisplayingItemsExtracted from "@/components/custom/displaying_items_extracted";

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

export default function Home() {
	const [isExtracting, setIsExtracting] = useState(false);
	const [fileName, setFileName] = useState<Object | null>(null);
	const [extractedItems, setExtractedItems] = useState<extractedItems | null>(
		null
	);

	const uploadMenu = () => {
		const fileInput = document.getElementById("file-uploaded");

		fileInput?.click();

		fileInput?.addEventListener("change", (event) => {
			const file = (event.target as HTMLInputElement).files?.[0];
			if (file) {
				setFileName(file);
				if (file.type.match("image.*")) {
					sessionStorage.setItem("file_name", file.name);
					sessionStorage.setItem(
						"file_url",
						URL.createObjectURL(file)
					);
				}
			}
		});
	};

	const extractItemsFromFile = () => {
		setIsExtracting(true);

		const uploadedFile = new FormData();
		uploadedFile.append("uploaded_file", fileName as Blob);

		fetch("http://127.0.0.1:5000/extract_items_from_menu", {
			method: "POST",
			body: uploadedFile,
		})
			.then((res) => res.json())
			.then((data) => {
				data.error
					? console.error("Toasting to user: ", data.error)
					: setExtractedItems(data[0]);

				console.log("Extracted items: ", data[0]);
				console.log("state: ", extractedItems);

				setIsExtracting(false);
			})
			.catch((err) => {
				console.error(err);
				setIsExtracting(false);
			});
	};

	return (
		<main>
			<div className="flex flex-col w-full justify-center items-center gap-6">
				<div className="md:grid md:grid-cols-3 md:gap-4 min-h-96 w-full flex flex-col">
					<section className="p-2 md:p-5 m-2 border-2 h-fit border-dashed rounded-lg flex flex-col items-center justify-center gap-2 md:gap-4 ">
						<p className="text-xl tracking-wide text-center overflow-hidden w-full truncate">
							{!fileName
								? "You have no menu yet"
								: (sessionStorage.getItem(
										"file_name"
								  ) as string)}
						</p>
						{fileName && (
							<div className="rounded-lg h-96 w-full bg-cover bg-center overflow-hidden">
								<img
									src={
										sessionStorage
											.getItem("file_url")
											?.toString() as string
									}
									alt="uploaded file"
									className="w-full h-full object-cover"
								/>
							</div>
						)}
						<div className="flex gap-4">
							<Button variant="secondary" onClick={uploadMenu}>
								<ImageUp className="h-4 w-4 mr-2" />
								Upload file
							</Button>
							{fileName && (
								<Button onClick={extractItemsFromFile}>
									{isExtracting ? (
										<>
											<Loader className="h-5 w-5 mr-2 animate-spin" />
											Extracting . . .
										</>
									) : (
										<>
											<ScanText className="h-5 w-5 mr-2" />
											Extract items
										</>
									)}
								</Button>
							)}
						</div>
					</section>
					<section className="col-span-2">
						<div className="grid flex-1 items-start gap-4 m-2 md:gap-8">
							<>
								{isExtracting ? (
									<>
										<LoadingTable />
									</>
								) : (
									<>
										{extractedItems && (
											<DisplayingItemsExtracted
												extractedItems={extractedItems}
											/>
										)}
									</>
								)}
							</>
						</div>
					</section>
				</div>
				<input type="file" id="file-uploaded" className="hidden" />
			</div>
		</main>
	);
}
