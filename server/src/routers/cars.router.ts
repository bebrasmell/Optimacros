import { Router } from "express";
import { CarsService } from "../services/cars.service.js";

// Pretty much basic Express Rig.

const CarsRouter = Router();

CarsRouter.put("/", CarsService.create);
CarsRouter.get("/", CarsService.list);
CarsRouter.get("/:id", CarsService.read);
CarsRouter.post("/", CarsService.update);
CarsRouter.delete("/:id", CarsService.delete);

export default CarsRouter;