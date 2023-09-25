import { Car } from "../models/car.types.js";
import { Application } from "../utils/module.js";
import { HTTP, HttpModule } from "../utils/http.js";
import { Action, ActionConstructor } from "./action.js";
import { CarView } from "../view/car.view.js";

export const Read: ActionConstructor =
    class ReadAction extends Action<string> {
        static readonly requires = [
            HTTP
        ];
        
        constructor(public readonly app: Application) {
            super("read", "Read a car by <id>");
            this.argument("<id>", "Car id")
                .action(this.activate);
        }

        async activate(id: string): Promise<void> {
            const http = this.modules.get(HTTP) as HttpModule;
            const res = await http.get<Car>(id);
            if (!res) return;
            
            CarView.display(res.data);
        }
}