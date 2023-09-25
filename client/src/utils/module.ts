import { AppConfig } from "../app/app.types.js";

export interface Application {
    readonly config: AppConfig;
    provide(token: string, module: ProviderConstructor): string;
    modules: Map<string, Provider>;
}

export interface Provider {
    readonly config: AppConfig;
}
export interface ProviderConstructor {
    new(config: AppConfig): Provider;
}
export type InjectionToken = string & { __type__: "InjectionToken" };
export function Injector(token: string): InjectionToken {
    return token as InjectionToken;
}