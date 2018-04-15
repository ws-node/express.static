import { Request, Response } from "./core";

export type AllowMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

export type ICommonMidleware = (request: Request, response: Response, next?: () => void) => void;
export type IErrorMiddleware = (error: any, request: Request, response: Response, next?: () => void) => void;
export type IMidleware = ICommonMidleware | IErrorMiddleware;

export interface IContext {
    request: Request;
    response: Response;
}

export interface IController {
    context: IContext;
    request: Request;
    response: Response;
}

export interface IRoute {
    path: string;
    allowMethods: AllowMethod[];
    middleware: {
        list: IMidleware[];
        merge: boolean;
    };
    queryParams: Array<{ key: string, type: any }>;
}

export interface IControllerConfig {
    prefix?: string;
}

export interface IMethodResult {
    toString(): string;
}

export interface IControllerMetadata {
    router: {
        routes: { [methodName: string]: IRoute }
        prefix?: string;
    };
    middlewares: IMidleware[];
}
