"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyInjectionContainer = exports.Token = void 0;
const validTokenCharacters = 'abcdefghijklmnopqrstuvxyzABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';
const tokenLength = 10;
function generateTokenId() {
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
        const idx = Math.round(Math.random() * (validTokenCharacters.length - 1));
        token += validTokenCharacters[idx];
    }
    return token;
}
class Token {
    constructor(_name) {
        this._name = _name;
        this._id = generateTokenId();
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
}
exports.Token = Token;
class DependencyInjectionContainer {
    constructor(providers) {
        this.instances = {};
        this.providers = {};
        for (let provider of providers) {
            this.providers[provider.provides.id] = provider.with;
        }
    }
    get(token) {
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
exports.DependencyInjectionContainer = DependencyInjectionContainer;
