import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const { pathname } = nextUrl;
            const isLoggedIn = !!auth?.user;
            const isAuthRoute = pathname === "/login" || pathname === "/register";

            // If not logged in and in the protected route then redirect to login
            if (!isLoggedIn && !isAuthRoute) {
                return NextResponse.redirect(new URL("/login", nextUrl));
            }

            // if logged in and in the login or register page then redirect to homepage
            if (isLoggedIn && isAuthRoute) {
                return NextResponse.redirect(new URL("/", nextUrl));
            }

            // If Authorized
            return true;
        },

        // Attach accessToken to jwt token
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
            }

            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    session: { strategy: "jwt" },
    providers: []
} satisfies NextAuthConfig;