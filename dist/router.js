"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
;
class Router {
    constructor(routes, changeCallback) {
        this.routes = routes;
        this.changeCallback = changeCallback;
        this.parseLocation();
        window.addEventListener('popstate', event => this.onPopState(event));
    }
    changeRoute(id, parameters = {}) {
        if (!this.routes[id]) {
            throw 'Invalid route';
        }
        const route = this.routes[id];
        const url = route.build(parameters);
        let newRoute = {
            id: id,
            parameters: parameters
        };
        history.pushState(newRoute, '', `${location.origin}${url}`);
        this.changeCallback(newRoute);
    }
    onPopState(event) {
        var _a, _b, _c, _d;
        if ((_a = event.state) === null || _a === void 0 ? void 0 : _a.id) {
            this.changeCallback({
                id: (_b = event.state) === null || _b === void 0 ? void 0 : _b.id,
                parameters: (_d = (_c = event.state) === null || _c === void 0 ? void 0 : _c.parameters) !== null && _d !== void 0 ? _d : {}
            });
        }
    }
    parseLocation() {
        var _a;
        const path = location.href.slice(location.origin.length);
        for (let [routeId, route] of Object.entries(this.routes)) {
            if (route.match.test(path)) {
                let matches = route.match.exec(path);
                this.changeCallback({
                    id: routeId,
                    parameters: (_a = matches === null || matches === void 0 ? void 0 : matches.groups) !== null && _a !== void 0 ? _a : {}
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
exports.Router = Router;
