import Container from "@/src/components/shared/Container";
import LogoutButton from "@/src/components/shared/buttons/LogoutButton";

export default function Header() {
    return (
        <header className="border-b border-zinc-200 shadow-sm shadow-zinc-100">
            <Container>
                <div className="flex items-center justify-between py-5">
                    <h1 className="text-3xl font-bold">Blog</h1>
                    <LogoutButton />
                </div>
            </Container>
        </header>
    );
}