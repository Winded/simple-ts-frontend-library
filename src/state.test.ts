import { State } from "./state";

interface TestStateModel {
    value: number;
    text: string;
}

describe('state', () => {
    let state: State<TestStateModel>;
    let currentState: Readonly<TestStateModel> = {
        value: 1,
        text: 'Hello!'
    };

    beforeEach(() => {
        state = new State<TestStateModel>(currentState, state => currentState = state);
    });

    it('should have created initial state', () => {
        expect(state.getState()).toEqual(currentState);
    });

    it('should change state and notify with callback', () => {
        let stateBefore = currentState;
        state.setState({
            value: 2,
            text: 'Changed!'
        });
        expect(state.getState()).toEqual(currentState);
        expect(state.getState()).not.toEqual(stateBefore);
    });
});
