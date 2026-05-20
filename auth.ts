import NextAuth, { CredentialsSignin } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/src/lib/validations/auth";
import { authConfig } from "@/auth.config";
import { fetchInstance } from "@/src/actions";
import { tryCatch } from "@/src/utils/utils";

export class InvalidLoginError extends CredentialsSignin {
    constructor(code: string) {
        super();
        this.code = code;
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const validBody = await LoginSchema.parseAsync(credentials);

                const { data, error } = await tryCatch(fetchInstance(`/auth/login`, {
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

                return { ...user, token };
            }
        }),
    ]
});