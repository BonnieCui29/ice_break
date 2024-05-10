import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import "./globals.css";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu } from "lucide-react";
import {
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

const listOfMenuItems = [
	{
		icon: Home,
		label: "Dashboard",
	},
	{
		icon: ShoppingCart,
		label: "Orders",
		badge: 9,
	},
	{
		icon: Package,
		label: "Products",
	},
	{
		icon: LineChart,
		label: "Analytics",
	},
];

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

const SmallScreenNav = () => {
	return (
		<>
			<nav className="grid gap-2 text-lg font-medium">
				{listOfMenuItems.map((item, index) => (
					<Link
						href="#"
						key={index}
						className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-slate-500 hover:text-foreground"
					>
						<item.icon className="h-5 w-5" />
						{item.label}
						{item.badge && (
							<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								{item.badge}
							</Badge>
						)}
					</Link>
				))}
			</nav>
		</>
	);
};

const LargeScreenNav = () => {
	return (
		<>
			<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
				{listOfMenuItems.map((item, index) => (
					<Link
						href="#"
						key={index}
						className="flex items-center gap-3 rounded-lg px-3 py-2 text-slate-500 transition-all hover:text-slate-900"
					>
						<item.icon className="h-4 w-4" />
						{item.label}
						{item.badge && (
							<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								{item.badge}
							</Badge>
						)}
					</Link>
				))}
			</nav>
		</>
	);
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] min-h-screen w-full">
					<div className="hidden border-r bg-muted/40 md:block">
						<div className="flex h-full max-h-screen lg:w-[280px] fixed flex-col gap-2">
							<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
								<p className="font-semibold"></p>
							</div>
							<div className="flex-1">
								<LargeScreenNav />
							</div>
							<div className="mt-auto p-4">
								<footer>
									<p className="text-xs text-slate-500/40 text-center">
										© 2024 by Rava
									</p>
								</footer>
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										className="shrink-0 md:hidden"
									>
										<Menu className="h-5 w-5" />
										<span className="sr-only">
											Toggle navigation menu
										</span>
									</Button>
								</SheetTrigger>
								<SheetContent
									side="left"
									className="flex flex-col"
								>
									<SmallScreenNav />
								</SheetContent>
							</Sheet>
							<div className="w-full flex-1"></div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="secondary"
										size="icon"
										className="rounded-full"
									>
										<CircleUser className="h-5 w-5" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>
										Acount username
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Logout</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</header>
						<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
