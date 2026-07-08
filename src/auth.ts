import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/lib/validations/auth";
import { authConfig } from "@/auth.config";
import { fetchInstance } from "@/actions";
import { tryCatch } from "@/utils/utils";
import {TUser} from "@/types/types";

export class InvalidLoginError extends CredentialsSignin {
    details?: { [key: string]: string };

    constructor(code: string, details?: { [key: string]: string }) {
        super(code);
        this.code = code;
        this.details = details;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig   ,
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const validBody = await LoginSchema.parseAsync(credentials);

                const { data, error, details } = await tryCatch<{ user: Pick<TUser, "email" | "name" | "createdAt">; token: string }>(fetchInstance(`/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(validBody)
                }));

                if (error) {
                    throw new InvalidLoginError(error.message, details);
                }

                const { user, token } = data.data;

                return { ...user, token };
            }
        }),
    ]
});