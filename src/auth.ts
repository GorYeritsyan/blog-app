import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/lib/validations/auth";
import { authConfig } from "@/auth.config";
import { fetchInstance } from "@/actions";
import { tryCatch } from "@/utils/utils";
import {TUser} from "@/types/types";

export class InvalidLoginError extends CredentialsSignin {
    constructor(code: string) {
        super(code);
        this.code = code;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig   ,
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const validBody = await LoginSchema.parseAsync(credentials);

                const { data, error } = await tryCatch<{ user: Pick<TUser, "email" | "name" | "createdAt">; token: string }>(fetchInstance(`/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(validBody)
                }));

                if (error) {
                    throw new InvalidLoginError(error.message);
                }

                const { user, token } = data.data;
                console.log("user", user);

                return { ...user, token };
            }
        }),
    ]
});