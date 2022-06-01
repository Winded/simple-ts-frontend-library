export interface RouteParameters {
    [id: string | number]: any;
};

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

export class Router {
    constructor(private routes: RouteMapping, private changeCallback: (route: Readonly<RouteResult>) => void) {
        this.parseLocation();
        window.addEventListener('popstate', event => this.onPopState(event));
    }

    changeRoute(id: string, parameters: RouteParameters = {}) {
        if (!this.routes[id]) {
            throw 'Invalid route';
        }

        const route = this.routes[id];
        const url = route.build(parameters);

        let newRoute: RouteResult = {
            id: id,
            parameters: parameters
        };
        history.pushState(newRoute, '', `${location.origin}${url}`);
        this.changeCallback(newRoute);
    }

    private onPopState(event: PopStateEvent) {
        if (event.state?.id) {
            this.changeCallback({
                id: event.state?.id,
                parameters: event.state?.parameters ?? {}
            });
        }
    }

    private parseLocation(): void {
        const path = location.href.slice(location.origin.length);
        for(let [routeId, route] of Object.entries(this.routes)) {
            if (route.match.test(path)) {
                let matches = route.match.exec(path);
                this.changeCallback({
                    id: routeId,
                    parameters: matches?.groups ?? {}
                });
                return;
            }
        }

        this.changeCallback({
            id: 'notfound',
            parameters: {}
        });
    }
}
