import { Application } from "../utils/module.js";
import { HTTP, HttpModule } from "../utils/http.js";
import { Action, ActionConstructor } from "./action.js";
import { Car, CarFlat } from "../models/car.types.js";
import { CarView } from "../view/car.view.js";

export const Create: ActionConstructor =
    class CreateAction extends Action<string> {
        static readonly requires = [
            HTTP
        ];

        constructor(
            public readonly app: Application
        ) {
            super("create", "Create a new car");
            this.action(this.activate);
        }

        async activate(_: string): Promise<void> {
            const http = this.modules.get(HTTP) as HttpModule;
            const car: CarFlat = await CarView.model();

            const res = await http.put<Car>("", car);
            if (!res) return;

            CarView.createSuccess(res.data);
        }
    };