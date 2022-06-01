export declare class State<TModel> {
    private stateChangeCallback;
    private state;
    constructor(initialState: TModel, stateChangeCallback: (state: Readonly<TModel>) => void);
    getState(): Readonly<TModel>;
    setState(newState: TModel): void;
    updateState(updateFunction: (state: Readonly<TModel>) => TModel): void;
}
