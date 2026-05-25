import Container from "@/src/components/shared/Container";
import { getCurrentUser, logout } from "@/src/actions/auth";
import Button from "@/src/components/ui/Button";
import Link from "next/link";
import Notifications from "@/src/components/shared/Notifications";
import {getNotifications} from "@/src/actions/users";

const navLinks: { href: string; label: string }[] = [
    {
        href: "/authors",
        label: "Authors",
    }
]

export default async function Header() {
    const currentUser = await getCurrentUser();
    const notifications = await getNotifications();

    console.log("current user", notifications);

    return (
        <header className="border-b border-zinc-200 shadow-sm shadow-zinc-100">
            <Container>
                <div className="flex items-center justify-between py-5">
                    <div className="flex items-center gap-10">
                        <h1 className="text-3xl font-bold">
                            <Link href="/">Blog</Link>
                        </h1>

                        <ul className="flex items-center gap-10">
                            {navLinks.map(link => (
                                <li key={link.href}>
                                    <Link className="font-medium" href={link.href}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/*<LogoutButton />*/}
                    <div className="flex items-center gap-4">
                        <Notifications notifications={notifications || []} />

                        <span className="text-sm font-medium">{currentUser?.email}</span>
                        <form action={logout}>
                            <Button variant="danger">Logout</Button>
                        </form>
                    </div>
                </div>
            </Container>
        </header>
    );
}