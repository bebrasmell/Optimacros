import inquirer, { Question } from "inquirer";
import { Car, CarFields, CarFlat } from "../models/car.types.js";
import Table from "cli-table";
import chalk from "chalk";

// A list of questions to be asked
type DefQuestion<T> = (arg0?: T) => Question;
const BRAND_Q: DefQuestion<string> = (def?: string) => ({
    type: "input",
    name: "brand",
    message: "Brand",
    default: def
});
const MODEL_Q: DefQuestion<string> = (def?: string) => ({
    type: "input",
    name: "model",
    message: "Model",
    default: def
});
const YEAR_Q: DefQuestion<number> = (def?: number) => ({
    type: "number",
    name: "year",
    message: "Year",
    default: def,
    validate: (value) => {
        if (isNaN(value) || value < 1900 || value > new Date().getFullYear()) {
            return "Please enter a valid year";
        }
        return true;
    }
});
const PRICE_Q: DefQuestion<number> = (def?: number) => ({
    type: "number",
    name: "price",
    message: "Price",
    default: def,
    validate: (value) => {
        if (isNaN(value) || value < 0) return "Please enter a valid price";
        return true;
    }
});

/**
 * View layer for comumnicating via console
 */
export class CarView {
    /**
     * Asks to provide Car information
     * @param def Default Car values
     * @returns Complete and valid Car fields
     */
    static async model(def?: CarFlat): Promise<CarFlat> {
        console.log(chalk.bgGray(" Please enter car details "));
        
        return inquirer.prompt<CarFlat>([
            BRAND_Q(def?.brand),
            MODEL_Q(def?.model),
            YEAR_Q(def?.year),
            PRICE_Q(def?.price)
        ]);
    }
    /**
     * Car delete operation confirmation prompt
     * @param car Car to be asked about
     * @returns An answer (boolean)
     */
    static async request_delete(car: Car): Promise<boolean> {
        return (await inquirer.prompt([
            {
                type: "confirm",
                name: "accept",
                message: "Do you want to delete " + chalk.blue(`${car.brand} ${car.model}`)
            }
        ])).accept;
    }

    /**
     * Notifies of a success Create operation
     * @param car Car info
     */
    static createSuccess(car: Car): void {
        console.log("\n" + chalk.green('Car'), car.id, chalk.green('created successfully.'), "\n");
        CarView.display(car);
    }
    /**
     * Notifies of a sorting order incompatibility
     * @param car Car info
     */
    static errorField(field: string): void {
        console.log(
            chalk.red("Error:"),
            "Car doesn't include a field",
            chalk.gray(field),
        );
    }
    /**
     * Displays a list of Cars
     * @param cars Cars to be displayed
     * @param sort Sorting order
     */
    static displayList(cars: Car[], sort?: CarFields) {
        console.log(chalk.bgGray(" List of cars" + (sort? " Sorted by "+sort : "") + " "));
        const table = new Table({
            head: [
                chalk.gray("ID"),
                chalk.blue("Brand"),
                chalk.blue("Model"),
                chalk.blue("Year"),
                chalk.blue("Price")
            ]
        });
        for (const car of cars) table.push([
            chalk.gray(car.id),
            car.brand,
            car.model,
            car.year.toString(),
            car.price.toFixed(2)
        ]);
        console.log(table.toString());
    }
    /**
     * Displays Car info
     * @param car Car info to be displayed
     */
    static display(car: Car): void {
        console.log(chalk.gray("Id: "+ car.id));
        console.log(chalk.gray("Brand:\t"), car.brand);
        console.log(chalk.gray("Model:\t"), car.model);
        console.log(chalk.gray("Year:\t"), car.year.toString());
        console.log(chalk.gray("Price:\t"), car.price.toFixed(2));
    }
    /**
     * Notifies of successful removal
     */
    static deleteSuccess(): void {
        console.log(chalk.green("Car has been deleted"));
    }
}