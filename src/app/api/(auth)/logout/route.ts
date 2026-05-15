import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Logout
export async function GET() {
    const cookieStore = await cookies();

    cookieStore.delete("token");
    redirect("/login");
}