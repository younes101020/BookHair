import { z } from "zod";

const addressSchema = z.object({
    features: z.array(
        z.object({
            properties: z.object({
                id: z.string(),
                city: z.string(),
                context: z.string()
            })
        })
    )
})

type addressType = z.infer<typeof addressSchema>;

export { addressSchema, type addressType };