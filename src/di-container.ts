const validTokenCharacters = 'abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';
const tokenLength = 10;
function generateTokenId(): string {
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
        const idx = Math.round(Math.random() * (validTokenCharacters.length - 1));
        token += validTokenCharacters[idx];
    }
    return token;
}

export class Token<_> {
    private _id: string;

    constructor(private _name: string) {
        this._id = generateTokenId();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
}

export type ProviderFunction<T> = (container: DependencyInjectionContainer) => T;

export interface Provider<T> {
    provides: Token<T>;
    with: ProviderFunction<T>;
}

export class DependencyInjectionContainer {
    private providers: {[id: string]: ProviderFunction<any>};
    private instances: {[id: string]: any} = {};

    constructor(providers: Provider<any>[]) {
        this.providers = {};
        for (let provider of providers) {
            this.providers[provider.provides.id] = provider.with;
        }
    }

    get<T>(token: Token<T>): T {
        if (token.id in this.instances) {
            return this.instances[token.id];
        }

        if (!(token.id in this.providers)) {
            throw new Error('No provider for token: ' + token.name);
        }

        this.instances[token.id] = this.providers[token.id](this);
        return this.instances[token.id];
    }
}
