import z from "zod";
import { Types } from "mongoose";

/**
 * ObjectID validator
 * @param id string id to test
 * @returns boolean
 * */
export const ValidId = (id: string): boolean => Types.ObjectId.isValid(id);

/**
 * ObjectID to Zod
 * */
export const zStrictId = z.instanceof(Types.ObjectId);

/**
 * Valid string ID to Zod
 * */
export const zValidId = z.string().refine(ValidId);

/**
 * ObjectID or valid string ID
 * */
export const zId = zValidId.or(zStrictId);

/**
 * @type ObjectID or valid string
 */
export type Id = z.infer<typeof zId>;