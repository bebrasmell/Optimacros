import { CAR_FIELDS, Car, CarFields } from "../models/car.types.js";
import { HTTP, HttpModule } from "../utils/http.js";
import { Application } from "../utils/module.js";
import { Action, ActionConstructor } from "./action.js";
import { CommonView } from "../view/common.view.js";
import { CarView } from "../view/car.view.js";

export const List: ActionConstructor =
    class ListAction extends Action<{ sort: CarFields } | undefined> {
        static readonly requires = [
            HTTP
        ];
        constructor(public readonly app: Application) {
            super("list", "List all cars");
            this.option("-s, --sort <field>", "Sort by field")
                .action(this.activate);
        }
        
        async activate(options?: { sort: CarFields }): Promise<void> {
            const http = this.modules.get(HTTP) as HttpModule;
            const sort = options?.sort;
            let req = "";

            if (sort) {
                if (!CAR_FIELDS.includes(sort)) {
                    return CarView.errorField(sort);
                }
                req = "sort="+sort;
            }
            const res = await http.get<Car[]>("?"+req);
            if (!res) return;

            CarView.displayList(res.data, sort);
        }
    }
