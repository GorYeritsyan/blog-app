import Link from "next/link";
import RegisterForm from "@/src/components/shared/forms/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Register to Blog App</h1>

            <RegisterForm />

            <p>
                Already registered? <Link className="font-medium" href="/login">Login to your account</Link>
            </p>
        </div>
    );
}