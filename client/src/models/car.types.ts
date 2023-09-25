export interface CarFlat {
    brand: string;
    model: string;
    year: number;
    price: number;
}
export interface Car extends CarFlat {
    id: string;
}
export type CarFields = keyof Car;
export const CAR_FIELDS: CarFields[] = [
    "id",
    "brand",
    "model",
    "year",
    "price"
]