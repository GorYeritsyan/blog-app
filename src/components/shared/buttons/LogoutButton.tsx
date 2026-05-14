import Button from "@/src/components/ui/Button";
import { logout } from "@/src/actions/auth";

export default function LogoutButton() {
    return (
        <form action={logout}>
            <Button variant="danger">Logout</Button>
        </form>
    );
}