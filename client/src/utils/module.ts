import { AppConfig } from "../app/app.types.js";

/**
 * Describes a basic Application shape.
 * It is used to implement Injection properly.
 */
export interface Application {
    readonly config: AppConfig;
    provide(token: string, module: ProviderConstructor): string;
    modules: Map<string, Provider>;
}
/** Describes a shape of a Provider */
export interface Provider {
    readonly config: AppConfig;
}
/** Shape of a Provider constructor */
export interface ProviderConstructor {
    new(config: AppConfig): Provider;
}
/** Injection Token must be incompatible with a regular string */
export type InjectionToken = string & { __type__: "InjectionToken" };

/** Injection Token factory */
export function Injector(token: string): InjectionToken {
    return token as InjectionToken;
}