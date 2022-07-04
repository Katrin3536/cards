import {forgotReducer, InitialStateType} from '../bll/reducers/forgotPass-reducer';

let testState: InitialStateType;

beforeEach(() => {
    testState = {
        success: false,
        passIsChanged: false,
    };
});

test('Recovery was successful', () => {

    let newState = forgotReducer(testState, {type: 'FORGOT/recovery', value: true});

    expect(newState.success).toBe(true);
    expect(newState).not.toEqual(testState);
});

test('password is changed successfully', () => {

    let newState = forgotReducer(testState, {type: 'FORGOT/password-is-changed', value: true});

    expect(newState.passIsChanged).toBe(true);
    expect(newState).not.toEqual(testState);
});

