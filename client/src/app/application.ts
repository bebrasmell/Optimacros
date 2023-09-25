import { Command } from "commander";
import { AppConfig } from "./app.types.js";
import { ActionConstructor } from "../controller/action.js";
import { Application, Provider, ProviderConstructor } from "../utils/module.js";

/**
 * Application itself which is basicaly a Commander instance.
 * Handles module injections and accepts Operations.
 */
export class App extends Command implements Application {

    /**
     * @param name Application name
     * @param description App description
     * @param config API configuration (host, port)
     */
    constructor(
        name: string,
        description: string,
        readonly config: AppConfig
    ) {
        super();
        this.name(name);
        this.description(description);
    }

    /**
     * Providers to be injected into Operations
     * */
    modules: Map<string, Provider> = new Map();

    /**
     * Adds a module with a specific Injection Token
     * @param token Injection Token
     * @param module Provider constructor
     * @returns Provided Injection Token
     */
    provide(token: string, module: ProviderConstructor): string {
        this.modules.set(token, new module(this.config));
        return token;
    }

    /**
     * Adds Operation to Application
     * @param op Operation constructor
     * @returns Current Application instance
     */
    attach<T>(op: ActionConstructor<T>): App {
        const instance = new op(this);
        for (const module of op.requires) {
            const provider = this.modules.get(module);
            if (!provider) throw new Error(`Module ${module} is not injected. Please provide it before attaching the operation.`);
            instance.inject(module);
        }
        this.addCommand(instance);
        return this;
    }
    /**
     * Adds all Operations to Application
     * @param ops Operation constructors
     * @returns Current Application instance
     */
    attachAll(ops: ActionConstructor[]): App {
        for (let op of ops) this.attach(op);
        return this;
    }

    /**
     * Adds **Help** display if no Operation is requested
     */
    defaultHelp(): void {
        this.parse(process.argv);
        if (!(this.args && this.args.length > 0 && (typeof (this.args[0] === 'object')))) {
            this.outputHelp();
        }
    }
}

