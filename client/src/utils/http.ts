import axios from 'axios';
import { InjectionToken, Injector, Provider } from './module.js';
import { AppConfig } from '../app/app.types.js';
import { CommonView } from '../view/common.view.js';

export const HTTP: InjectionToken = Injector("HTTP");
export class HttpModule implements Provider {
    #url: string;

    constructor(config: AppConfig) {
        this.#url = `http://${config.host}:${config.port}`;
        this.config = config;
    }
    config: AppConfig;

    put<TRes>(path: string, body: unknown) {
        return axios.put<TRes>(`${this.#url}/${path}`, body)
            .catch((err) => CommonView.httpError(err));
    }
    get<T>(path: string) {
        return axios.get<T>(`${this.#url}/${path}`)
            .catch((err) => CommonView.httpError(err));
    }
    post<TRes>(path: string, body: unknown) {
        return axios.post<TRes>(`${this.#url}/${path}`, body)
            .catch((err) => CommonView.httpError(err));
    }
    delete(path: string) {
        return axios.delete(`${this.#url}/${path}`)
            .catch((err) => CommonView.httpError(err));
    }
}