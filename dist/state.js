"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
class State {
    constructor(initialState, stateChangeCallback) {
        this.stateChangeCallback = stateChangeCallback;
        this.state = initialState;
    }
    getState() {
        return this.state;
    }
    setState(newState) {
        this.state = newState;
        this.stateChangeCallback(newState);
    }
    updateState(updateFunction) {
        this.setState(updateFunction(this.getState()));
    }
}
exports.State = State;
