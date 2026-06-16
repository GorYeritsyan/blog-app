import { z } from "zod";

export const GroupChatSchema = z.object({
    name: z.string().min(1, "This field is required"),
    members: z.array(z.string()),
});

export type GroupChatFormValues = z.infer<typeof GroupChatSchema>;