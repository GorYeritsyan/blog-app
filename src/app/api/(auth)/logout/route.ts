import { signOut } from "@/auth";

// Sign out user when redirecting this route - /api/logout
export async function GET() {
    await signOut({ redirectTo: "/login "});
}