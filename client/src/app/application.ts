import { Command } from "commander";
import { AppConfig } from "./app.types.js";
import { ActionConstructor } from "../controller/action.js";
import { Application, Provider, ProviderConstructor } from "../utils/module.js";

export class App
    extends Command
    implements Application {

    constructor(
        name: string,
        description: string,
        readonly config: AppConfig
    ) {
        super();
        this.name(name);
        this.description(description);
    }

    // Modules
    modules: Map<string, Provider> = new Map();

    provide(token: string, module: ProviderConstructor): string {
        this.modules.set(token, new module(this.config));
        return token;
    }

    // Operations
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
    attachAll(ops: ActionConstructor[]): App {
        for (let op of ops) this.attach(op);
        return this;
    }

    defaultHelp(): void {
        this.parse(process.argv);
        if (!(this.args && this.args.length > 0 && (typeof (this.args[0] === 'object')))) {
            this.outputHelp();
        }
    }
}

