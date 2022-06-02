export declare class Token<_> {
    private _name;
    private _id;
    constructor(_name: string);
    get id(): string;
    get name(): string;
}
export declare type ProviderFunction<T> = (container: DependencyInjectionContainer) => T;
export interface Provider<T> {
    provides: Token<T>;
    with: ProviderFunction<T>;
}
export declare class DependencyInjectionContainer {
    private providers;
    private instances;
    constructor(providers: Provider<any>[]);
    get<T>(token: Token<T>): T;
}
