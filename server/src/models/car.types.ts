import { TCar } from "./car.z.js";

/**
 * @type Car without ID
 */
export type NewCar = Omit<TCar, "id">;

/**
 * @type Optional update fields
 */
export type CarUpdate = Partial<NewCar>;
