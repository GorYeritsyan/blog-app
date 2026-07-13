import Link from "next/link";
import Container from "@/components/shared/Container";
import { getCurrentUser } from "@/actions/auth";
import Notifications from "@/components/shared/Notifications";
import {getNotifications} from "@/actions/users";
import CartDrawer from "@/components/shared/drawers/CartDrawer";
import { getCartItems } from "@/actions/cart";
import AvatarDropdown from "@/components/dropdowns/AvatarDropdown";

const navLinks: { href: string; label: string }[] = [
    {
        href: "/users",
        label: "Users",
    },
    {
        href: "/messages",
        label: "Messages",
    },
    {
        href: "/shop",
        label: "Shop",
    }
];

export default async function Header() {
    const currentUser = await getCurrentUser();
    const notifications = await getNotifications();
    const cartItems = await getCartItems();

    return (
        <header className="border-b border-zinc-200 shadow-sm shadow-zinc-100">
            <Container>
                <div className="flex items-center justify-between py-5">
                    <div className="flex items-center gap-10">
                        <h1 className="text-3xl font-bold">
                            <Link href="/">Blog</Link>
                        </h1>

                        <ul className="flex items-center gap-8">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <Link className="font-medium" href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/*<LogoutButton />*/}
                    <div className="flex items-center gap-4">
                        <CartDrawer cartItems={cartItems ?? []} />
                        <Notifications notifications={notifications || []} />
                        <AvatarDropdown user={currentUser} />
                    </div>
                </div>
            </Container>
        </header>
    );
}