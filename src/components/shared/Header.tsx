import Container from "@/src/components/shared/Container";
import { getCurrentUser } from "@/src/actions/auth";
import Button from "@/src/components/ui/Button";
import Link from "next/link";
import {auth, signOut} from "@/auth";

export default async function Header() {
    const currentUser = await getCurrentUser();
    const session = await auth();
    console.log("session", session);

    const data = await fetch(`http://localhost:8080/api/auth/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`
        },
    }).then(res => res.json());

    console.log(data);

    return (
        <header className="border-b border-zinc-200 shadow-sm shadow-zinc-100">
            <Container>
                <div className="flex items-center justify-between py-5">
                    <h1 className="text-3xl font-bold">Blog</h1>


                    {/*<LogoutButton />*/}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium">{currentUser?.email}</span>
                        {/*<Link href="/api/logout">*/}
                        <form action={async () => {
                            "use server"
                            await signOut();
                        }}>

                            <Button variant="danger">Logout</Button>
                        </form>
                        {/*</Link>*/}
                    </div>
                </div>
            </Container>
        </header>
    );
}