import Container from "@/src/components/shared/Container";
import { getCurrentUser, logout } from "@/src/actions/auth";
import Button from "@/src/components/ui/Button";
import Link from "next/link";

export default async function Header() {
    const currentUser = await getCurrentUser();

    return (
        <header className="border-b border-zinc-200 shadow-sm shadow-zinc-100">
            <Container>
                <div className="flex items-center justify-between py-5">
                    <div className="flex items-center gap-10">
                        <h1 className="text-3xl font-bold">
                            <Link href="/">Blog</Link>
                        </h1>

                        <ul>
                            <li>
                                <Link href="/authors" className="font-medium">Authors</Link>
                            </li>
                        </ul>

                    </div>

                    {/*<LogoutButton />*/}
                    <div className="flex items-center gap-4">
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