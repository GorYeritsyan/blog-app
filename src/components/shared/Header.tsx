import Container from "@/src/components/shared/Container";
import { getCurrentUser, logout } from "@/src/actions/auth";
import Button from "@/src/components/ui/Button";

export default async function Header() {
    const currentUser = await getCurrentUser();

    return (
        <header className="border-b border-zinc-200 shadow-sm shadow-zinc-100">
            <Container>
                <div className="flex items-center justify-between py-5">
                    <h1 className="text-3xl font-bold">Blog</h1>

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