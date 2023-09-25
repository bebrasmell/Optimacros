import { Response } from "express";
import { CommonView } from "./common.view.js";
import { Car } from "../models/cars.model.js";
import { toCarDTO } from "./cars.dto.js";

/**
 * View layer.
 * Provides Response presets for each API-endpoint.
 */
export abstract class CarsView {
    static create = (res: Response, data: Car) => res
        .status(201)
        .send(toCarDTO(data));
    
    static list = (res: Response, data: Car[]) => res
        .status(200)
        .send(data.map(toCarDTO));
    
    static read = (res: Response, data: Car) => res
        .status(200)
        .send(toCarDTO(data));
    
    static update = (res: Response, data: Car) => res
        .status(201)
        .send(toCarDTO(data));
    
    static delete = (res: Response) =>
        CommonView.noContent(res);
}