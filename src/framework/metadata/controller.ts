import { Request, Response, BodyParser, IConstructor } from "./core";
import { IConfigContainer } from "./config";

export type AllowMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";

export enum FormDcsType {
    MultipleFormData = "multiple",
    MultipleFile = "files",
    ApplicationJson = "json",
    UrlEncoded = "url",
    TextPlain = "text",
    Raw = "raw"
}

export type ICommonMidleware = (request: Request, response: Response, next?: () => void) => void;
export type IErrorMiddleware = (error: any, request: Request, response: Response, next?: () => void) => void;
export type IMidleware = ICommonMidleware | IErrorMiddleware;
export type IMiddleware = IMidleware;

export type IMiddlewareConstroctor = IConstructor<IMiddlewarePipe<any>>;

export interface IMiddlewarePipe<TContext> {
    process(context?: TContext): void | Async<void>;
    toMiddleware(configs: IConfigContainer, bundle: IPipeBundle): IMiddleware;
}

export type IPipe = IConstructor<IMiddlewarePipe<any>>;

export type IPipeElement = IPipe | IPipeBundle;

export interface IPipeBundle {
    target: IPipe;
    params: any[];
}

export interface IPipeFactory {
    (...args: any[]): IPipeBundle;
}

export interface IContextErrors {
    stack: any[];
    add(error: any): void;
}

export interface IContext<REQ, REP> {
    request: REQ;
    response: REP;
    errors: IContextErrors;
}

export interface IController<REQ, REP> {
    context: IContext<REQ, REP>;
}

/** The route's metadata. */
export interface IRoute {
    path: string;
    allowMethods: AllowMethod[];
    middleware: {
        list: IMidleware[];
        merge: boolean;
    };
    pipes: {
        list: IPipeElement[];
        merge: boolean;
    };
    funcParams: Array<{ key: string, type: any, isQuery: boolean }>;
    form: {
        parser: FormDcsType;
        index: number;
        options?: any;
        type?: string;
    };
}

export interface IControllerConfig {
    prefix?: string;
}

/**
 * Defines the return type of the custom routing method. The custom routing method return type needs to implement this interface
 */
export interface IMethodResult {
    toString(configs: IConfigContainer): string;
}

/** Represents the return type of the controller routing method */
export type IResult = IMethodResult | Async<IMethodResult> | string;

/**
 * The controller's metadata. Record some design information that needs to be retrieved at runtime
 */
export interface IControllerMetadata {
    router: {
        routes: { [methodName: string]: IRoute }
        prefix?: string;
    };
    middlewares: IMidleware[];
    pipes: IPipeElement[];
}

/**
 * Represents an asynchronous process and is used as an alias for a Promise
 */
export type Async<T> = Promise<T>;

/** Handle JSON keys ,return a new key to replace old one for each.
 * @input old key
 * @output new key
 */
export interface JsonResultResolver {
    (propertyKey: string): string;
}

/**
 * JSON serialization configuration. Provides fine-grained control over the behavior of JsonResult during serialization
 */
export interface JsonResultOptions {
    /** Whether to enable indentation */
    indentation?: boolean;
    /** Handle JSON keys ,return a new key to replace old one for each */
    resolver?: JsonResultResolver;
    /** Whether to enable static type processing according to a serialization contract */
    staticType?: boolean;
}

export interface StringResultOptions {
    encoding?: string;
    decoding?: string;
}
