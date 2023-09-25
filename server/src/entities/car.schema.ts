import { Schema } from "mongoose";
import { TCar } from "../models/car.z.js";

// Cars can't be produced in future
const currentYear = new Date().getFullYear();

/**
 * @public
 * Car schema for mongoose
 * */
export const CarSchema = new Schema<TCar>({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        default: currentYear,
        min: 1900,
        max: currentYear,
    },
    price: {
        type: Number,
        default: 0,
    },
});