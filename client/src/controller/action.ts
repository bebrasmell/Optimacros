import { Command } from "commander";
import { Application, InjectionToken, Provider } from "../utils/module.js";

export interface ActionConstructor<T = unknown> {
    new(app: Application, ...modules: Provider[]): Action<T>;
    readonly requires: InjectionToken[];
}
export abstract class Action<T = unknown> extends Command {

    constructor(name: string, description: string) {
        super(name);
        this.description(description);
    }
    public readonly modules: Map<InjectionToken, Provider> = new Map();
    public abstract readonly app: Application;
    public abstract activate(options: T): void;
    public static app: Application;
    public inject(token: InjectionToken) {
        const instance = this.app.modules.get(token);
        if (!instance) throw new Error(`${token} Module not found. Please, inject it into App first.`);
        this.modules.set(token, instance);
    }
}