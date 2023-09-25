import { Command } from "commander";
import { Application, InjectionToken, Provider } from "../utils/module.js";

/**
 * Describes a shape of Operation constructor.
 * Operation should be instancable and must have a list of required Modules.
 */
export interface ActionConstructor<T = unknown> {
    new(app: Application, ...modules: Provider[]): Action<T>;
    readonly requires: InjectionToken[];
}
/**
 * Operation is a modified Command.
 * This abstract class describes a shape of Operation itself.
 * It should accept Operation name and description (for **Help**)
*/
export abstract class Action<T = unknown> extends Command {

    constructor(name: string, description: string) {
        super(name);
        this.description(description);
    }

    // A list of Providers instances
    public readonly modules: Map<InjectionToken, Provider> = new Map();

    // Stores a link to Application instance self
    public abstract readonly app: Application;

    // Operation should be called with this specific function
    public abstract activate(options: T): void;

    // A way to inject Provider instance with given Injection Token
    public inject(token: InjectionToken) {
        const instance = this.app.modules.get(token);
        if (!instance) throw new Error(`${token} Module not found. Please, inject it into App first.`);
        this.modules.set(token, instance);
    }
}