import { z } from "zod";

export const zEnv = z.object({
    PORT: z.string()
        .default("5000")
        .transform((v) => parseInt(v)),
    DB_HOST: z.string(),
    DB_PORT: z.string()
        .transform((v) => parseInt(v)),
    DB_NAME: z.string()
});
export type Env = z.infer<typeof zEnv>;