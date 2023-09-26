import { z } from "zod";
import { zId } from "../entities/entity.z.js";

/**
 * Current year
*/
const currentYear = new Date().getFullYear();

/**
 * Zod both as a Types source and as validation schema
*/
export const zCar = z.object({
    id: zId,
    brand: z.string(), // ENUM?
    model: z.string(),
    year: z.number().int().min(1900).max(currentYear + 1),
    price: z.number().positive(),
});

/**
 * Infered Car interface
 */
export type TCar = z.infer<typeof zCar>;