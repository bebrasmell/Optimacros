import { TCar } from "./car.z";
import { Entity } from "../entities/entity.js";
import { CarUpdate, NewCar } from "./car.types.js";
import { CarSchema } from "../entities/car.schema.js";
import { Id } from "../entities/entity.z.js";
import { Keys } from "utils/types/type.utils";

/**
 * Car model
 * Handles all the business logic over specified object
 * Implements TCar interface from Zod object
 */
export class Car implements TCar {
    /**
     * @private Related Entity
     */
    static #entity = new Entity("Car", CarSchema);

    id: Id;
    brand: string;
    model: string;
    year: number;
    price: number;

    constructor(car: TCar) {
        this.id = car.id;
        this.brand = car.brand;
        this.model = car.model;
        this.year = car.year;
        this.price = car.price;
    }
    /** CRUD */
    static async create(data: NewCar): Promise<Car> {
        const ref = await Car.#entity.create(data);
        return new Car(ref);
    }
    static async list(sort?: Keys<TCar>): Promise<Car[]> {
        const refs = await Car.#entity.list(sort);
        return refs.map((ref) => new Car(ref));
    }
    static async read(id: Id): Promise<Car | undefined> {
        const ref = await Car.#entity.read(id);
        if (!ref) return;
        return new Car(ref);
    }
    async update(data: CarUpdate): Promise<Car> {
        await Car.#entity.update(this, data);
        return this;
    }
    async delete(): Promise<true> {
        return await Car.#entity.delete(this);
    }
}