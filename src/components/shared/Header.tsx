import Container from "@/src/components/shared/Container";
import Link from "next/link";
import Button from "@/src/components/ui/Button";

export default function Header() {
    return (
        <header className="border-b border-zinc-200 shadow-sm shadow-zinc-100">
            <Container>
                <div className="flex items-center justify-between py-5">
                    <h1 className="text-3xl font-bold">Blog</h1>
                    <Button variant="danger">Log out</Button>
                </div>
            </Container>
        </header>
    );
}