import { CarView } from "../view/car.view.js";
import { HTTP, HttpModule } from "../utils/http.js";
import { Application } from "../utils/module.js";
import { Action, ActionConstructor } from "./action.js";
import { Car } from "../models/car.types.js";

export const Delete: ActionConstructor =
    class DeleteAction extends Action<string> {
        static readonly requires = [
            HTTP
        ];

        constructor(public readonly app: Application) {
            super("delete", "Delete a car by <id>");
            this.app = app;
            this.argument("<id>", "Car id")
                .action(this.activate);
        }

        async activate(id: string): Promise<void> {
            const http = this.modules.get(HTTP) as HttpModule;
            const res = await http.get<Car>(id);
            if (!res) return;
            
            const car = res.data;

            const confirm = await CarView.request_delete(car);
            if (!confirm) return;

            const del = await http.delete(id);
            if (!del) return;

            CarView.deleteSuccess();
        }
    };