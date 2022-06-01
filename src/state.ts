export class State<TModel> {
    private state: TModel;

    constructor(initialState: TModel, private stateChangeCallback: (state: Readonly<TModel>) => void) {
        this.state = initialState;
    }

    getState(): Readonly<TModel> {
        return this.state;
    }

    setState(newState: TModel): void {
        this.state = newState;
        this.stateChangeCallback(newState);
    }

    updateState(updateFunction: (state: Readonly<TModel>) => TModel): void {
        this.setState(updateFunction(this.getState()));
    }
}
