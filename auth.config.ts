import type { NextAuthConfig } from "next-auth";
import {NextResponse} from "next/server";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const { pathname } = nextUrl;
            const isLoggedIn = !!auth?.user;
            const isAuthRoute = pathname === "/login" || pathname === "/register";
            console.log("auth", auth);

            if (!isLoggedIn && !isAuthRoute) {
                return NextResponse.redirect(new URL("/login", nextUrl));
            }

            if (isLoggedIn && isAuthRoute) {
                console.log("logged in", auth);
                return NextResponse.redirect(new URL("/", nextUrl));
            }

            // If authorized
            return true;
        },

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