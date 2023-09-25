import { AxiosError } from "axios";
import chalk from "chalk"

export abstract class CommonView {
    static httpError(err: AxiosError) {
        console.error(chalk.red("HTTP Error ")+err.code+":\n", err.message, err.response?.data);
    }
}