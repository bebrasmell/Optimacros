import { Car } from "models/cars.model";

/**
 * **Data Transfer Object**.
 * Usually that is an interface that front-end app accepts.
 **/
export interface CarDTO {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
}
/**
 * DTO Adapter
 * @param ref Car model
 * @returns DTO
 */
export function toCarDTO(ref: Car): CarDTO {
    return ({
        id: String(ref.id),
        brand: ref.brand,
        model: ref.model,
        year: ref.year,
        price: ref.price
    });
}