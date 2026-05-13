import Link from "next/link";
import LoginForm from "@/src/components/shared/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Login to Blog App</h1>

            <LoginForm />
            <p>
                Don’t you have an account? <Link className="font-medium" href="/register">Create an account</Link>
            </p>
        </div>
    );
}