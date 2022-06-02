import { RouteMapping, Router, RouteResult } from "./router";

describe('router', () => {
    const config: RouteMapping = {
        home: {
            match: /^\//,
            build: () => '/'
        },
        getResource: {
            match: /^\/resources\/(?<id>\i*)>/,
            build: ({ id }) => `/resources/${id}`
        }
    };
    let router: Router;
    let currentRoute: RouteResult;

    beforeEach(() => {
        router = new Router(config, newRoute => currentRoute = newRoute);
    });

    it('should parse initial location', () => {
        expect(currentRoute).toEqual({
            id: 'home',
            parameters: {}
        });
    });

    it('should change path when changing route, and return when going back with browser', (done) => {
        router.changeRoute('getResource', {
            id: 123
        });
        expect(currentRoute).toEqual({
            id: 'getResource',
            parameters: {
                id: 123
            }
        });
        expect(location.pathname).toBe('/resources/123');
        expect(history.length).toBe(2);

        router.changeRoute('home', {});
        expect(location.pathname).toBe('/');

        history.back();
        setTimeout(() => {
            expect(location.pathname).toBe('/resources/123');
            expect(currentRoute).toEqual({
                id: 'getResource',
                parameters: {
                    id: 123
                }
            });
            done();
        }, 10);
    });
});
