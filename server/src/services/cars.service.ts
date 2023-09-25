import { Car } from "../models/cars.model.js";
import { Check } from "../utils/validator/validator.js";
import { zCheckId, zCreate, zSort, zUpdate } from "./cars.validator.js";
import { CommonView } from "../view/common.view.js";
import { CarsView } from "../view/cars.view.js";

/**
 * Service layer for handling requests.
 * Also checks requests for validity.
 */
export abstract class CarsService {
    static create = Check({
        body: zCreate
    }, async (req, res) => {
        try {
            const data = req.body;

            data.year = Math.floor(data.year);

            const car = await Car.create(data);

            return CarsView.create(res, car);    
        } catch (e) {
            console.error(e);
            return CommonView.throwError(res);
        }
    });

    static list = Check({
        query: zSort
    }, async (req, res) => {
        try {
            const { sort } = req.query;
            const cars = await Car.list(sort);
            return CarsView.list(res, cars);    
        } catch (e) {
            console.error(e);
            return CommonView.throwError(res);
        }
    });
    static read = Check({
        param: zCheckId
    }, async (req, res) => {
        try {
            const { id } = req.params;
            const car = await Car.read(id);
            if (!car) return CommonView.notFound(res);
    
            return CarsView.read(res, car);    
        } catch (e) {
            console.error(e);
            return CommonView.throwError(res);
        }
    });

    static update = Check({
        body: zUpdate
    }, async (req, res) => {
        try {
            const data = req.body;
            
            if (data.year) data.year = Math.floor(data.year);
            
            const car = await Car.read(data.id);
    
            if (!car) return CommonView.notFound(res);
            await car.update(data);
    
            return CarsView.update(res, car);    
        } catch (e) {
            console.error(e);
            return CommonView.throwError(res);
        }
    });

    static delete = Check({
        param: zCheckId
    }, async (req, res) => {
        try {
            const { id } = req.params;
            const car = await Car.read(id);
            if (!car) return CommonView.notFound(res);
    
            await car.delete();
    
            return CarsView.delete(res);
        } catch (e) {
            console.error(e);
            return CommonView.throwError(res);
        }
    });
}