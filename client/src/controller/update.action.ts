import { CarView } from "../view/car.view.js";
import { HTTP, HttpModule } from "../utils/http.js";
import { Application } from "../utils/module.js";
import { Action, ActionConstructor } from "./action.js";
import { Car } from "../models/car.types.js";

export const Update: ActionConstructor =
    class UpdateAction extends Action<string> {
        static readonly requires = [
            HTTP
        ];

        constructor(public readonly app: Application) {
            super("update", "Update a car by <id>");
            this.argument("<id>", "Car id")
                .action(this.activate);
        }

        async activate(id: string): Promise<void> {
            const http = this.modules.get(HTTP) as HttpModule;
            const res = await http.get<Car>(id);
            if (!res) return;
            
            const update = await CarView.model(res.data);
            const upd = await http.post<Car>("", { id, ...update });
            if (!upd) return;

            CarView.display(upd.data);
        }
    };