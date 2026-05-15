import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {LoginSchema} from "@/src/lib/validations/auth";

class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // credentials: {
            //     email: {
            //         type: "email",
            //         label: "Email",
            //     },
            //     password: {
            //         type: "password",
            //         label: "Password",
            //     }
            // },
            authorize: async (credentials) => {
                const data = await LoginSchema.parseAsync(credentials);

                const res = await fetch(`http://localhost:8080/api/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });

                const { data: user } = await res.json();

                if (res.ok && user) {
                    return user;
                }

                return null;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token
            }

            return token;
        },

        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    session: { strategy: "jwt" }
});