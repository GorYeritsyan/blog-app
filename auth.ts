import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {LoginSchema} from "@/src/lib/validations/auth";
import {authConfig} from "@/auth.config";

export class InvalidLoginError extends CredentialsSignin {
    code = "Invalid credentials."
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
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

                if (!user) {
                    throw new InvalidLoginError();
                }

                return user;
            }
        })
    ]
});