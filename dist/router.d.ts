export interface RouteParameters {
    [id: string | number]: any;
}
export interface RouteConfig {
    match: RegExp;
    build: (parameters: RouteParameters) => string;
}
export interface RouteResult {
    id: string;
    parameters: RouteParameters;
}
export interface RouteMapping {
    [id: string]: RouteConfig;
}
export declare class Router {
    private routes;
    private changeCallback;
    constructor(routes: RouteMapping, changeCallback: (route: Readonly<RouteResult>) => void);
    changeRoute(id: string, parameters?: RouteParameters): void;
    private onPopState;
    private parseLocation;
}
