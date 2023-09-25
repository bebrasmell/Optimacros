import { z } from "zod";
import { zCar } from "../models/car.z.js";
import { zValidId } from "../entities/entity.z.js";

export const zCheckId = z.object({ id: zValidId });
export const zCreate = zCar.omit({ id: true });
export const zSort = z.object({
    sort: zCar.keyof().optional()
});
export const zUpdate = zCar.partial().required({ id: true });