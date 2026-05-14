import { type NextRequest, NextResponse} from "next/server";

export default function proxy(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const { pathname } = req.nextUrl;

    const isAuthPage = pathname === "/login" || pathname === "/register";

    // Redirect to /login if user is not authorized
    if (!token && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    // Redirect homepage if user is authorized and currently inside /login OR /register
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/", req.nextUrl));
    }

    return NextResponse.next();
}

// TODO: check matcher logic
export const config = {
    matcher: ["/", "/login", "/register", "/logout", "/blog"],
}