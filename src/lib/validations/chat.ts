import { z } from "zod";

export const GroupChatSchema = z.object({
    name: z.string().min(1, "This field is required"),
    memberIds: z.array(z.number()).min(1, "This field is required"),
});

export type GroupChatFormValues = z.infer<typeof GroupChatSchema>;