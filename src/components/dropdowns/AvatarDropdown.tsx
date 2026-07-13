"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/shadcn/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { TUser } from "@/types/types";

const dropdownItems = [
    {
        label: "My Orders",
        route: "/orders",
    },
    {
        label: "My Products",
        route: "/products",
    },
    {
        label: "Subscription Plans",
        route: "/pricing",
    }
];

export default function AvatarDropdown({ user }: { user?: TUser }) {
    const router = useRouter();

    const handleLogout = () => {
        router.push("/api/logout");
    }

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Avatar size="lg" className="cursor-pointer">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                        className="grayscale"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-56" align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span className="truncate font-medium text-base text-zinc-900">{user?.name}</span>
                        <span className="truncate font-normal text-zinc-500 text-sm">{user?.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {dropdownItems.map((item) => (
                        <DropdownMenuItem key={item.route} className="cursor-pointer" asChild>
                            <Link href={item.route}>
                                {item.label}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer" variant="destructive">
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}