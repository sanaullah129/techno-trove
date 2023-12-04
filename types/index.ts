import { User } from "@prisma/client";

export type SafeUser = Omit<User, "CreatedAt" | "UpdatedAt" | "emailVerified" > & {
    CreatedAt: string,
    UpdatedAt: string,
    emailVerified: string | null
};