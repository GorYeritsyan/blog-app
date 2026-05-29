import Button from "@/components/ui/Button";
import { logout } from "@/actions/auth";

export default function LogoutButton() {
    return (
        <form action={logout}>
            <Button variant="danger">Logout</Button>
        </form>
    );
}